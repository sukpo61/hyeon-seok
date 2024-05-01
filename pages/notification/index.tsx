import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import styled from "@emotion/styled";
import { Color } from "styles/Color";
import { newNotificationRecoil } from "src/recoil-states/newNotificationState";
import { NotificationBox } from "@components/notification/NotificationBox";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { ObserverTrigger } from "@components/hoc/ObserverTrigger";
import { useState, useEffect, useCallback } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 40px;
`;
const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
  background: ${Color.Background};
  min-height: calc(100vh - 45px);
  height: 100%;
`;

const OFFSET = 15;

const NotificationPage = () => {
  const notifications = useRecoilValue(newNotificationRecoil);
  const [visibleNotifications, setVisibleNotifications] = useState(
    notifications.slice(0, OFFSET)
  );
  const [page, setPage] = useState(1);
  const router = useRouter();

  const onObserve = useCallback(() => {
    if (notifications.length > OFFSET * page) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page]);

  useEffect(() => {
    if (!getCookie("refreshToken")) {
      router.replace("/sign/up");
    }
  }, [router]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, OFFSET * page));
  }, [notifications, page]);

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        centerArea={<DefaultText text="알림 내역" size={20} weight={700} />}
      />
      <NotificationList>
        <ObserverTrigger onObserve={onObserve} observerMinHeight={"30px"}>
          {visibleNotifications?.map((data) => (
            <NotificationBox key={data.id} data={data} />
          ))}
        </ObserverTrigger>
      </NotificationList>
    </Container>
  );
};

export default NotificationPage;
