import { FC, useEffect, useState } from "react";
import useToast from "./useToast";

interface LocationType {
  latitude: number;
  longitude: number;
}

export const useGpsPosition = () => {
  const [location, setLocation] = useState<LocationType>();
  const { showToast } = useToast();

  useEffect(
    function callGeoLocation() {
      // 가져오기 성공
      const getSuccess = async (position: {
        coords: {
          latitude: number;
          longitude: number;
        };
      }) => {
        // 위도
        const lat = position.coords.latitude;
        // 경도
        const lng = position.coords.longitude;
        await setLocation({
          latitude: lat,
          longitude: lng,
        });
      };

      // 가지오기 실패(거부)
      const getError = () => {
        showToast("위치 정보를 찾을 수 없습니다. 위치 설정을 확인해 주세요!");
      };
      navigator.geolocation.getCurrentPosition(getSuccess, getError);
    },
    [showToast]
  );

  return {
    location,
  };
};
