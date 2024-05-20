const express = require('express');
const router = express.Router();
const { VerifyToken } = require('../middlewares');
const Controllers = require('../controllers');
const Order = Controllers.Order;

router.get('/get-resturant-status', Order.GetResturantStatus);
router.get('/get-resturant-timings', Order.GetResturantTimings);
router.get('/send-push', Order.SendPush);
router.use(VerifyToken);
router.post('/update-resturant-timings', Order.SetResturantTimings);
router.post('/place-order', Order.PlaceOrder);
router.get('/my-orders', Order.ListMyOrder);
router.get('/all-orders/:page', Order.AllOrders);
router.get('/pending-orders', Order.PendingOrders);
router.post('/update-order-status', Order.UpdateOrdersStatus);
router.get('/stats', Order.getStats);
router.get('/set-resturant-status/:status', Order.SetResturantStatus);

module.exports = router;
