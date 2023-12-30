import styled from "@emotion/styled";
import DeleteIcon from "@components/icons/common/Delete.icon";
import EditIcon from "@components/icons/common/Edit.icon";
import { DefaultButton } from "@components/common/DefaultButton";
import { DefaultModalContainer } from "@components/common/DefaultModalContainer";
import { Transition } from "@mantine/core";
import { useState } from "react";
import { MouseEventHandler } from "react";
import ConfirmPopup from "../popup/ConfirmPopup";

interface PartyDetailBottomBarProps {
  participateParty: MouseEventHandler;
  partyDetailDelete: MouseEventHandler;
  isLeader: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  z-index: 99999999999999;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
`;

const BottomBarContainer = styled.div`
  width: 768px;
  display: flex;
`;

const ParcitipateButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const HostPannelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
`;

const PartyDetailBottomBar = ({
  participateParty,
  partyDetailDelete,
  isLeader,
}: PartyDetailBottomBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenConfirmPopup = () => {
    setIsOpen(true);
  };

  const CloseConfirmPopup = () => {
    setIsOpen(false);
  };

  const onClickEditHandler = () => {
    //편집페이지 라우팅 및 데이터전달
  };

  return (
    <Container>
      <BottomBarContainer>
        {isLeader ? (
          <HostPannelContainer>
            <IconContainer onClick={OpenConfirmPopup}>
              <DeleteIcon />
            </IconContainer>
            <IconContainer onClick={onClickEditHandler}>
              <EditIcon />
            </IconContainer>
          </HostPannelContainer>
        ) : (
          <ParcitipateButtonContainer>
            <DefaultButton
              text={"참가신청"}
              onClick={participateParty}
              style={{
                width: "60%",
              }}
            />
          </ParcitipateButtonContainer>
        )}
      </BottomBarContainer>
      <Transition
        transition={`fade`}
        mounted={isOpen}
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <DefaultModalContainer style={styles}>
            <ConfirmPopup
              CanclePopup={CloseConfirmPopup}
              ConfirmPopup={partyDetailDelete}
              description="정말로 삭제하시겠습니까?"
            />
          </DefaultModalContainer>
        )}
      </Transition>
    </Container>
  );
};

export default PartyDetailBottomBar;
