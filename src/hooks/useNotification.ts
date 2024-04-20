import { useState, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { getCookie } from "cookies-next";
import { useSetRecoilState } from "recoil";
import { newNotificationRecoil } from "src/recoil-states/newNotificationState";
import { NotificationResponse } from "types/notification/NotificationResponse";
import { useRouter } from "next/router";
import defaultRequest from "src/lib/axios/defaultRequest";

const useNotification = (isNotificationPage?: boolean) => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const setNewNotification = useSetRecoilState(newNotificationRecoil);
  const { replace } = useRouter();

  const resetNotification = () => {
    const newLastEventId = notifications[0]?.lastEventId;
    if (!newLastEventId) {
      return;
    }
    localStorage.setItem("LastEventId", newLastEventId);
    setNotifications([]);
  };

  useEffect(() => {
    if (!getCookie("refreshToken")) {
      //비로그인 상태에서 연결생성 방지
      if (isNotificationPage) {
        //비로그인 상태에서 알림페이지 진입시 로그인페이지 라우팅
        alert("로그인이 필요합니다. 로그인 해 주세요.");
        replace("/signin");
        return;
      }
      return;
    }

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const lastEventId = localStorage.getItem("LastEventId");
    const accessToken = defaultRequest.defaults.headers.common[
      "Authorization"
    ] as string;

    const SSE = new EventSource(
      `${process.env.MATITTING_HOST_URL}/api/notifications/subscribe`,
      {
        headers: {
          "Last-Event-ID": lastEventId || "",
          Authorization: accessToken,
          "Content-Type": "text/event-stream",
        },
        heartbeatTimeout: 180 * 1000,
        withCredentials: true,
      }
    );

    SSE.onmessage = (event) => {
      if (event.data.includes("EventStream Created.")) {
        return;
      }
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => {
        if (prevNotifications.find((item) => item.id === newNotification.id)) {
          return prevNotifications;
          // 재연결시 중복추가 방지
        }
        return [newNotification, ...prevNotifications];
      });
    };

    return () => {
      SSE.close();
    };
  }, []);

  useEffect(() => {
    setNewNotification(notifications.length);
  }, [notifications]);

  return { notifications, resetNotification };
};

export default useNotification;
