import styled from "@emotion/styled";
import Lottie from "lottie-react";
import loadingData from "public/json/loading.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const DefaultLoading = () => (
  <Container>
    <Lottie animationData={loadingData} loop />
  </Container>
);

export default DefaultLoading;
