import { DefaultText } from "@components/common/DefaultText";
import { MainIcon } from "@components/icons/common/Main.icon";
import styled from "@emotion/styled";
import { FC } from "react";
import { NotificationResponse } from "types/notification/NotificationResponse";
import dayjs from "dayjs";
import Link from "next/link";
import { ColorToken } from "styles/Color";

const Container = styled(Link)`
  width: 100%;
  border: 1px solid white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 20px;
  background: ${ColorToken.white};
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
`;

const IconSection = styled.section`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-left: 16px;
`;
const TextInfoSection = styled.section`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const NotificationBox: FC<NotificationResponse> = (data) => {
  const { title, content, name, type, createdAt, hostId, partyId } = data;

  const NotificationLink = (type: string) => {
    switch (type) {
      case "PARTICIPATION_REQUEST":
        return `/profile?category=partyrequest&role=HOST`;
      case "REQUEST_DECISION":
        return `/partydetail/${partyId}`;
      case "RECRUIT_FINISH":
        return `/partydetail/${partyId}`;
      case " REVIEW":
        return `/review/${hostId}/add`;
      default:
        return ``;
    }
  };

  return (
    <Container href={NotificationLink(type)}>
      <IconSection>
        <MainIcon />
      </IconSection>
      <TextSection>
        <DefaultText text={content} size={20} weight={800} />
        <TextInfoSection>
          <DefaultText text={title} size={12} />·
          <DefaultText text={name} size={12} />·
          <DefaultText
            text={`${dayjs(createdAt).format("YYYY.MM.MM. HH:MM")}`}
            size={12}
          />
        </TextInfoSection>
      </TextSection>
    </Container>
  );
};
