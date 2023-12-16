import React from "react";
import styled from "@emotion/styled";

interface ErrorPageProps {
  error: Error;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ErrorPage = ({ error }: ErrorPageProps) => {
  return <Container>{error.message}</Container>;
};

export default ErrorPage;
