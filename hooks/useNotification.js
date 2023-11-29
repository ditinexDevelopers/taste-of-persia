import React, { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

/*
 * Hook for useNotification
 *
 */

const useNotification = () => {
  useEffect(() => {
    /*const firebaseConfig = {
      apiKey: 'AIzaSyDqZ9jFIlBuAd7y3z6FQB3EsWHmq4dGXpo',
      authDomain: 'goodneand.firebaseapp.com',
      projectId: 'goodneand',
      storageBucket: 'goodneand.appspot.com',
      messagingSenderId: '1007159160501',
      appId: '1:1007159160501:web:16ab8dc22c5e4a96fb58fc',
      measurementId: 'G-L32K1KH683'
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    getToken(messaging, {
      vapidKey:
        'BLeBh6xtavp4uiqsAOI-kVfh5aI8rZrmMemcNSbz4x57ftelwuTzvGj4dQLAKNIdPnpwrrcPM63tW0f3AHbOh44'
    })
      .then((currentToken) => {})
      .catch((err) => {});

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }*/
  }, []);

  const generateToken = () => {
    return new Promise((myResolve, myReject) => {
      const firebaseConfig = {
        apiKey: 'AIzaSyDqZ9jFIlBuAd7y3z6FQB3EsWHmq4dGXpo',
        authDomain: 'goodneand.firebaseapp.com',
        projectId: 'goodneand',
        storageBucket: 'goodneand.appspot.com',
        messagingSenderId: '1007159160501',
        appId: '1:1007159160501:web:16ab8dc22c5e4a96fb58fc',
        measurementId: 'G-L32K1KH683'
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          'BLeBh6xtavp4uiqsAOI-kVfh5aI8rZrmMemcNSbz4x57ftelwuTzvGj4dQLAKNIdPnpwrrcPM63tW0f3AHbOh44'
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            myResolve(currentToken);
          } else {
            myReject('Please allow permission first.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          myReject('Please allow permission first.');
        });

      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
      });
    });
  };

  const requestPermission = () => {
    return new Promise((myResolve, myReject) => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          myResolve(true);
        } else {
          myResolve(false);
        }
      });
    });
  };

  return { requestPermission, generateToken };
};

export default useNotification;
