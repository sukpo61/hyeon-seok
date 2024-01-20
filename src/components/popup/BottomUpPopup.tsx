import CloseIcon from "@components/icons/common/Close.icon";
import styled from "@emotion/styled";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { ColorToken } from "styles/Color";

interface BottomUpPopupProps {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

const Container = styled.div`
  border: 1px solid ${ColorToken.white};
  width: 100%;
  max-width: 768px;
  padding: 15px;
  position: fixed;
  bottom: 0;
  background: ${ColorToken.white};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContentsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const BottomUpPopup = ({
  setIsOpenModal,
  children,
}: BottomUpPopupProps) => {
  return (
    <Container>
      <CloseIconContainer>
        <div
          onClick={() => {
            setIsOpenModal(false);
          }}
        >
          <CloseIcon />
        </div>
      </CloseIconContainer>
      <ContentsSection>{children}</ContentsSection>
    </Container>
  );
};
