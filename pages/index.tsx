import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultModalContainer } from "@components/common/DefaultModalContainer";
import QuerySuspenseErrorBoundary from "@components/hoc/QuerySuspenseErrorBoundary";
import { HomeList } from "@components/home/HomeList";
import HomeHeader from "@components/home/header";
import PositionComponent from "@components/home/position";
import { BottomUpPopup } from "@components/popup/BottomUpPopup";
import styled from "@emotion/styled";
import { useGpsPosition } from "@hooks/useGpsPosition";
import { Transition } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import getLocationAddress, {
  API_GET_LOCATION_ADDRESS_KEY,
} from "src/api/getLocationAddress";
import { PositionSate } from "src/recoil-states/positionStates";
import { Color } from "styles/Color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-height: calc(100vh);
  max-width: 768px;
  background: ${Color.VeryLightGrey};
`;

const Home: NextPage = () => {
  const [isClickPosition, setIsClickPosition] = useState(false);
  const [isResetPosition, setIsResetPosition] = useState(false);
  const { location } = useGpsPosition();
  const [position, setPosition] = useRecoilState(PositionSate);

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

  const onClickPosition = () => {
    setIsClickPosition(true);
  };

  const onClickCurrentPosition = () => {
    setIsResetPosition(true);
    setIsClickPosition(false);
  };
  const onClickMapPosition = () => {
    setIsClickPosition(false);
  };

  useEffect(
    function positionSetting() {
      if (!position.coords.x || isResetPosition)
        setPosition((prev) => ({
          ...prev,
          coords: {
            x: location?.latitude || 0,
            y: location?.longitude || 0,
          },
        }));
    },
    [
      isResetPosition,
      location?.latitude,
      location?.longitude,
      position.coords.x,
      setPosition,
    ]
  );

  useEffect(
    function setAddress() {
      if (!position.coords.x || !position.coords.y) {
        return;
      }
      const address = addressData?.documents[0].address;
      if (!address) {
        return;
      }
      setPosition((prev) => ({
        ...prev,
        address: `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`,
      }));
    },
    [addressData?.documents, position.coords.x, position.coords.y, setPosition]
  );

  return (
    <Container>
      <DefaultHeader
        centerArea={
          <HomeHeader.CenterArea
            onClick={onClickPosition}
            position={position}
          />
        }
        rightArea={<HomeHeader.RightArea />}
      />

      <QuerySuspenseErrorBoundary>
        <HomeList />
      </QuerySuspenseErrorBoundary>

      {/* 현재 위치 재설정 맵 팝업.*/}
      <Transition
        transition={`slide-up`}
        mounted={isClickPosition ?? false}
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <DefaultModalContainer style={styles}>
            <BottomUpPopup setIsOpenModal={setIsClickPosition}>
              <PositionComponent.Setting
                onClickCurrentPosition={onClickCurrentPosition}
                onClickMapPosition={onClickMapPosition}
              />
            </BottomUpPopup>
          </DefaultModalContainer>
        )}
      </Transition>
    </Container>
  );
};

export default Home;
