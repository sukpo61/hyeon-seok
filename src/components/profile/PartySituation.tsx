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

const initdata = [
  {
    userId: 10,
    partyId: 1,
    partyTitle: "붕어빵 드실 분",
    partyContent: "붕어빵은 팥이 근본입니다.",
    address: "서울 송파구 송파동 7-1",
    longitude: 126.88453591058602,
    latitude: 37.53645109566274,
    status: "RECRUIT",
    gender: "ALL",
    age: "2030",
    deadline: "2024-01-06T13:34:06.535Z",
    partyTime: "2024-01-06T13:34:06.535Z",
    totalParticipate: 4,
    participate: 2,
    menu: "붕어빵",
    category: "한식",
    thumbnail: "/images/profile/profile.png",
    hit: 1,
  },
];

const PartySituation = () => {
  const [partystate, setPartystate] = useState<string>("HOST");

  const { data, isSuccess, isError, error, isLoading } = useQuery({
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
