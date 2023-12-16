import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface BackgroundImageProps {
  scrollY: number;
  src?: string;
  height?: number;
}

const Container = styled.div<BackgroundImageProps>`
  display: flex;
  width: 100%;
  min-height: ${({ height }) => `${height}px`};
  justify-content: center;
  align-items: center;
  z-index: 8;
  transform: ${({ scrollY }) => `translateY(${scrollY * 0.4}px)`};
`;

const DEFAULT_BACKGROUND_IMAGE = "/images/common/defaultBackgroundImage.jpg";

const BackgroundImage = ({
  scrollY,
  src,
  height = 400,
}: BackgroundImageProps) => {
  return (
    <Container scrollY={scrollY} height={height}>
      <Image
        src={src ?? DEFAULT_BACKGROUND_IMAGE}
        fill={true}
        style={{
          objectFit: "cover",
        }}
        alt="배경이미지"
      />
    </Container>
  );
};

export default BackgroundImage;
