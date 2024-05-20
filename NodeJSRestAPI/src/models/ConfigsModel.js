const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigsSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true, trim: true }
  },
  { timestamps: true }
);

const ConfigsModel = mongoose.model('configs', ConfigsSchema);
module.exports = ConfigsModel;
