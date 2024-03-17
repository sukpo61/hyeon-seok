import React from "react";
import styled from "@emotion/styled";
import ButtonList from "./ButtonList";
import { useQuery } from "@tanstack/react-query";
import getPartyJoin from "src/api/getPartyJoin";
import { API_GET_PARTY_JOIN_KEY } from "src/api/getPartyJoin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postPartyDecision from "src/api/postPartyDecision";
import PartyRequest from "./PartyRequest";
import postParticipate from "src/api/postParticipate";
import { useRouter } from "next/router";

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
  const queryClient = useQueryClient();
  const router = useRouter();
  const role = router.query.role as string;

  const { data } = useQuery({
    queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
    queryFn: () => getPartyJoin({ role }),
    enabled: !!role,
  });

  const postDecisionMutate = useMutation({
    mutationFn: postPartyDecision,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
      });
    },
  });

  const postParticipateMutate = useMutation({
    mutationFn: postParticipate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_GET_PARTY_JOIN_KEY, { role }],
      });
    },
  });

  const joinDecision = (id: number, nickname: string, status: boolean) => {
    if (role === "HOST") {
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
      text: "받은요청",
      value: "HOST",
    },
    {
      text: "보낸요청",
      value: "VOLUNTEER",
    },
  ];

  const setButtonState = (state: string) => {
    router.replace({
      query: {
        ...router.query,
        role: state,
      },
    });
  };

  return (
    <Container>
      <ButtonList
        listinfo={buttonlistinfo}
        state={role}
        setState={setButtonState}
      />
      <RequestListContainer>
        {data?.map((requsetdata) => (
          <PartyRequest
            key={requsetdata.nickname}
            role={role}
            data={requsetdata}
            joinDecision={joinDecision}
          />
        ))}
      </RequestListContainer>
    </Container>
  );
};

export default PartyRequestList;
