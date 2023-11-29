import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from 'firebase.json';
import Config from 'config';
import { toast } from 'react-toastify';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseCloudMessaging = {
  init: () => {
    return new Promise((resolve, reject) => {
      console.log('Initialize');
      const analytics = getAnalytics(app);
      const messaging = getMessaging(app);
      resolve(true);
      /*if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(function (registration) {
            resolve(registration);
          })
          .catch(function (err) {
            console.log(err);
            resolve(null);
          });
      }*/
    });
  },
  getToken: () => {
    return new Promise((resolve, reject) => {
      const messaging = getMessaging();
      getToken(messaging, {
        vapidKey: Config.VAPID
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            resolve(currentToken);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
    });
  },
  pushListener: () => {
    console.log('push listener');
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received2222222. ', payload);
      const audio = new Audio(
        'https://drive.google.com/uc?export=download&id=1KrZnjIK8dN0blp8-3jG6kCUkVvcsIelX'
      );
      audio.play();
      toast.info('New Order Received.');
      //new Notification(payload.data.title, { body: payload.data.body, icon: '/firebase-logo.png' });
    });
  }
};

export default firebaseCloudMessaging;
