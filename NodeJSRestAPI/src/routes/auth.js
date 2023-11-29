const express = require('express');
const router = express.Router();
const { VerifyToken } = require('../middlewares');

const Controllers = require('../controllers');
const Auth = Controllers.Auth;

router.post('/signup', Auth.Signup);
router.post('/login', Auth.Login);
router.post('/forgot-password', Auth.ForgotPassword);
router.get('/refresh-token/:id/:token', Auth.RefreshToken);
router.get('/login-by-token/:id/:token', Auth.LoginByToken);
router.use(VerifyToken);
router.post('/update-profile', Auth.UpdateProfile);
router.post('/change-password', Auth.UpdatePassword);
router.post('/update-push-token', Auth.UpdatePushToken);

module.exports = router;
