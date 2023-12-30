import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import { DefaultButton } from "@components/common/DefaultButton";

interface ConfirmPopupProps {
  CanclePopup: MouseEventHandler;
  ConfirmPopup: MouseEventHandler;
  description: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const PopUpDescription = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 40px;
`;
const PartyDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 400px;
  background-color: white;
  border-radius: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: white;
  border-radius: 12px;
`;

const ConfirmPopup = ({
  CanclePopup,
  ConfirmPopup,
  description,
}: ConfirmPopupProps) => {
  return (
    <Container>
      <PartyDetailContainer>
        <PopUpDescription>{description}</PopUpDescription>
        <ButtonContainer>
          <DefaultButton
            text="확인"
            onClick={ConfirmPopup}
            style={{
              width: "100px",
            }}
          />
          <DefaultButton
            text="취소"
            onClick={CanclePopup}
            buttonType="secondary"
            style={{
              width: "100px",
            }}
          />
        </ButtonContainer>
      </PartyDetailContainer>
    </Container>
  );
};

export default ConfirmPopup;
