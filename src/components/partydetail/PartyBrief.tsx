import styled from "@emotion/styled";
import { DefaultText } from "@components/common/DefaultText";
import ViewcountIcon from "@components/icons/profile/Viewcount.icon";
import Divider from "@mui/material/Divider";
import PersonIcon from "@components/icons/profile/Person.icon";
import InfoIcon from "@components/icons/profile/Info.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import { Fragment } from "react";
import RestaurantIcon from "@components/icons/profile/Restaurant.icon";
import {
  PARTY_AGE_LABEL,
  PARTY_GENDER_LABEL,
  PARTY_CATEGORY_LABEL,
} from "src/constants/options";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

type PartyBriefProps = Pick<
  PartyDetailResponse,
  | "partyTitle"
  | "hit"
  | "totalParticipant"
  | "participate"
  | "gender"
  | "age"
  | "category"
>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 20px;
  background-color: white;
  border-radius: 12px;
`;

const PartyTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  gap: 10px;
`;

const ViewcountContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const PartyConditionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const PartyConditionBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  gap: 10px;
`;

const PartyBrief = (data: PartyBriefProps) => {
  const {
    partyTitle,
    hit,
    totalParticipant,
    participate,
    gender,
    age,
    category,
  } = data;

  const PartyBriefData = [
    {
      id: "participant_count",
      icon: <PersonIcon />,
      content: `${String(participate)}/${String(totalParticipant)}명`,
    },
    {
      id: "gender_data",
      icon: <GenderIcon />,
      content: `${
        PARTY_GENDER_LABEL.find((item) => item.value === gender)?.name
      }`,
    },
    {
      id: "age_data",
      icon: <InfoIcon />,
      content: `${PARTY_AGE_LABEL.find((item) => item.value === age)?.name}`,
    },
    {
      id: "category_data",
      icon: <RestaurantIcon />,
      content: `${
        PARTY_CATEGORY_LABEL.find((item) => item.value === category)?.name
      }`,
    },
  ];

  return (
    <Container>
      <PartyTitle>
        <DefaultText text={partyTitle} size={24} weight={600} />
        <ViewcountContainer>
          <ViewcountIcon />
          <DefaultText text={hit.toString()} size={24} />
        </ViewcountContainer>
      </PartyTitle>
      <Divider />
      <PartyConditionContainer>
        {PartyBriefData.map(({ id, icon, content }, index) => (
          <Fragment key={id}>
            {index !== 0 && <Divider orientation="vertical" />}
            <PartyConditionBox>
              {icon}
              <DefaultText text={content} size={16} />
            </PartyConditionBox>
          </Fragment>
        ))}
      </PartyConditionContainer>
    </Container>
  );
};

export default PartyBrief;
