const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema(
  {
    index: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' },
    price: { type: Number, required: true, trim: true },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
      enum: [true, false],
      trim: true
    }
  },
  { timestamps: true }
);

const MenuModel = mongoose.model('menus', MenuSchema);
module.exports = MenuModel;
