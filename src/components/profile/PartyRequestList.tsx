import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import ButtonList from "./ButtonList";
import { useQuery } from "@tanstack/react-query";
import getPartyJoin from "src/api/getPartyJoin";
import { API_GET_PARTY_JOIN_KEY } from "src/api/getPartyJoin";
import { useMutation } from "@tanstack/react-query";
import postPartyDecision from "src/api/postPartyDecision";
import PartyRequest from "./PartyRequest";
import postParticipate from "src/api/postParticipate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const RequestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const PartyRequestList = () => {
  const [requestState, setRequestState] = useState<string>("HOST");

  const { data } = useQuery({
    queryKey: [API_GET_PARTY_JOIN_KEY, { requestState }],
    queryFn: () => getPartyJoin({ role: requestState }),
    enabled: !!requestState,
  });

  const postDecisionMutate = useMutation({
    mutationFn: postPartyDecision,
  });

  const postParticipateMutate = useMutation({
    mutationFn: postParticipate,
  });

  const joinDecision = (id: number, nickname: string, status: boolean) => {
    if (requestState === "HOST") {
      return postDecisionMutate.mutate({
        nickname: nickname,
        partyId: Number(id),
        status: `${status ? "ACCEPT" : "REFUSE"}`,
      });
    }
    postParticipateMutate.mutate({
      partyId: Number(id),
      status: `${status ? "APPLY" : "CANCEL"}`,
    });
  };

  const buttonlistinfo = [
    {
      text: "보낸요청",
      value: "VOLUNTEER",
    },
    {
      text: "받은요청",
      value: "HOST",
    },
  ];

  const setButtonState = (state: string) => {
    setRequestState(state);
  };

  return (
    <Container>
      <ButtonList
        listinfo={buttonlistinfo}
        state={requestState}
        setState={setButtonState}
      />
      <RequestListContainer>
        {data?.map((requsetdata) => (
          <PartyRequest
            key={requsetdata.nickname}
            type={requestState}
            data={requsetdata}
            joinDecision={joinDecision}
          />
        ))}
      </RequestListContainer>
    </Container>
  );
};

export default PartyRequestList;
