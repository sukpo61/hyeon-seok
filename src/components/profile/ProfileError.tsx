import styled from "@emotion/styled";
import { FC, ReactEventHandler } from "react";
import RestartIcon from "@components/icons/common/Restart.icon";

interface ProfileErrorProps {
  onClick: ReactEventHandler<HTMLButtonElement>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const IconContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  transition: all 0.1s;
  &:hover {
    background-color: #dddddd;
  }
`;

const ProfileError = (onClick: ReactEventHandler<HTMLButtonElement>) => {
  return (
    <Container>
      <IconContainer onClick={onClick}>
        <RestartIcon />
      </IconContainer>
    </Container>
  );
};

export default ProfileError;
