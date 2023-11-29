const { twilo } = require('../config/vars');
const twilio = require('twilio');

module.exports = {
  sendSMS: async (to, sms) => {
    try {
      const client = new twilio(twilo.account_sid, twilo.auth_token);
      const from = twilo.mobile_number;
      const response = await client.messages.create({
        body: sms,
        to: '+1' + to, // Text this number
        from: from // From a valid Twilio number
      });
      console.log(response);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
