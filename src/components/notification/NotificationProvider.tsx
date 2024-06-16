import { FC, ReactNode, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useSetRecoilState } from 'recoil';
import { newNotificationRecoil } from 'src/recoil-states/newNotificationState';
import defaultRequest from 'src/lib/axios/defaultRequest';
import { getCookie } from 'cookies-next';
import { useState } from 'react';

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const setNotifications = useSetRecoilState(newNotificationRecoil);
    const [token, setToken] = useState<string>('');
    const refreshToken = getCookie('refreshToken');

    const getAccessToken = async () => {
        const response = await defaultRequest.get('/oauth2/renew-token', {
            headers: {
                'Authorization-Refresh': refreshToken,
            },
        });
        const accessToken = response.headers['authorization'];
        setToken(accessToken);
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
            // 에러발생시 토큰 요청
            if (error.status === 401) {
                await getAccessToken();
            }
        };
    };

    useEffect(() => {
        // 토큰 갱신시 재연결, 로그인시만 연결
        if (refreshToken) {
            createSSE(token);
        }
    }, [token]);

    return <>{children}</>;
};
