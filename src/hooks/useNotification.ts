import { useState, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { getCookie } from "cookies-next";
import { NotificationResponse } from "types/notification/NotificationResponse";
import { useRouter } from "next/router";

const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const router = useRouter();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (!accessToken) {
      router.replace("/signin");
    }

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const SSE = new EventSource(
      `${process.env.MATITTING_HOST_URL}/api/notifications/subscribe`,
      {
        headers: {
          Authorization: String(accessToken),
          "Content-Type": "text/event-stream",
        },
        withCredentials: true,
      }
    );

    SSE.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    return () => {
      SSE.close();
    };
  }, []);

  return { notifications };
};

export default useNotification;
