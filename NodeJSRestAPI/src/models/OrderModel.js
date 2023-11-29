const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true },
    items: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'menus' },
        quantity: { type: Number, trim: true, default: 1 }
      }
    ],
    additional_comment: { type: String, trim: true },
    total_price: { type: Number, trim: true, default: 0, required: true },
    billing_address: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      default: 'Pending',
      enum: ['Pending', 'In Kitchen', 'Ready To Pickup', 'Completed', 'Cancelled'],
      trim: true
    },
    ready_for_pickup_at: { type: Date },
    payment_details: {
      type: Object,
      trim: true
    }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('orders', OrderSchema);
module.exports = OrderModel;
