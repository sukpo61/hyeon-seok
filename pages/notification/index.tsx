import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import styled from "@emotion/styled";
import { Color } from "styles/Color";
import useNotification from "@hooks/useNotification";
import { NotificationBox } from "@components/notification/NotificationBox";
import { DefaultButton } from "@components/common/DefaultButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const ResetButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  justify-content: center;
  position: absolute;
  position: fixed;
  bottom: 0;
  background-color: white;
  padding: 10px;
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
  const { notifications, resetNotification } = useNotification(true);

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        centerArea={<DefaultText text="알림 내역" size={20} weight={700} />}
      />
      <NotificationList>
        {notifications?.map((data) => (
          <NotificationBox key={data.id} {...data}></NotificationBox>
        ))}
      </NotificationList>
      <ResetButtonContainer>
        <DefaultButton
          text={"모두지우기"}
          style={{
            width: "60%",
          }}
          onClick={resetNotification}
        />
      </ResetButtonContainer>
    </Container>
  );
};

export default NotificationPage;
