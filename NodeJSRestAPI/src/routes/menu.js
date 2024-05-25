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
router.post('/edit-menu-details', Menu.EditMenuDetails);
router.post('/add-new-menu', Menu.AddNewMenuItem);

module.exports = router;
