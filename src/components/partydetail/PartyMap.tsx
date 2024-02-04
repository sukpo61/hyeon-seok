import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { DefaultText } from "@components/common/DefaultText";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

type PartyMapProps = Pick<
  PartyDetailResponse,
  "partyPlaceName" | "address" | "longitude" | "latitude"
>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 16px;
  justify-content: center;
  z-index: 8;
  background-color: white;
  border-radius: 12px;
`;

const PartyMap = (data: PartyMapProps) => {
  const { partyPlaceName, address, longitude, latitude } = data;
  return (
    <Container>
      <DefaultText
        text={`모임위치 : ${partyPlaceName}`}
        size={20}
        weight={600}
      />
      <Map
        center={{ lat: latitude, lng: longitude }}
        style={{ width: "100%", height: "400px", borderRadius: "20px" }}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
      <DefaultText text={address} size={16} />
    </Container>
  );
};

export default PartyMap;
