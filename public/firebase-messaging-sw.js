importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyC5ndKknVardmTr7BgF3Mqzujxt5AnK138',
  authDomain: 'goodnessbois.firebaseapp.com',
  projectId: 'goodnessbois',
  storageBucket: 'goodnessbois.appspot.com',
  messagingSenderId: '420442853131',
  appId: '1:420442853131:web:24dc758f08ebd22d055c0e',
  measurementId: 'G-NQDJQWD4N0'
};

firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  /*const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };*/

  //self.registration.showNotification(notificationTitle, notificationOptions);
});
