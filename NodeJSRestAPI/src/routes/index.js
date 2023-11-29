const express = require('express');
const router = express.Router();
const { VerifyToken } = require('../middlewares');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Server Test API
router.get('/', (req, res) => {
  res.status(200);
  res.json({ status: 'success', message: 'API Server Running.' });
});

//Import APIs
//router.use("/auth", require("./auth"));
router.use('/v1/menu', require('./menu'));
router.use('/v1/auth', require('./auth'));

// Protect all routes after this middleware
//router.use(VerifyToken);
router.use('/v1/order', require('./order'));

//router.use('/home', require('./home'));

// No router found
router.use((req, res) => {
  res.status(404);
  res.json({ status: 'failed', error: 'Router not found.' });
});

module.exports = router;
