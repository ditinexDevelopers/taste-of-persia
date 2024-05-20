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
  IsExistsOne,
  FindOne
} = require('./BaseController');
const { ImageUploader, ImageDeleter } = require('../helpers');

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
<<<<<<< HEAD
  EditMenuDetails: async (req, res, next) => {
=======
  EditMenuPrice: async (req, res, next) => {
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab
    try {
      const { user } = req;
      if (user.user_role !== 'admin') return UnauthorizedError(res);
      const { id, price } = req.body;
<<<<<<< HEAD
      const image_data = req.files?.image_data;
      if (!id) return HandleError(res, 'Invalid menu id.');
      // if (!price) return HandleError(res, 'Invalid Price.');

      const menu = await FindOne({
        model: Menu,
        where: {
          _id: Mongoose.Types.ObjectId(id)
        }
      });

      const oldPath = menu.image;
      const uploadedPath = ImageUploader('/images/', image_data);
=======
      if (!id) return HandleError(res, 'Invalid menu id.');
      if (!price) return HandleError(res, 'Invalid Price.');
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab

      const data = await FindAndUpdate({
        model: Menu,
        where: { _id: Mongoose.Types.ObjectId(id) },
        update: {
          $set: {
<<<<<<< HEAD
            price: price,
            image: uploadedPath
=======
            price: price
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab
          }
        }
      });

<<<<<<< HEAD
      if (!data) {
        //if update failed then deleted new uploaded file
        ImageDeleter(uploadedPath);
        return HandleError(res, 'Failed to update menu.');
      }

      ImageDeleter(oldPath);
=======
      if (!data) return HandleError(res, 'Failed to update menu.');
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab

      return HandleSuccess(res, true);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  }
};
