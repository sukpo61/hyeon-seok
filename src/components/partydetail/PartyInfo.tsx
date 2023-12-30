import styled from "@emotion/styled";
import { Color } from "styles/Color";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";
import PartyMap from "./PartyMap";
import PartyBrief from "./PartyBrief";
import PartyDetail from "./PartyDetail";
import PartyHostInfo from "./PartyHostInfo";

interface PartyInfoProps {
  data: PartyDetailResponse;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  background-color: ${Color.LightGrey};
  z-index: 99;
`;

const PartyInfoContainer = styled.div`
  display: flex;
  padding: 16px 0;
  min-width: 600px;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 20px;
  background-color: ${Color.LightGrey};
`;

const PartyInfo = ({ data }: PartyInfoProps) => {
  const {
    partyTitle,
    partyContent,
    isLeader,
    gender,
    age,
    deadline,
    partyTime,
    totalParticipate,
    participate,
    menu,
    hit,
    address,
    longitude,
    latitude,
  } = data;

  const partyBriefData = {
    partyTitle,
    hit,
    totalParticipate,
    participate,
    gender,
    age,
  };

  const partyDetailData = {
    deadline,
    partyTime,
    menu,
    partyContent,
  };

  const partyMapData = {
    address,
    longitude,
    latitude,
  };

  return (
    <Container>
      <PartyInfoContainer>
        {isLeader && <PartyHostInfo />}
        <PartyBrief {...partyBriefData} />
        <PartyDetail {...partyDetailData} />
        <PartyMap {...partyMapData} />
      </PartyInfoContainer>
    </Container>
  );
};

export default PartyInfo;
