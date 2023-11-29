const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    otp: { type: Number, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

const OtpModel = mongoose.model('otps', OtpSchema);
module.exports = OtpModel;
