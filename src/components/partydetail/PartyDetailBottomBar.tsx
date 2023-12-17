import styled from "@emotion/styled";
import { DefaultButton } from "@components/common/DefaultButton";
import { useMutation } from "@tanstack/react-query";
import postParticipate from "src/api/postParticipate";
import DeleteIcon from "@components/icons/common/Delete.icon";
import EditIcon from "@components/icons/common/Edit.icon";
import { DefaultModalContainer } from "@components/common/DefaultModalContainer";
import { Transition } from "@mantine/core";
import { useState } from "react";
import PartyDeleteConfirmPopup from "./PartyDeleteConfirmPopup";

interface PartyDetailBottomBarProps {
  id: string;
  userId: number;
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

const PartyDetailBottomBar = ({ id, userId }: PartyDetailBottomBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: participateParty } = useMutation({
    mutationFn: postParticipate,
  });

  const onClickParticipateHandler = () => {
    participateParty({
      partyId: parseInt(id),
      leaderId: userId,
      status: "ACCEPT",
    });
  };

  const onClickDeleteHandler = () => {
    setIsOpen(true);
  };

  const onClickEditHandler = () => {
    //편집페이지 라우팅 및 데이터전달
  };

  return (
    <Container>
      <BottomBarContainer>
        {true ? (
          // 방장여부분기
          <HostPannelContainer>
            <DefaultButton
              text={"참가신청"}
              onClick={onClickParticipateHandler}
              style={{
                width: "60%",
              }}
            />
            <IconContainer onClick={onClickDeleteHandler}>
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
              onClick={onClickParticipateHandler}
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
            <PartyDeleteConfirmPopup id={id} setIsOpen={setIsOpen} />
          </DefaultModalContainer>
        )}
      </Transition>
    </Container>
  );
};

export default PartyDetailBottomBar;
