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
  const partyBriefData = {
    partyTitle: data.partyTitle,
    category: data.category,
    hit: data.hit,
    totalParticipant: data.totalParticipant,
    participate: data.participate,
    gender: data.gender,
    age: data.age,
  };

  const partyDetailData = {
    deadline: data.deadline,
    partyTime: data.partyTime,
    menu: data.menu,
    partyContent: data.partyContent,
  };

  const partyMapData = {
    partyPlaceName: data.partyPlaceName,
    address: data.address,
    longitude: data.longitude,
    latitude: data.latitude,
  };

  return (
    <Container>
      <PartyInfoContainer>
        {data.isLeader && <PartyHostInfo />}
        <PartyBrief {...partyBriefData} />
        <PartyDetail {...partyDetailData} />
        <PartyMap {...partyMapData} />
      </PartyInfoContainer>
    </Container>
  );
};

export default PartyInfo;
