import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

export default function useNotify() {
    const requestPermission = async () => {
        if (!('Notification' in window)) {
            toast.error('This browser does not support notifications.');
            return;
        }
        const status = await Notification.requestPermission();
        console.log(status);
    }

    const showNotification = (title, message) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { 
                body: message ,
                icon: '/logo.png'
            });
        }
    }

    useEffect(() => {
        requestPermission();
        return () => {
            console.log('Cleanup');
        }
    }
    )

    return { showNotification }


}
