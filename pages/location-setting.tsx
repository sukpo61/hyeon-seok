import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { MapCurrentPositionIcon } from "@components/icons/map/MapCurrentPositon.icon";
import styled from "@emotion/styled";
import { useGpsPosition } from "@hooks/useGpsPosition";
import { Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import getLocationAddress, {
  API_GET_LOCATION_ADDRESS_KEY,
} from "src/api/getLocationAddress";
import {
  PositionDataType,
  PositionSate,
} from "src/recoil-states/positionStates";
import { ColorToken } from "styles/Color";
import { Typography } from "styles/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  #go-back,
  #position-setting {
    cursor: pointer;
  }
`;

const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;
const SearchSection = styled.section`
  width: 100%;
  max-width: 768px;
  margin: 15px auto 0px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 13px;
  input {
    all: unset;
    width: 100%;
    height: 20px;
  }
`;

const InvalidMessage = styled.div`
  position: relative;
  ${Typography.Body.Body3Regular}
  color:${ColorToken.danger};
`;

const LocationSettingPage = () => {
  const [position, setPosition] = useRecoilState(PositionSate);
  const [mapPosition, setMapPosition] = useState<PositionDataType>();
  const [isKeywordError, setIsKeywordError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { location } = useGpsPosition();
  const router = useRouter();

  const { data: addressData } = useQuery({
    queryKey: [
      API_GET_LOCATION_ADDRESS_KEY,
      { latitude: position.coords.x, longitude: position.coords.y },
    ],
    queryFn: () =>
      getLocationAddress({
        latitude: position.coords.x,
        longitude: position.coords.y,
        kakaoRestApiKey: String(process.env.KAKAO_RESTAPI_KEY),
      }),
    enabled: !!position.coords.x,
  });

  const clickPositionSettingButton = () => {
    if (!mapPosition) {
      return;
    }
    setPosition(mapPosition);
    router.push("/");
  };

  // // 저장된 키 이후, 사용자 엔터 입력 시, 카카오 서버 측에 해당 키워드 기반 위치 정보 요청.
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const places = new kakao.maps.services.Places();
      places.keywordSearch(
        inputRef.current?.value || "",
        (data, status, _pagination) => {
          const resultStatus = kakao.maps.services.Status;
          if (status === resultStatus.ERROR) return;

          if (status === resultStatus.ZERO_RESULT) {
            setIsKeywordError(true);
          }

          if (status === resultStatus.OK) {
            setIsKeywordError(false);
            setMapPosition({
              coords: {
                x: Number(data[0].y),
                y: Number(data[0].x),
              },
              address: data[0].address_name,
            });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (!position.coords.x)
      setPosition((prev) => ({
        ...prev,
        coords: {
          x: location?.latitude || 0,
          y: location?.longitude || 0,
        },
      }));
  }, [location?.latitude, location?.longitude, position.coords.x, setPosition]);

  // 최초 맵 마운트 시,포지션 업데이트.
  useEffect(() => {
    const address = addressData?.documents[0].address;
    if (mapPosition?.address || !address) {
      return;
    }
    setMapPosition({
      address: `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`,
      coords: position["coords"],
    });
  }, [addressData?.documents, mapPosition?.address, position]);

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        rightArea={
          <div id="position-setting" onClick={clickPositionSettingButton}>
            위치지정
          </div>
        }
      />
      <SearchSection>
        <div className="position-text">
          <DefaultText text={String(mapPosition?.address || "")} size={15} />
        </div>
        <Divider />
        <div className="serach-input">
          <input
            placeholder="지역명, 대학, 역명으로 검색하세요."
            name="search-position"
            defaultValue=""
            onKeyUp={handleKeyPress}
            ref={inputRef}
          />
        </div>
        {isKeywordError && (
          <InvalidMessage>{"올바른 검색어로 입력해 주세요."}</InvalidMessage>
        )}
      </SearchSection>
      <MapSection>
        <Map
          center={{
            lat: mapPosition?.coords.x || 0,
            lng: mapPosition?.coords.y || 0,
          }}
          style={{
            width: "100%",
            maxWidth: "768px",
            margin: "30px auto 0 auto",
            height: "100%",
          }}
          maxLevel={5}
          minLevel={3}
          onDragEnd={(map) => {
            const geocoder = new kakao.maps.services.Geocoder();
            const callback = (
              result: Array<{
                address: kakao.maps.services.Address;
                road_address: kakao.maps.services.RoadAaddress | null;
              }>,
              status: kakao.maps.services.Status
            ) => {
              if (status === kakao.maps.services.Status.OK) {
                setMapPosition({
                  coords: {
                    x: map.getCenter().getLat(),
                    y: map.getCenter().getLng(),
                  },
                  address: `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`,
                });
              }
            };

            geocoder.coord2Address(
              map.getCenter().getLng(),
              map.getCenter().getLat(),
              callback
            );
          }}
        >
          <MapMarker
            position={{
              lat: position.coords.x,
              lng: position.coords.y,
            }}
          />

          <div
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(50%,-50%)",
              zIndex: "9999",
            }}
          >
            <MapCurrentPositionIcon />
          </div>
        </Map>
      </MapSection>
    </Container>
  );
};

export default LocationSettingPage;
