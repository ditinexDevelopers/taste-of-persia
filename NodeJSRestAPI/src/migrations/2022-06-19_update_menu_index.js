const { Category, Menu, Mongoose } = require('../models');

module.exports = {
  up: async () => {
    try {
      const ids = await Menu.find({}).select({ _id: 1 }).lean().exec();

      for (let i in ids) {
        const update = await Menu.findOneAndUpdate(
          { _id: ids[i]._id },
          { $set: { index: i } },
          { new: true }
        );
      }
      console.log('Collection updated.');
      return true;
    } catch (e) {
      console.log('Migration failed with follwing error ==> ', e);
      return false;
    }
  },
  down: async () => {
    console.log('Migration Down');
    const data = await Menu.updateMany(
      {},
      {
        $set: {
          index: 0
        }
      }
    );
    return true;
  }
};
