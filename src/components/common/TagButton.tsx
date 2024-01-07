import styled from "@emotion/styled";
import { DefaultText } from "./DefaultText";
import { FC } from "react";
import { Color, ColorToken } from "styles/Color";

interface TagButtonProps {
  tagType: "age" | "gender";
  text: string;
}

const Container = styled.div<{ tagType: TagButtonProps["tagType"] }>`
  border-radius: 10px;
  width: 35px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ tagType }) =>
    tagType === "age" ? ColorToken.primary : ColorToken.danger_pink};
`;

export const TagButton: FC<TagButtonProps> = ({ tagType, text }) => {
  return (
    <Container tagType={tagType}>
      <DefaultText
        text={text}
        size={12}
        weight={500}
        color={tagType === "age" ? ColorToken.grey : ColorToken.danger}
      />
    </Container>
  );
};
