import React from "react";
import styled from "@emotion/styled";
import { DefaultText } from "@components/common/DefaultText";
import Image from "next/image";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";
import Link from "next/link";
import dayjs from "dayjs";
interface PartyListProps {
  data: PartyDetailResponse;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
  cursor: pointer;
`;

const PartyDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
`;
const Address = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const Time = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const PartyList = ({ data }: PartyListProps) => {
  const { partyId, partyTitle, partyTime, address, thumbnail } = data;

  return (
    <Link href={`/partydetail/${partyId}`}>
      <Container>
        <Image
          src={thumbnail || "/images/profile/profilebackground.jpg"}
          alt="프로필사진"
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        <PartyDetail>
          <Title>
            <DefaultText text={partyTitle} size={16} weight={500} />
          </Title>
          <Address>
            <DefaultText text={address} size={14} color="#536471" />
          </Address>
          <Time>
            <DefaultText
              text={dayjs(partyTime).format("YYYY.MM.MM. HH:MM")}
              size={14}
              color="#536471"
            />
          </Time>
        </PartyDetail>
      </Container>
    </Link>
  );
};

export default PartyList;
