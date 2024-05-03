import { FC } from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useSetRecoilState } from 'recoil';
import { newNotificationRecoil } from 'src/recoil-states/newNotificationState';
import defaultRequest from 'src/lib/axios/defaultRequest';

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const setNotifications = useSetRecoilState(newNotificationRecoil);

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource;
        const accessToken = defaultRequest.defaults.headers.common['Authorization'] as string;
        const SSE = new EventSource(
            `${process.env.MATITTING_HOST_URL}/api/notifications/subscribe`,
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'text/event-stream',
                },
                heartbeatTimeout: 180 * 1000,
                withCredentials: true,
            },
        );

        SSE.onmessage = (event) => {
            if (event.data.includes('EventStream Created.')) {
                return;
            }
            const newNotification = JSON.parse(event.data);
            setNotifications((prevNotifications) => {
                if (prevNotifications.find((item) => item.id === newNotification.id)) {
                    return prevNotifications;
                }
                return [newNotification, ...prevNotifications];
            });
        };

        return () => {
            SSE.close();
        };
    }, []);

    return <>{children}</>;
};
