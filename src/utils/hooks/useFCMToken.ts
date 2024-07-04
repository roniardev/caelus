'use client';

import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';

import firebaseApp from '@/services/firebase';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BNsDw-VxIP7qGgWgliRrcyVEqc0ZUYRV31FFlKH4YxKeoeJRsxeElwf-3JM0NbdsxgiLo1rf-A_uVPtGf1als90', // Replace with your Firebase project's VAPID key
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              // eslint-disable-next-line no-console
              console.log(
                'No registration token available. Request permission to generate one.',
              );
            }
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
