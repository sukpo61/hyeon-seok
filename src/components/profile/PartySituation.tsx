import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import PartyList from "./PartyList";
import getPartyStatus from "src/api/getPartyStatus";
import { API_GET_PARTY_STATUS_KEY } from "src/api/getPartyStatus";
import { useQuery } from "@tanstack/react-query";
import ButtonList from "./ButtonList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PartyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  height: 1200px;
`;

const PartySituation = () => {
  const [partystate, setPartystate] = useState<string>("HOST");

  const { data } = useQuery({
    queryKey: [API_GET_PARTY_STATUS_KEY, { partystate }],
    queryFn: () => getPartyStatus({ role: partystate }),
    enabled: !!partystate,
  });

  const buttonlistinfo = [
    {
      text: "참가중",
      value: "VOLUNTEER",
    },
    {
      text: "모집중",
      value: "HOST",
    },
  ];

  const setButtonState = (state: string) => {
    setPartystate(state);
  };

  return (
    <Container>
      <ButtonList
        listinfo={buttonlistinfo}
        state={partystate}
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
