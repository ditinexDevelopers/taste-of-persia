const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    active_session_refresh_token: { type: String, required: true },
    access_token: { type: String },
    user_role: {
      type: String,
      required: true,
      default: 'customer',
      enum: ['customer', 'admin'],
      trim: true
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
