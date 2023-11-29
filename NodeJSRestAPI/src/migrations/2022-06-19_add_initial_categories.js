const { Category, Mongoose } = require('../models');

module.exports = {
  up: async () => {
    try {
      await Mongoose.connection.db.dropCollection('categories');
    } catch (e) {
      console.log('Collection doesnt exists.');
    }
    const defaultCategoryData = [
      {
        _id: '62af685520627a6d65ab9836',
        name: 'Appetizer'
      },
      {
        _id: '62af685520627a6d65ab9837',
        name: 'Main Dishes'
      },
      {
        _id: '62af685520627a6d65ab9838',
        name: 'Barbeque'
      },
      {
        _id: '62af685520627a6d65ab9839',
        name: 'Platters'
      },
      {
        _id: '62af685520627a6d65ab983a',
        name: 'Family Platters'
      },
      {
        _id: '62af685520627a6d65ab983b',
        name: 'Soup'
      },
      {
        _id: '62af685520627a6d65ab983c',
        name: 'Sandwiches'
      },
      {
        _id: '62af685520627a6d65ab983d',
        name: 'Drinks'
      }
    ];
    try {
      const data = await Category.insertMany(defaultCategoryData);
      console.log('Collection created and data inserted.');
      return true;
    } catch (e) {
      console.log('Migration failed with follwing error ==> ', e);
      return false;
    }
  },
  down: async () => {
    console.log('Migration Down');
    await Mongoose.connection.db.dropCollection('categories');
    return true;
  }
};
