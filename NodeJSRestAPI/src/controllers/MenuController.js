const Config = require('../config/vars');
const { Firebase } = require('../services');
const { Menu, Category, Mongoose } = require('../models');

const {
  IsExists,
  Insert,
  Find,
  CompressImageAndUpload,
  FindAndUpdate,
  Delete,
  HandleSuccess,
  HandleError,
  HandleServerError,
  Aggregate,
  ValidateEmail,
  PasswordStrength,
  ValidateAlphanumeric,
  ValidateLength,
  ValidateMobile,
  GeneratePassword,
  IsExistsOne
} = require('./BaseController');

module.exports = {
  GetMenuList: async (req, res, next) => {
    try {
      const { id = '', category = '' } = req.params;
      let where = { is_active: true };
      if (id != '') where = { _id: id };
      else if (category != '') where = { ...where, category: category };

      const data = await Find({
        model: Menu,
        where: where,
        sort: { index: 1 }
      });

      return HandleSuccess(res, data);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  GetAllMenuList: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);
      const { id = '', category = '' } = req.params;
      let where = {};
      if (id != '') where = { _id: id };
      else if (category != '') where = { ...where, category: category };

      const data = await Find({
        model: Menu,
        where: where,
        sort: { index: 1 }
      });

      return HandleSuccess(res, data);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  ToggleMenu: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);
      const { id = '', status = true } = req.params;
      if (id == '') return HandleError(res, 'Invalid menu id.');

      const data = await FindAndUpdate({
        model: Menu,
        where: { _id: Mongoose.Types.ObjectId(id) },
        update: {
          $set: {
            is_active: status
          }
        }
      });

      if (!data) return HandleError(res, 'Failed to update menu.');

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  GetCategoryList: async (req, res, next) => {
    try {
      const { id = '' } = req.params;
      let where = {};
      if (id != '') where = { _id: id };

      const data = await Find({
        model: Category,
        where: where
      });

      return HandleSuccess(res, data);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  EditMenuPrice: async (req, res, next) => {
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);
      const { id, price } = req.body;
      if (!id) return HandleError(res, 'Invalid menu id.');
      if (!price) return HandleError(res, 'Invalid Price.');

      const data = await FindAndUpdate({
        model: Menu,
        where: { _id: Mongoose.Types.ObjectId(id) },
        update: {
          $set: {
            price: price
          }
        }
      });

      if (!data) return HandleError(res, 'Failed to update menu.');

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  }
};
