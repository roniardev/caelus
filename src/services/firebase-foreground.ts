'use client';

import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

import firebaseApp from './firebase';
import useFcmToken from '../utils/hooks/useFCMToken';

export function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          // eslint-disable-next-line no-new
          new Notification(payload.data?.title || '', {
            body: payload.data?.body || '',
            icon: payload.data?.icon || '/favicon.svg',
          });
          // eslint-disable-next-line no-console
          console.log('Foreground push notification received:', payload);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus, fcmToken]);

  return null; // This component is primarily for handling foreground notifications
}
