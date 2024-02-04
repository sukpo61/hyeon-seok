import styled from "@emotion/styled";
import ProfileTab from "@components/profile/ProfileTab";
import SettingIcon from "@components/icons/common/Setting.icon";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { DefaultHeader } from "@components/common/DefaultHeader";
import ProfileInfo from "@components/profile/ProfileInfo";
import { useScroll } from "react-use";
import { useRef } from "react";
import Link from "next/link";
import BackgroundImage from "@components/common/BackgroundImage";
import QuerySuspenseErrorBoundary from "@components/hoc/QuerySuspenseErrorBoundary";
import ProfileError from "@components/profile/ProfileError";
import ProfileLoading from "@components/profile/ProfileLoading";

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
const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 100%;
`;

const RightAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const RightArea = () => {
  return (
    <Link href={"/setting"}>
      <RightAreaContainer>{SettingIcon()}</RightAreaContainer>
    </Link>
  );
};

const Profile = () => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  return (
    <Container ref={scrollRef}>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        rightArea={<RightArea />}
      />
      <BackgroundImage
        scrollY={y}
        src="/images/profile/profilebackground.jpg"
        height={200}
      />
      <ProfileInfoContainer>
        <QuerySuspenseErrorBoundary
          errorFallback={ProfileError}
          suspenseFallback={<ProfileLoading />}
        >
          <ProfileInfo />
        </QuerySuspenseErrorBoundary>
      </ProfileInfoContainer>
      <ProfileTab />
    </Container>
  );
};

export default Profile;
