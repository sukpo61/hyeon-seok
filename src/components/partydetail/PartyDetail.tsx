import styled from "@emotion/styled";
import { DefaultText } from "@components/common/DefaultText";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";

interface PartyDetailProps {
  deadline: string;
  partyTime: string;
  menu: string;
  partyContent: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 20px;
  z-index: 99;
  background-color: white;
  border-radius: 12px;
`;

const PartyDetailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PartyIntroduce = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PartyDetail = (data: PartyDetailProps) => {
  const { deadline, partyTime, menu, partyContent } = data;

  const partyDetailData = [
    {
      title: "모집마감",
      content: dayjs(deadline).format("YYYY.MM.MM. HH:MM"),
    },

    {
      title: "모임시간",
      content: dayjs(partyTime).format("YYYY.MM.MM. HH:MM"),
    },
    { title: "식사메뉴", content: menu },
  ];

  return (
    <Container>
      {partyDetailData.map(({ title, content }) => (
        <PartyDetailBox key={title}>
          <DefaultText text={title} size={16} />
          <DefaultText text={content} size={16} />
        </PartyDetailBox>
      ))}
      <Divider />
      <PartyIntroduce>
        <DefaultText text={"파티소개글"} size={20} weight={600} />
        <DefaultText text={partyContent} size={16} />
      </PartyIntroduce>
    </Container>
  );
};

export default PartyDetail;
