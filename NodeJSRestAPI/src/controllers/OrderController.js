const Config = require('../config/vars');
const { Service } = require('../services');
const { Firebase } = require('../services');
const { Menu, Order, User, Configs, Mongoose } = require('../models');

const {
  IsExists,
  Insert,
  Find,
  Count,
  CompressImageAndUpload,
  FindAndUpdate,
  Delete,
  HandleSuccess,
  HandleError,
  HandleServerError,
  UnauthorizedError,
  Aggregate,
  ValidateEmail,
  PasswordStrength,
  ValidateAlphanumeric,
  ValidateLength,
  ValidateMobile,
  GeneratePassword,
  IsExistsOne,
  FindOne
} = require('./BaseController');

const { Client, Environment, ApiError } = require('square');
const SquarePaymentGateway = new Client({
  accessToken: Config.squareAccessToken,
  environment: Config.env == 'development' ? Environment.Sandbox : Environment.Production
});

function extractExtraCharge(text) {
  // Define a regular expression pattern to match "add extra $<number>"
  const regex = /add extra \$([\d.]+)/i;
  const match = text.match(regex);

  // If there's a match, return the number part (which is in the first capturing group)
  if (match) {
    return parseFloat(match[1]); // This will give you "10.00" or "25.00"
  }

  // If no match is found, return null or some default value
  return null;
}

module.exports = {
  GetResturantTimings: async (req, res, next) => {
    try {
      const data = await IsExistsOne({
        model: Configs,
        where: {
          key: 'timings'
        }
      });

      if (!data) return HandleError(res, 'Failed to fetch timings.');

      return HandleSuccess(res, data);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  SetResturantTimings: async (req, res, next) => {
    try {
      const { user } = req;
      const timings = req.body;
      if (user?.user_role !== 'admin') return UnauthorizedError(res);

      const data = await FindAndUpdate({
        model: Configs,
        where: {
          key: 'timings'
        },
        update: {
          $set: {
            value: timings
          }
        }
      });

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  GetResturantStatus: async (req, res, next) => {
    try {
      const data = await IsExistsOne({
        model: Configs,
        where: {
          key: 'isResturantClosed'
        }
      });

      if (!data) return HandleError(res, 'Failed to fetch current status.');

      return HandleSuccess(res, data);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  SetResturantStatus: async (req, res, next) => {
    try {
      const { user } = req;
      const { status = '' } = req.params;
      if (user.user_role !== 'admin') return UnauthorizedError(res);

      await FindAndUpdate({
        model: Configs,
        where: {
          key: 'isResturantClosed'
        },
        update: {
          $set: {
            value: status
          }
        }
      });

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  SendPush: async (req, res, next) => {
    try {
      const adminToken = await IsExistsOne({
        model: Configs,
        where: {
          key: 'pushToken'
        }
      });
      if (adminToken) {
        console.log(adminToken);
        Firebase.sendPush(adminToken.value);
      }

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  PlaceOrder: async (req, res, next) => {
    try {
      const { user } = req;
      const { name, email, mobile, billing_address, items, additional_comment, payment_token } =
        req.body;

      let validateError = null;
      if (name.trim() == '' || email.trim() == '' || mobile.trim() == '')
        validateError = 'Please enter valid order details.';
      if (payment_token.trim() == '') validateError = 'Invalid payment token.';

      if (validateError) return HandleError(res, validateError);

      const itemIds = items.map((item) => item.id);
      const dbItems = await Find({
        model: Menu,
        where: { _id: { $in: itemIds } }
      });

      if (!dbItems || dbItems?.length < 1)
        return HandleError(res, 'There are no items to place order.');

      let finalItems = [];
      let total_price = 0;

      let payment_note = '';

      // Process each item in the items array
      items.forEach((item) => {
        // Find the corresponding dbItem
        const dbItem = dbItems.find((dbItem) => dbItem._id.toString() === item.id.toString());

        if (dbItem) {
          // Add the item to finalItems
          finalItems.push({
            _id: Mongoose.Types.ObjectId(dbItem._id),
            quantity: item.quantity,
            ind: item.ind
          });

          let extraPrice;
          if (item.ind != null) extraPrice = extractExtraCharge(dbItem?.choices[item.ind]);

          // Update total_price and payment_note
          total_price += item.quantity * (dbItem.price + (extraPrice ? extraPrice : 0.0));

          payment_note += `${dbItem.name} (${item.quantity}) - $${(
            item.quantity * dbItem.price
          ).toFixed(2)}, `;
        }
      });

      let response = null;

      try {
        response = await SquarePaymentGateway.paymentsApi.createPayment({
          sourceId: payment_token,
          idempotencyKey: new Date().getTime().toString(),
          amountMoney: {
            amount: Math.round(total_price * 100),
            currency: 'USD'
          },
          note: payment_note,
          buyer_email_address: email
        });
      } catch (error) {
        if (error instanceof ApiError) {
          const e = error.result.errors[0];
          console.log(e.category);
          console.log(e.code);
          console.log(e.detail);
          return HandleError(res, 'Payment Failed : ' + e.detail);
        } else {
          console.log('Unexpected error occurred: ', error);
          return HandleError(res, 'Unexpected error occurred from payment gateway. ');
        }
      }

      let inserted = null;

      // console.log(response.result);

      if (response) {
        const finalData = {
          user_id: Mongoose.Types.ObjectId(user._id),
          name: name,
          mobile: mobile,
          email: email,
          billing_address: billing_address,
          total_price: total_price.toFixed(2),
          items: finalItems,
          additional_comment: additional_comment,
          payment_details: {
            id: response.result.payment.id,
            status: response.result.payment.status,
            sourceType: response.result.payment.sourceType,
            orderId: response.result.payment.orderId,
            receiptNumber: response.result.payment.receiptNumber,
            locationId: response.result.payment.locationId
          }
        };

        inserted = await Insert({
          model: Order,
          data: finalData
        });

        if (!inserted)
          return HandleError(res, 'Failed to place order. Please contact system admin.');

        const adminToken = await IsExistsOne({
          model: Configs,
          where: {
            key: 'pushToken'
          }
        });
        if (adminToken) {
          console.log(adminToken);
          Firebase.sendPush(adminToken.value);
        }
      }

      return HandleSuccess(res, inserted);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  ListMyOrder: async (req, res, next) => {
    try {
      const { user } = req;

      const OrderList = await Find({
        model: Order,
        where: { user_id: Mongoose.Types.ObjectId(user._id) },
        populate: 'items._id',
        populateField: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          choices: 1
        },
        sort: { createdAt: -1 }
      });

      if (!OrderList) return HandleError(res, 'Failed to fetch order list details.');

      return HandleSuccess(res, OrderList);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  AllOrders: async (req, res, next) => {
    try {
      const pageLimit = 20;
      let paginationSize = 1;
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);

      let { page } = req.params;
      if (!page) page = 0;
      else page = page - 1;

      const OrderList = await Find({
        model: Order,
        populate: 'items._id',
        populateField: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          choices: 1
        },
        sort: { createdAt: -1 },
        limit: pageLimit,
        skip: pageLimit * page
      });

      if (!OrderList) return HandleError(res, 'Failed to fetch order list details.');

      let output = {
        data: OrderList
      };

      if (page == 0) {
        paginationSize = await Count({
          model: Order
        });

        paginationSize = parseInt(paginationSize / pageLimit) + 1;
        output.pageSize = paginationSize;
      }

      return HandleSuccess(res, output);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  PendingOrders: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);

      let today = new Date();
      today.setHours(0, 0, 0, 0);

      const OrderList = await Find({
        model: Order,
        where: {
          status: { $nin: ['Completed', 'Cancelled'] }
        },
        populate: 'items._id',
        populateField: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          choices: 1
        },
        sort: { updatedAt: -1 }
      });

      if (!OrderList) return HandleError(res, 'Failed to fetch order list details.');

      return HandleSuccess(res, OrderList);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  UpdateOrdersStatus: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);

      const { hours, minutes, order_id, status } = req.body;

      const data = {};

      if (status == 'In Kitchen') {
        if (minutes < 1 && hours < 1) return HandleError(res, 'Invalid processing time.');
        let timestamp = Math.round(new Date().getTime() / 1000);
        timestamp += 3600 * hours + 60 * minutes;
        let datetime = new Date(timestamp * 1000);
        data.status = 'In Kitchen';
        data.ready_for_pickup_at = datetime;
      } else {
        data.status = status;
      }

      const update = await FindAndUpdate({
        model: Order,
        where: {
          _id: Mongoose.Types.ObjectId(order_id)
        },
        update: {
          $set: data
        }
      });

      if (!update) return HandleError(res, 'Failed to update order status.');

      let sms = '';
      if (status == 'In Kitchen')
        sms = `Hi ${update.name}, Your order has been accepted. It will be ready to pickup in ${hours} hours and ${minutes} minutes.`;
      else if (status == 'Ready To Pickup')
        sms = `Hi ${update.name}, Your order is ready to pickup.`;
      else if (status == 'Cancelled')
        sms = `Hi ${update.name}, Your order can not be processed now. It has been cancelled.`;

      // if (sms != '') Service.sendSMS(update.mobile, sms);

      let today = new Date();
      today.setHours(0, 0, 0, 0);

      const OrderList = await Find({
        model: Order,
        where: {
          createdAt: { $gte: today },
          status: { $nin: ['Completed', 'Cancelled'] }
        },
        populate: 'items._id',
        populateField: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1
        },
        sort: { updatedAt: 1 }
      });

      if (!OrderList) return HandleError(res, 'Failed to fetch order list details.');

      return HandleSuccess(res, OrderList);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  getStats: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);

      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let thisMonth = new Date(y, m, 1);

      let today = new Date();
      today.setHours(0, 0, 0, 0);

      const orders_daily = await Count({
        model: Order,
        where: { createdAt: { $gte: today } }
      });
      const orders_monthly = await Count({
        model: Order,
        where: { createdAt: { $gte: thisMonth } }
      });

      const signup_daily = await Count({
        model: User,
        where: { createdAt: { $gte: today } }
      });
      const signup_monthly = await Count({
        model: User,
        where: { createdAt: { $gte: thisMonth } }
      });

      const revenue_daily = await Aggregate({
        model: Order,
        data: [
          { $match: { createdAt: { $gte: today }, status: { $in: ['Completed'] } } },
          { $group: { _id: null, revenue: { $sum: '$total_price' } } }
        ]
      });
      const revenue_monthly = await Aggregate({
        model: Order,
        data: [
          { $match: { createdAt: { $gte: thisMonth }, status: { $in: ['Completed'] } } },
          { $group: { _id: null, revenue: { $sum: '$total_price' } } }
        ]
      });

      const daily_transaction = await Count({
        model: Order,
        where: { 'payment_details.status': 'COMPLETED', createdAt: { $gte: today } }
      });
      const monthly_transaction = await Count({
        model: Order,
        where: { 'payment_details.status': 'COMPLETED', createdAt: { $gte: thisMonth } }
      });

      if (!revenue_monthly || !revenue_daily)
        return HandleError(res, 'Failed to fetch stats details.');

      const output = {
        orders_daily,
        orders_monthly,
        signup_daily,
        signup_monthly,
        revenue_daily: revenue_daily.length > 0 ? revenue_daily[0].revenue : 0,
        revenue_monthly: revenue_monthly.length > 0 ? revenue_monthly[0].revenue : 0,
        daily_transaction,
        monthly_transaction
      };

      return HandleSuccess(res, output);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  }
};
