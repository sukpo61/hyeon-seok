import styled from "@emotion/styled";
import { DefaultText } from "./DefaultText";
import { DefaultButton } from "./DefaultButton";
import { FC, ReactEventHandler } from "react";

interface DefaultErrorProps {
  onClick: ReactEventHandler<HTMLButtonElement>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  gap: 15px;
`;

const DefaultError: FC<DefaultErrorProps> = ({ onClick }) => {
  return (
    <Container>
      <DefaultText
        text={`죄송합니다. 에러가 발생했습니다. \n 재시도 버튼을 눌러주세요.`}
        preLine
        weight={800}
        size={25}
      />
      <DefaultButton text={"재시도"} onClick={onClick} />
    </Container>
  );
};

export default DefaultError;
