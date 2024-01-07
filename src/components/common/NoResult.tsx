import { NoFoodIcon } from "@components/icons/common/NoFood.icon";
import styled from "@emotion/styled";
import { FC, PropsWithChildren } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
`;

const NoResult: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <NoFoodIcon />
      {children}
    </Container>
  );
};

export default NoResult;
