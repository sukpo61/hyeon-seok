import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { DefaultButton } from "@components/common/DefaultButton";
import { useMutation } from "@tanstack/react-query";
import getPartyJoin from "src/api/getPartyJoin";
import getPartyStatus from "src/api/getPartyStatus";
import postCreateParty from "src/api/postCreateParty";
import postParticipate from "src/api/postParticipate";
import postPartyDecision from "src/api/postPartyDecision";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 768px;
`;

const AuthButtonList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const Main = styled.div`
  display: flex;
  width: 400px;
  height: calc(100% - 76px);
  overflow-y: auto;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 40px;
`;

const Profile = () => {
  const { mutateAsync: getPartyJoinMutate } = useMutation({
    mutationFn: getPartyJoin,
  });
  const { mutateAsync: getPartyStatusMutate } = useMutation({
    mutationFn: getPartyStatus,
  });
  const { mutateAsync: postCreatePartyMutate } = useMutation({
    mutationFn: postCreateParty,
  });
  const { mutateAsync: postParticipateMutate } = useMutation({
    mutationFn: postParticipate,
  });
  const { mutateAsync: postPartyDecisionMutate } = useMutation({
    mutationFn: postPartyDecision,
  });

  return (
    <Container>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      <Main>
        <Logo>Maiting</Logo>
        <AuthButtonList>
          <DefaultButton
            text="postCreatePartyMutate"
            onClick={() => {
              postCreatePartyMutate({
                title: "테스트3",
                content: "붕어빵은 팥이 근본입니다.",
                partyTime: "2023-12-14T23:59:26.125Z",
                totalParticipant: 4,
                longitude: 126.88453591058602,
                latitude: 37.53645109566274,
                gender: "ALL",
                category: "한식",
                age: "2030",
                menu: "붕어빵",
                thumbnail:
                  " https://matitting.s3.ap-northeast-2.amazonaws.com/korean.jpeg",
              });
            }}
          />
          <DefaultButton
            text="getPartyJoinMutate(GUEST)"
            onClick={() => {
              getPartyJoinMutate({ role: "GUEST" });
            }}
          />
          <DefaultButton
            text="getPartyJoinMutate(USER)"
            onClick={() => {
              getPartyJoinMutate({ role: "USER" });
            }}
          />
          <DefaultButton
            text="getPartyJoinMutate(VOLUNTEER)"
            onClick={() => {
              getPartyJoinMutate({ role: "VOLUNTEER" });
            }}
          />
          <DefaultButton
            text="getPartyJoinMutate(HOST)"
            onClick={() => {
              getPartyJoinMutate({ role: "HOST" });
            }}
          />
          <DefaultButton
            text="getPartyStatusMutate(GUEST)"
            onClick={() => {
              getPartyStatusMutate({ id: 12, role: "GUEST" });
            }}
          />
          <DefaultButton
            text="getPartyStatusMutate(USER)"
            onClick={() => {
              getPartyStatusMutate({ id: 12, role: "USER" });
            }}
          />
          <DefaultButton
            text="getPartyStatusMutate(VOLUNTEER)"
            onClick={() => {
              getPartyStatusMutate({ id: 12, role: "VOLUNTEER" });
            }}
          />
          <DefaultButton
            text="getPartyStatusMutate(HOST)"
            onClick={() => {
              getPartyStatusMutate({ id: 12, role: "HOST" });
            }}
          />
          {/* GUEST, USER, VOLUNTEER, HOST */}
          <DefaultButton
            text="postParticipateMutate"
            onClick={() => {
              postParticipateMutate({
                partyId: 12,
                leaderId: 12,
                status: "ACCEPT",
              });
            }}
          />
          <DefaultButton
            text="postPartyDecisionMutate"
            onClick={() => {
              postPartyDecisionMutate({
                partyId: 13,
                leaderId: 1,
                status: "ACCEPT",
              });
            }}
          />
        </AuthButtonList>
      </Main>
    </Container>
  );
};

export default Profile;
