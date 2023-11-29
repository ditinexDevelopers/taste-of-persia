const { Category, Menu, Mongoose } = require('../models');

module.exports = {
  up: async () => {
    try {
      const data = await Menu.updateMany(
        {},
        {
          $set: {
            is_active: true
          }
        }
      );
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
          is_active: false
        }
      }
    );
    return true;
  }
};
