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
import { useMutation } from "@tanstack/react-query";
import postCreateParty from "src/api/postCreateParty";

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

const RightAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const Button = styled.button``;

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

  const { mutateAsync: postCreatePartyMutate } = useMutation({
    mutationFn: postCreateParty,
  });

  const test = () => {
    postCreatePartyMutate({
      title: "새싹 방",
      content: "테스트 2",
      partyTime: "2024-01-06T02:25:50.153Z",
      totalParticipant: 4,
      longitude: 126.88453591058602,
      latitude: 37.53645109566274,
      gender: "ALL",
      category: "JAPANESE",
      age: "TWENTY",
      menu: "붕어빵",
      thumbnail:
        " https://matitting.s3.ap-northeast-2.amazonaws.com/korean.jpeg",
    });
  };

  return (
    <Container ref={scrollRef}>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        centerArea={<Button onClick={test}>test</Button>}
        rightArea={<RightArea />}
      />
      <BackgroundImage
        scrollY={y}
        src="/images/profile/profilebackground.jpg"
        height={200}
      />
      <ProfileInfo />
      <ProfileTab />
    </Container>
  );
};

export default Profile;
