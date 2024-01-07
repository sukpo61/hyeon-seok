import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { Color, ColorToken } from "styles/Color";
import { Typography } from "styles/Typography";

const Container = styled.div`
  background-color: ${Color.VeryLightGrey};
  cursor: pointer;
  height: 34px;
  width: max-content;
  padding: 6px 15px 8px 15px;
  border-radius: 30px;
  margin-bottom: 11px;
  color: ${Color.DarkGrey};

  :hover {
    background-color: black;
    transition: background-color 0.5s;
    div {
      color: ${ColorToken.white};
      transition: color 0.5s;
    }
  }
`;

const Text = styled.div`
  ${Typography.Body.Body1Regular};
  :hover {
    color: ${ColorToken.white};
    transition: color 0.5s;
  }
`;

export interface HotKeywordTagButtonProps {
  style?: CSSProperties;
  textColor?: string;
  text: string;
}

export const HotKeywordTagButton = ({
  style,
  text,
}: HotKeywordTagButtonProps) => {
  return (
    <Container style={{ ...style }}>
      <Text>{text}</Text>
    </Container>
  );
};
