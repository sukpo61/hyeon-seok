import React from "react";
import styled from "@emotion/styled";
import PartyList from "./PartyList";
import getPartyStatus from "src/api/getPartyStatus";
import { API_GET_PARTY_STATUS_KEY } from "src/api/getPartyStatus";
import { useQuery } from "@tanstack/react-query";
import ButtonList from "./ButtonList";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PartyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
`;

const PartySituation = () => {
  const router = useRouter();
  const role = router.query.role as string;

  const { data } = useQuery({
    queryKey: [API_GET_PARTY_STATUS_KEY, { role }],
    queryFn: () => getPartyStatus({ role }),
    enabled: !!role,
  });

  const buttonlistinfo = [
    {
      text: "모집중",
      value: "HOST",
    },
    {
      text: "참가중",
      value: "VOLUNTEER",
    },
  ];

  const setButtonState = (state: string) => {
    router.push({
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
      <PartyListContainer>
        {data?.map((partydata) => (
          <PartyList key={partydata.partyId} data={partydata} />
        ))}
      </PartyListContainer>
    </Container>
  );
};

export default PartySituation;
