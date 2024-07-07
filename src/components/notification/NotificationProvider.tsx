import { FC, ReactNode, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useSetRecoilState } from 'recoil';
import { newNotificationRecoil } from 'src/recoil-states/newNotificationState';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { getCookie } from 'cookies-next';

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const setNotifications = useSetRecoilState(newNotificationRecoil);
    const refreshToken = getCookie('refreshToken');

    const getAccessToken = async () => {
        try {
            const response = await defaultRequest.get('/oauth2/renew-token', {
                headers: {
                    'Authorization-Refresh': refreshToken,
                },
            });
            const accessToken = response.headers['authorization'];
            return accessToken;
        } catch (error) {
            console.error('토큰 갱신 실패:', error);
            return Promise.reject(error);
        }
    };

    const createSSE = async (token: string) => {
        const EventSource = EventSourcePolyfill || NativeEventSource;

        const SSE = new EventSource(
            `${process.env.MATITTING_HOST_URL}/api/notifications/subscribe`,
            {
                headers: {
                    Authorization: token,
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

        SSE.onerror = async (error) => {
            if (error.status === 401) {
                SSE.close();
                await initializeSSE();
            }
            return Promise.reject(error);
        };
    };

    const initializeSSE = async () => {
        if (!refreshToken) {
            console.error('리프레시 토큰이 없습니다');
            return;
        }
        try {
            const token = await getAccessToken();
            await createSSE(token);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    useEffect(() => {
        initializeSSE();
    }, [refreshToken]);

    return <>{children}</>;
};
