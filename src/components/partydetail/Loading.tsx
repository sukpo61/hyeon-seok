import React from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Loading = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loading;
