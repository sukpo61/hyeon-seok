import React from "react";
import styled from "@emotion/styled";
import Progressbar from "@components/common/ProgressBar";
import Image from "next/image";
import { DefaultText } from "@components/common/DefaultText";
import LocationIcon from "@components/icons/profile/Location.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import InfoIcon from "@components/icons/profile/Info.icon";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 20px;
  background-color: white;
`;

const ProfileImgContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileDetailContainer = styled.div`
  width: 200px;
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 20px 0;
  z-index: 99;
  background-color: white;
`;

const MannerDegreeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 20px;
  gap: 8px;
  .userinfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .name {
    margin-bottom: 16px;
  }
`;

const userdata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: 30,
};

const ProfileInfo = () => {
  const { locaton, gender, age, name, mannerdegree } = userdata;
  return (
    <Container>
      <ProfileDetailContainer>
        <ProfileImgContainer>
          <Image
            src={"/images/profile/profile.png"}
            width={128}
            height={128}
            style={{ borderRadius: "50%" }}
            alt={"profile-image"}
          />
        </ProfileImgContainer>
        <ProfileDetail>
          <div className="userinfo">
            <LocationIcon />
            <DefaultText text={locaton} size={16} />
            <GenderIcon />
            <DefaultText text={gender} size={16} />
            <InfoIcon />
            <DefaultText text={age} size={16} />
          </div>
          <div className="name">
            <DefaultText text={name} size={32} />
          </div>
          <MannerDegreeContainer>
            <Progressbar value={mannerdegree} /> {mannerdegree}°C
          </MannerDegreeContainer>
        </ProfileDetail>
      </ProfileDetailContainer>
    </Container>
  );
};

export default ProfileInfo;
