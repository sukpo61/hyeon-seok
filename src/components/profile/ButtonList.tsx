import styled from "@emotion/styled";
import { DefaultButton } from "@components/common/DefaultButton";

interface ButtonListProps {
  listinfo: {
    text: string;
    value: string;
  }[];
  state: string;
  setState: (state: string) => void;
}

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 16px;
  flex-direction: row;
  gap: 10px;
  transition: top 0.3s ease;
  z-index: 9;
`;

const ButtonList = ({ listinfo, state, setState }: ButtonListProps) => {
  return (
    <Container>
      {listinfo.map(({ text, value }) => (
        <DefaultButton
          key={value}
          text={text}
          buttonType="toggle"
          filled={state === value}
          onClick={() => {
            setState(value);
          }}
        />
      ))}
    </Container>
  );
};

export default ButtonList;
