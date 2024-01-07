import { DefaultText } from "@components/common/DefaultText";
import { MainIcon } from "@components/icons/common/Main.icon";
import styled from "@emotion/styled";
import { FC } from "react";
import { Color } from "styles/Color";

interface NotificationBoxProps {
  title: string;
  body: string;
  time: string;
}

const Container = styled.div`
  width: 100%;
  border: 1px solid white;
  border-radius: 25px;
  display: flex;
  gap: 5px;
  padding: 20px;
  background: ${Color.Orange};
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
  align-items: center;
  width: 100%;
`;

export const NotificationBox: FC<NotificationBoxProps> = ({
  title,
  body,
  time,
}) => {
  return (
    <Container>
      <IconSection>
        <MainIcon />
      </IconSection>
      <TextSection>
        <DefaultText text={title} size={20} weight={800} lineHeight="1.1" />
        <DefaultText text={body} size={15} lineHeight="1.1" />
        <DefaultText text={time} size={15} />
      </TextSection>
    </Container>
  );
};
