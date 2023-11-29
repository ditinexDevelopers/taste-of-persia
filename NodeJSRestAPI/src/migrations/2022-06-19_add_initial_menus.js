const { Category, Menu, Mongoose } = require('../models');

module.exports = {
  up: async () => {
    try {
      await Mongoose.connection.db.dropCollection('menus');
    } catch (e) {
      console.log('Collection doesnt exists.');
    }
    const defaultCategoryData = [
      // Appetizer
      {
        name: 'Tabouli Salad',
        description:
          'Finely choped parsley, with tomatoes, mint, onion, bulgur, and seasoned with oilve oil, lemon juice, salt and sweet pepper.',
        image: '/images/1.png',
        category: '62af685520627a6d65ab9836',
        price: '7.0'
      },
      {
        name: 'Regular Salad',
        description:
          'Lettuce, tomatoes, onions, carrots, cucumber seasoned with olive oil, salt and pepper.',
        image: '/images/2.png',
        category: '62af685520627a6d65ab9836',
        price: '7.0'
      },
      {
        name: 'Fattoush Salad',
        description:
          'Lettuce, tomatoes, cucumbers and fried pieces of pita bread comes with Zesty Salad (extra virgin olive oil, fresh lemon juice, sumac).',
        image: '/images/3.png',
        category: '62af685520627a6d65ab9836',
        price: '9.0'
      },
      {
        name: 'Pickle Salad',
        description: 'Mixed Pickles.',
        image: '/images/4.png',
        category: '62af685520627a6d65ab9836',
        price: '5.99'
      },
      {
        name: 'Hummus Plate',
        description:
          'Hummus is a delicious spread or dip made from chickpeas,tahini, lemon, and spices, comes with Pita Bread.',
        image: '/images/5.png',
        category: '62af685520627a6d65ab9836',
        price: '6.99'
      },
      {
        name: 'Baba Ganoush',
        description: 'Mashed cooked eggplant, smoked paprika, tahini served with Pita Bread.',
        image: '/images/6.png',
        category: '62af685520627a6d65ab9836',
        price: '6.99'
      },

      {
        name: 'Hummus with Lamb',
        description: 'Lamb, pine nuts, lemon, sesame paste, olive oil served with Pita Bread.',
        image: '/images/7.png',
        category: '62af685520627a6d65ab9836',
        price: '8.99'
      },
      {
        name: 'Hummus with Shawarma',
        description: 'Chicken, pine nuts, lemon, sesame paste, olive oil served with Pita Bread',
        image: '/images/8.png',
        category: '62af685520627a6d65ab9836',
        price: '8.99'
      },
      {
        name: 'Egg Plant Stew',
        description:
          'Cooked with tomato paste, red pepper flakes, diced tomatoes, spinach, served with Pita Bread.',
        image: '/images/9.png',
        category: '62af685520627a6d65ab9836',
        price: '6.99'
      },
      {
        name: 'Jajik',
        description: 'Greek yogurt, mint, olive oil, garlic and sumac.',
        image: '/images/10.png',
        category: '62af685520627a6d65ab9836',
        price: '5.99'
      },
      {
        name: 'Dolma',
        description: 'Grape Leaves.',
        image: '/images/11.png',
        category: '62af685520627a6d65ab9836',
        price: '6.99'
      },
      {
        name: 'Fries',
        description: 'Deep fried potatoes.',
        image: '/images/12.png',
        category: '62af685520627a6d65ab9836',
        price: '3.99'
      },

      // Main Dishes
      {
        name: 'Mandi Lamb',
        description: 'Lamb shank slow cooked over rice plate with pickles ',
        image: '/images/13.png',
        category: '62af685520627a6d65ab9837',
        price: '20.99'
      },
      {
        name: 'Lamb Biryani',
        description: 'Lamb shank slow cooked over rice plate with pickles.',
        image: '/images/14.png',
        category: '62af685520627a6d65ab9837',
        price: '20.99'
      },
      {
        name: 'Mansaf',
        description: 'Lamb shank slow cooked over rice plate with pickles and mansaf sauce.',
        image: '/images/15.png',
        category: '62af685520627a6d65ab9837',
        price: '20.99'
      },
      {
        name: 'Mandi Chicken',
        description: 'Fried Chicken thighs over rice with pickles.',
        image: '/images/16.png',
        category: '62af685520627a6d65ab9837',
        price: '16.99'
      },
      {
        name: 'Chicken Biryani',
        description: 'Fried Chicken thighs over rice with pickles.',
        image: '/images/17.png',
        category: '62af685520627a6d65ab9837',
        price: '16.99'
      },
      {
        name: 'Chicken Shawarma Platter',
        description:
          'The chicken is served on a creamy lemon tahini sauce, served with rice and fries.',
        image: '/images/18.png',
        category: '62af685520627a6d65ab9837',
        price: '16.99'
      },
      {
        name: 'Falafel Platter',
        description:
          'Six deep-fried ball or patty-shaped fritter made from ground chickpeas, fava beans, or both, served with pita bread, hummus vegetables and fries.',
        image: '/images/19.png',
        category: '62af685520627a6d65ab9837',
        price: '11.99'
      },
      {
        name: 'Arabic Chicken Shawarma',
        description: 'Six chicken shawarma pieces served with fries & sauce.',
        image: '/images/20.png',
        category: '62af685520627a6d65ab9837',
        price: '13.99'
      },
      {
        name: 'Burger with fries ',
        description: 'Only on Wednesday.',
        image: '/images/21.png',
        category: '62af685520627a6d65ab9837',
        price: '12.00'
      },

      // Barbeque

      {
        name: 'Iraqi Lamb Kebab',
        description: 'Two grounded lamb skewers served with rice, hummus, and salad. ',
        image: '/images/22.png',
        category: '62af685520627a6d65ab9838',
        price: '17.99'
      },

      {
        name: 'Iraqi Chicken Kebab',
        description: 'Two grounded chicken skewers served with rice, hummus, and salad.',
        image: '/images/23.png',
        category: '62af685520627a6d65ab9838',
        price: '17.99'
      },

      {
        name: 'Lamb Tikka Plate',
        description: '10 pieces of lamb tikka served with rice, hummus, and salad. ',
        image: '/images/24.png',
        category: '62af685520627a6d65ab9838',
        price: '19.99'
      },
      {
        name: 'Shish Tawook',
        description: '10 pieces of chicken tikka served with rice, hummus, and salad.',
        image: '/images/25.png',
        category: '62af685520627a6d65ab9838',
        price: '17.99'
      },

      // platters //

      {
        name: 'Platter #26',
        description:
          '1 skewer of chicken shish tawook, 1 Iraqi kebab, 3 pieces of falafel, served with rice, hummus and pickles.',
        image: '/images/26.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      {
        name: 'Platter #27',
        description:
          '1 skewer of chicken shish tawook, 1 chicken kebab, 3 falafel, served with rice, hummus and pickles.',
        image: '/images/27.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      {
        name: 'Platter #28',
        description:
          '1 skewer of chicken shish tawook, 1 skewer of lamb tikka, 3 falafel, served with rice, hummus and pickles.',
        image: '/images/28.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      {
        name: 'Platter #29',
        description:
          '1 lamb kebab, 1 chicken kebab, 3 falafel, served with rice, hummus and pickles.',
        image: '/images/29.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      {
        name: 'Platter #30',
        description:
          '1 lamb kebab, 1 skewer of lamb tikka, 3 falafel, served with rice, hummus and pickles.',
        image: '/images/30.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      {
        name: 'Platter #31',
        description:
          '1 skewer of chicken kebab and 1 skewer of lamb tikka served with rice, hummus and pickles.',
        image: '/images/31.png',
        category: '62af685520627a6d65ab9839',
        price: '18.99'
      },

      // family platters //

      {
        name: 'Family Platter (Full Plate)',
        description:
          '3 shish kebab lamb, 3 chicken kebab, 2 skewers of chicken shish tawook, 2 skewer lamb tikka, 6 pieces of falafel and decorational salad.',
        image: '/images/32.png',
        category: '62af685520627a6d65ab983a',
        price: '99.99'
      },
      {
        name: 'Family Platter (Half plate)',
        description:
          '3 shish kebab lamb, 3 chicken kebab, 2 skewers of chicken shish tawook, 2 skewer lamb tikka, 6 pieces of falafel and decorational salad.',
        image: '/images/32.png',
        category: '62af685520627a6d65ab983a',
        price: '49.99'
      },

      // Sandwitches //

      {
        name: 'Chicken Shawarma',
        description:
          'Well marinated chicken, layered on a vertical rotisserie or spit, comes with Tahini sauce, fries and pickles inside.',
        image: '/images/33.png',
        category: '62af685520627a6d65ab983c',
        price: '8.99'
      },

      {
        name: 'Iraqi Lamb Kebab Sandwich',
        description: 'Marinated ground lamb comes with vegetables, Iraqi bread',
        image: '/images/34.png',
        category: '62af685520627a6d65ab983c',
        price: '8.99'
      },

      {
        name: 'Chicken Kebab Sandwich',
        description:
          'Ground chicken marinated overnight comes with hummus, garlic sauce and served on a Iraqi bread.',
        image: '/images/35.png',
        category: '62af685520627a6d65ab983c',
        price: '8.99'
      },

      {
        name: 'Shish Tawook Sandwich',
        description:
          'Chicken marinated with spices, garlic sauce, butter pickle spears served on a Iraqi bread.',
        image: '/images/36.png',
        category: '62af685520627a6d65ab983c',
        price: '8.99'
      },

      {
        name: 'Falafel sandwich',
        description:
          'Falafel is a deep-fried ball or patty-shaped fritter made from ground chickpeas, fava beans or both. Served on a Iraqi bread.',
        image: '/images/37.png',
        category: '62af685520627a6d65ab983c',
        price: '6.99'
      },

      {
        name: 'Burger',
        description: 'Only on Wednesday.',
        image: '/images/38.png',
        category: '62af685520627a6d65ab983c',
        price: '8.00'
      },

      {
        name: 'Lamb Tikka',
        description:
          'Well marinated Lamb, layered on a vertical rotisserie or spit, comes with tahini sauce, fries and pickles.',
        image: '/images/39.png',
        category: '62af685520627a6d65ab983c',
        price: '9.99'
      },

      // soup //

      {
        name: 'Bean Soup',
        description: '',
        image: '/images/40.png',
        category: '62af685520627a6d65ab983b',
        price: '5.00'
      },

      {
        name: 'Okra Soup',
        description: '',
        image: '/images/41.png',
        category: '62af685520627a6d65ab983b',
        price: '5.00'
      },

      {
        name: 'Rice',
        description: '',
        image: '/images/42.png',
        category: '62af685520627a6d65ab983b',
        price: '5.00'
      },

      {
        name: 'Rice and soup',
        description: '',
        image: '/images/43.png',
        category: '62af685520627a6d65ab983b',
        price: '10.00'
      },

      // Drinks //

      {
        name: 'Turkish Coffee',
        description: '',
        image: '/images/44.png',
        category: '62af685520627a6d65ab983d',
        price: '3.99'
      },

      {
        name: 'Hot Tea',
        description: '',
        image: '/images/45.png',
        category: '62af685520627a6d65ab983d',
        price: '1.50'
      },

      {
        name: 'Yogurt drink {Mint, Yogurt}',
        description: '',
        image: '/images/46.png',
        category: '62af685520627a6d65ab983d',
        price: '3.00'
      },

      {
        name: 'Soda Bottle',
        description: '',
        image: '/images/47.png',
        category: '62af685520627a6d65ab983d',
        price: '2.25'
      },

      {
        name: 'Balengo Drink',
        description: '',
        image: '/images/48.png',
        category: '62af685520627a6d65ab983d',
        price: '2.99'
      },

      {
        name: 'Rani Juice',
        description: '',
        image: '/images/49.png',
        category: '62af685520627a6d65ab983d',
        price: '2.25'
      }
    ];
    try {
      const data = await Menu.insertMany(defaultCategoryData);
      console.log('Collection created and data inserted.');
      return true;
    } catch (e) {
      console.log('Migration failed with follwing error ==> ', e);
      return false;
    }
  },
  down: async () => {
    console.log('Migration Down');
    await Mongoose.connection.db.dropCollection('menus');
    return true;
  }
};
