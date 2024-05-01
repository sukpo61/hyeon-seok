import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import styled from "@emotion/styled";
import { Color } from "styles/Color";
import useNotification from "@hooks/useNotification";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

const NotificationPage = () => {
  const { notifications } = useNotification();

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        centerArea={<DefaultText text="알림 내역" size={20} weight={700} />}
      />
      <NotificationList>
        {notifications?.map((item) => (
          <></>
        ))}
      </NotificationList>
    </Container>
  );
};

export default NotificationPage;
