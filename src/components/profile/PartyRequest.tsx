import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { DefaultText } from "@components/common/DefaultText";
import CheckIcon from "@components/icons/common/Check.icon";
import CloseIcon from "@components/icons/common/Close.icon";
import { PartyJoinResponse } from "types/party/join/PartyJoinResponse";
import Link from "next/link";

interface PartyRequestProps {
  role: string;
  data: PartyJoinResponse;
  joinDecision: (id: number, nickname: string, status: boolean) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 72px;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ebebeb;
`;

const RequsetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const IconContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
`;

const PartyRequest = ({ role, data, joinDecision }: PartyRequestProps) => {
  const { partyId, partyTitle, nickname } = data;

  const isHost = role === "HOST";

  const acceptRequset = () => {
    joinDecision(partyId, nickname, true);
  };

  const refuseRequset = () => {
    joinDecision(partyId, nickname, false);
  };

  return (
    <Container>
      <RequsetInfo>
        <Image
          src="/images/profile/profile.png"
          alt="프로필사진"
          width={48}
          height={48}
          style={{ borderRadius: "50%" }}
        />
        {isHost && <DefaultText text={nickname} size={14} />}
        <Link href={`/partydetail/${partyId}`}>
          {isHost ? (
            <DefaultText text={`@${partyTitle}`} size={14} color="#536471" />
          ) : (
            <DefaultText text={partyTitle} size={14} />
          )}
        </Link>
      </RequsetInfo>
      <ButtonContainer>
        {isHost && (
          <IconContainer onClick={acceptRequset}>
            <CheckIcon />
          </IconContainer>
        )}
        <IconContainer onClick={refuseRequset}>
          <CloseIcon />
        </IconContainer>
      </ButtonContainer>
    </Container>
  );
};

export default PartyRequest;
