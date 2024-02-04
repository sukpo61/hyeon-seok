import React from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProfileLoading = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default ProfileLoading;
