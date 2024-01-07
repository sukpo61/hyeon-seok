import { DefaultText } from "@components/common/DefaultText";
import { TagButton } from "@components/common/TagButton";
import { MenuIcon } from "@components/icons/card/Menu.icon";
import { PeopleIcon } from "@components/icons/card/People.icon";
import LocationIcon from "@components/icons/profile/Location.icon";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import partyDefaultThumbnail from "public/images/list/partyDefaultThumbnail.png";
import { ColorToken } from "styles/Color";
import { MainPagePartyListResponse } from "types/main/MainPagePartyListResponse";
dayjs.locale("ko");

interface PartyCardProps {
  partyData: MainPagePartyListResponse;
  onClickPartyCard: (id: number) => void;
}

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 30px;
  display: flex;
  border: 1px solid ${ColorToken.border};
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 30px;
  cursor: pointer;
`;
const InformationSection = styled.section`
  padding: 15px 15px 25px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 140px);
`;
const Title = styled.div``;
const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const OtherInformation = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const ImageSection = styled.section`
  width: 100%;
  max-width: 160px;
`;

const PeopleSection = styled.section`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const TagSection = styled.section`
  display: flex;
  gap: 5px;
`;

export const PartyCard = ({ partyData, onClickPartyCard }: PartyCardProps) => {
  const {
    address,
    age,
    gender,
    menu,
    thumbnail,
    participate,
    partyTime,
    partyTitle,
    totalParticipate,
    partyId,
  } = partyData;

  const onClick = () => {
    onClickPartyCard(partyId);
  };

  return (
    <Container onClick={onClick}>
      <ImageSection>
        {thumbnail ? (
          <Image
            width={160}
            height={160}
            src={thumbnail}
            alt={"party-image"}
            style={{
              objectFit: "cover",
              padding: "15px",
              borderRadius: "30px",
            }}
          />
        ) : (
          <Image
            width={160}
            height={180}
            src={partyDefaultThumbnail}
            alt={"party-image"}
            style={{
              objectFit: "cover",
              padding: "15px",
              borderRadius: "30px",
            }}
          />
        )}
      </ImageSection>
      <InformationSection>
        <TagSection>
          <TagButton tagType="age" text={age} />
          {gender === "WOMEN" && <TagButton tagType="gender" text={"여성만"} />}
        </TagSection>
        <Title>
          <DefaultText text={partyTitle} size={24} weight={700} />
        </Title>
        <Description>
          <MenuIcon />
          <DefaultText text={menu} size={12} weight={500} />
        </Description>
        <OtherInformation>
          <LocationIcon />
          <DefaultText text={address} size={12} weight={500} />
          <DefaultText
            text={`${dayjs(partyTime).format("MM.MM(dd) / HH:MM (A)")}`}
            size={12}
            weight={500}
          />
        </OtherInformation>
        <PeopleSection>
          <PeopleIcon />
          <DefaultText
            text={`${participate}/${totalParticipate}`}
            size={12}
            weight={500}
          />
        </PeopleSection>
      </InformationSection>
    </Container>
  );
};
