const admin = require('firebase-admin');

const serviceAccount = require('./goodnessbois-firebase-adminsdk-6viaj-447da4be7e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  sendPush: async (token) => {
    try {
      const messaging = admin.messaging();
      messaging
        .sendToDevice(
          token,
          {
            notification: {
              title: 'The Goodnessland',
              body: 'A new order is placed.'
            }
          },
          {
            priority: 'high'
          }
        )
        .then((response) => console.log(response.results[0]))
        .catch((e) => console.log(e));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
