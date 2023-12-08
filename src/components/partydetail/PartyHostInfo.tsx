import styled from "@emotion/styled";
import Image from "next/image";
import { DefaultText } from "@components/common/DefaultText";
import { ArrowForward } from "@components/icons/profile/ArrowForward.icon";

interface PartyHostInfoProps {
  //후기작업떄 작성
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  z-index: 99;
  background-color: white;
  border-radius: 12px;
`;
const HostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const HostReviewRouteContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
`;

const PartyHostInfo = (data: PartyHostInfoProps) => {
  return (
    <Container>
      <HostInfoContainer>
        <Image
          src={"/images/profile/profile.png"}
          width={48}
          height={48}
          style={{ borderRadius: "50%" }}
          alt={"host-image"}
        />
        <DefaultText text="Hostname" size={16} />
      </HostInfoContainer>
      <HostReviewRouteContainer>
        <DefaultText text="방장후기" size={16} />
        <ArrowForward />
      </HostReviewRouteContainer>
    </Container>
  );
};

export default PartyHostInfo;
