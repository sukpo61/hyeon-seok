import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import PartyInfo from "@components/partydetail/PartyInfo";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import PartyMap from "@components/partydetail/PartyMap";
import { DefaultButton } from "@components/common/DefaultButton";
import Image from "next/image";
import { useScroll } from "react-use";
import { useRef } from "react";
import { useRouter } from "next/router";
import { usePartyDetailQuery } from "@hooks/react-query/usePartyDetailQuery";
export interface PartyDetailDataType {
  // 스키마 확정후 추가
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 768px;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  justify-content: center;
  padding: 40px 0;
`;

const BackGroundImgContainer = styled.div<{ scrollY: number }>`
  display: flex;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  z-index: 8;
  transform: ${({ scrollY }) => `translateY(${scrollY * 0.4}px)`};
`;

const initialPartyDetailData = {
  position: {
    coords: {
      x: 33.5563,
      y: 126.79581,
    },
    address: "",
  },
  description: {
    partyTitle: "제목",
    partyContent: "파티 설명",
    status: "모집중",
    gender: "남성만",
    age: "2030",
    deadline: "",
    partyTime: "",
    totalParticipate: 6,
    participate: 3,
    thumbnail: "/images/profile/profilebackground.jpg",
    address: "서울특별시",
  },
};

const PartyDetail = () => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  const router = useRouter();
  const { id } = router.query as { id: string };
  const { isLoading, isError, error, data } = usePartyDetailQuery({ id });

  const participateParty = () => {
    // 백엔드 확정후 추가
  };

  return (
    <Container ref={scrollRef}>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      <BackGroundImgContainer scrollY={y}>
        <Image
          src="/images/profile/profilebackground.jpg"
          layout="fill"
          objectFit="cover"
          alt="프로필배경이미지"
        />
      </BackGroundImgContainer>
      <PartyInfo {...initialPartyDetailData.description} />
      <PartyMap {...initialPartyDetailData.position} />
      <ButtonContainer>
        <DefaultButton
          text={"참가신청"}
          onClick={participateParty}
          style={{
            width: "60%",
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default PartyDetail;
