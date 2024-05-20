const express = require('express');
const router = express.Router();
const { VerifyToken } = require('../middlewares');

const Controllers = require('../controllers');
const Menu = Controllers.Menu;

router.get('/get-menu-details', Menu.GetMenuList);
router.get('/get-menu-details/:id', Menu.GetMenuList);
router.get('/get-menu-details-by-category/:category', Menu.GetMenuList);
router.get('/get-categories', Menu.GetCategoryList);
router.get('/get-categories/:id', Menu.GetCategoryList);

router.use(VerifyToken);
router.get('/update-menu/:id/:status', Menu.ToggleMenu);
router.get('/get-all-menu-details', Menu.GetAllMenuList);
router.get('/get-all-menu-details-by-category/:category', Menu.GetMenuList);
<<<<<<< HEAD
router.post('/edit-menu-details', Menu.EditMenuDetails);
=======
router.post('/edit-menu-price', Menu.EditMenuPrice);
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab

module.exports = router;
