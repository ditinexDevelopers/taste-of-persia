const path = require('path');
const dotenv = require('dotenv').config();
const dotenvExample = require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.example')
});

if (
  JSON.stringify(Object.keys(dotenv.parsed).sort()) !==
  JSON.stringify(Object.keys(dotenvExample.parsed).sort())
) {
  throw Error('Missing values in .env. Please refer to .env.example');
}

module.exports = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_CONNECTION_STRING,
  secret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  public_image_url: process.env.PUBLIC_URL + '/images/',
  tokenExpiryLimit: 86400,
  otpExpiryLimit: 1,
  squareAccessToken: process.env.SQUARE_ACCESS_TOKEN,
  isAppSocketIOEnable: false,
  twilo: {
    account_sid: process.env.TWILO_ACCOUNT_SID,
    auth_token: process.env.TWILO_AUTH_TOKEN,
    mobile_number: process.env.TWILO_MOBILE_NUMBER
  }
};
