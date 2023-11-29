const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Config = require('../config/vars');
const { Firebase } = require('../services');
const { User, Configs, Mongoose } = require('../models');

const saltRounds = 10;

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
  Login: async (req, res, next) => {
    try {
      const { email = '', password = '' } = req.body;

      let validateError = null;
      if (!ValidateEmail(email.trim()))
        validateError = 'Please enter a valid email id i.e abc@gmail.com';

      if (validateError) return HandleError(res, validateError);

      let isUserExists = await IsExists({
        model: User,
        where: { email: email }
      });
      if (!isUserExists) {
        return HandleError(res, "User doesn't exists!");
      }

      let isPasswordCorrect = await bcrypt.compare(password, isUserExists[0].password);

      if (!isPasswordCorrect) return HandleError(res, 'Incorrect Password!');

      let user = { ...isUserExists[0] };
      const active_session_refresh_token = GeneratePassword();
      const access_token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        Config.secret,
        {
          expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
        }
      );

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: user._id },
        update: {
          $set: {
            access_token: access_token,
            active_session_refresh_token: active_session_refresh_token
          }
        }
      });

      if (!updated) return HandleError(res, 'Failed to generate access token.');

      let userData = { ...updated._doc };
      delete userData.password;

      return HandleSuccess(res, userData);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  Signup: async (req, res, next) => {
    try {
      const { name = '', email = '', mobile = '', password = '', cpassword = '' } = req.body;

      let validateError = null;
      if (!ValidateAlphanumeric(name.trim()) || !ValidateLength(name.trim()))
        validateError =
          'Please enter a valid name without any special character and less than 25 character.';
      else if (!ValidateEmail(email.trim()))
        validateError = 'Please enter a valid email id i.e abc@gmail.com';
      else if (!ValidateMobile(mobile.trim()))
        validateError = 'Please enter a valid mobile number without ISD code i.e 990xxxxx05.';
      else if (password !== cpassword)
        validateError = 'Password and confirm password doest not match.';

      if (validateError) return HandleError(res, validateError);

      let isUserExists = await IsExists({
        model: User,
        where: { $or: [{ email: email }, { mobile: mobile }] }
      });

      if (isUserExists) return HandleError(res, 'User Already Exists!');

      let expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() - Config.otpExpiryLimit);

      const password_hash = await bcrypt.hash(password, saltRounds);

      let data = { name, mobile, email, password: password_hash };
      data.active_session_refresh_token = GeneratePassword();

      let inserted = await Insert({
        model: User,
        data: data
      });
      if (!inserted)
        return HandleError(res, 'Failed to create account. Please contact system admin.');

      inserted = { ...inserted._doc };
      const access_token = jwt.sign(
        { id: inserted._id, email: inserted.email, name: inserted.name },
        Config.secret,
        {
          expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
        }
      );

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: inserted._id },
        update: { $set: { access_token: access_token } }
      });
      if (!updated) return HandleError(res, 'Failed to update access token.');

      let user = { ...updated._doc };
      delete user.password;

      return HandleSuccess(res, user);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  UpdateProfile: async (req, res, next) => {
    try {
      const { id = '', name = '', email = '', mobile = '' } = req.body;

      let validateError = null;
      if (id == '') validateError = 'Invalid user Id.';
      else if (!ValidateAlphanumeric(name.trim()) || !ValidateLength(name.trim()))
        validateError =
          'Please enter a valid name without any special character and less than 25 character.';
      else if (!ValidateEmail(email.trim()))
        validateError = 'Please enter a valid email id i.e abc@gmail.com';
      else if (!ValidateMobile(mobile.trim()))
        validateError = 'Please enter a valid mobile number without ISD code i.e 990xxxxx05.';

      if (validateError) return HandleError(res, validateError);

      let isUserExists = await IsExists({
        model: User,
        where: {
          $and: [{ _id: { $ne: Mongoose.Types.ObjectId(id) } }, { email: email }]
        }
      });

      if (isUserExists) return HandleError(res, 'Email Already Exists!');

      isUserExists = await IsExists({
        model: User,
        where: {
          $and: [{ _id: { $ne: Mongoose.Types.ObjectId(id) } }, { mobile: mobile }]
        }
      });

      if (isUserExists) return HandleError(res, 'Mobile Already Exists!');

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: Mongoose.Types.ObjectId(id) },
        update: { $set: { email: email, name: name, mobile: mobile } }
      });
      if (!updated) return HandleError(res, 'Failed to update user details.');

      const user = { ...updated._doc };
      delete user.password;

      return HandleSuccess(res, user);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  UpdatePassword: async (req, res, next) => {
    try {
      const { user } = req;
      const { password = '', cpassword = '' } = req.body;

      let validateError = null;
      if (password.trim() !== cpassword.trim())
        validateError = 'Password and Confirm password does not match.';

      if (validateError) return HandleError(res, validateError);

      const password_hash = await bcrypt.hash(password, saltRounds);

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: Mongoose.Types.ObjectId(user._id) },
        update: { $set: { password: password_hash } }
      });
      if (!updated) return HandleError(res, 'Failed to update user details.');

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  UpdatePushToken: async (req, res, next) => {
    try {
      const { user } = req;
      const { token = '' } = req.body;

      if (user.user_role !== 'admin') return UnauthorizedError(res);

      let validateError = null;
      if (!token) validateError = 'Invalid push token.';

      if (validateError) return HandleError(res, validateError);

      let updated = await FindAndUpdate({
        model: Configs,
        where: { key: 'pushToken' },
        update: { $set: { value: token } }
      });
      if (!updated) return HandleError(res, 'Failed to update push token.');

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  ForgotPassword: async (req, res, next) => {
    try {
      const { email = '', otp = '', password = '' } = req.body;

      let validateError = null;
      if (!ValidateEmail(email.trim()))
        validateError = 'Please enter a valid email id i.e abc@gmail.com';

      if (validateError) return HandleError(res, validateError);

      let isUserExists = await IsExists({
        model: User,
        where: { email: email }
      });

      if (!isUserExists) return HandleError(res, 'User not Exists!');

      let expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() - Config.otpExpiryLimit);

      if (otp && password) {
        let data = { email, password };
        data.active_session_refresh_token = GeneratePassword();

        let updated = await FindAndUpdate({
          model: User,
          where: { email: email },
          update: { $set: { password: password } }
        });
        if (!updated)
          return HandleError(res, 'Failed to update password. Please contact system admin.');

        updated = { ...updated._doc };
        const access_token = jwt.sign(
          { id: updated._id, email: updated.email, name: updated.name },
          Config.secret,
          {
            expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
          }
        );

        updated = await FindAndUpdate({
          model: User,
          where: { _id: updated._id },
          update: { $set: { access_token: access_token } }
        });
        if (!updated) return HandleError(res, 'Failed to update access token.');

        let user = { ...updated._doc };

        return HandleSuccess(res, { isUpdated: true });
      } else if (otp) {
        let isOtpExists = await IsExists({
          model: Otp,
          where: { email: email, otp: otp, createdAt: { $gt: expiry } }
        });
        if (!isOtpExists) return HandleError(res, 'Failed to verify OTP.');
        else if (isOtpExists) {
          Delete({
            model: Otp,
            where: { email: email }
          });
          return HandleSuccess(res, { isOtpVerified: true });
        }
      }

      // Send OTP
      let isOtpExists = await IsExists({
        model: Otp,
        where: { email: email, createdAt: { $gt: expiry } }
      });
      if (isOtpExists) return HandleError(res, 'Too many OTP requests. Please try after sometime.');

      const otpValue = Math.floor(1000 + Math.random() * 9000);
      var otpStatus = null;
      if (Config.environment !== 'DEV') {
        if (true) otpStatus = await Mail.sendOtp(email, otpValue);
        if (!otpStatus) return HandleError(res, 'Failed to send OTP. Please contact system admin.');
      }
      const inserted = await Insert({
        model: Otp,
        data: { otp: otpValue, email: email }
      });
      if (!inserted) return HandleError(res, 'Failed to send OTP.');
      return HandleSuccess(res, { otp: otpValue });
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  RefreshToken: async (req, res, next) => {
    try {
      const { token = '', id = '' } = req.params;
      if (!token.trim() || !id.trim()) return HandleError(res, 'Invalid id or token.');

      const isUserExists = await IsExists({
        model: User,
        where: { _id: id, active_session_refresh_token: token }
      });

      if (!isUserExists) return HandleError(res, "User doesn't exists.");

      const access_token = jwt.sign(
        { id: isUserExists[0]._id, email: isUserExists[0].email, name: isUserExists[0].name },
        Config.secret,
        {
          expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
        }
      );

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: isUserExists[0]._id },
        update: { $set: { access_token: access_token } }
      });
      if (!updated) return HandleError(res, 'Failed to generate access token.');

      return HandleSuccess(res, access_token);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },

  LoginByToken: async (req, res, next) => {
    try {
      const { token = '', email = '' } = req.params;
      if (!token.trim() || !email.trim()) return HandleError(res, 'Invalid mobile or token.');

      const isUserExists = await IsExists({
        model: User,
        where: { email: email, active_session_refresh_token: token }
      });
      if (!isUserExists) return HandleSuccess(res, { isUserExists: false });

      const access_token = jwt.sign(
        { id: isUserExists[0]._id, email: isUserExists[0].email, name: isUserExists[0].name },
        Config.secret,
        {
          expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
        }
      );

      let updated = await FindAndUpdate({
        model: User,
        where: { _id: isUserExists[0]._id },
        update: { $set: { access_token: access_token } }
      });
      if (!updated) return HandleError(res, 'Failed to generate access token.');

      let user = { ...updated._doc };

      userData = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        access_token: access_token,
        active_session_refresh_token: user.active_session_refresh_token
      };
      user.isUserExists = true;
      return HandleSuccess(res, user);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  }
};
