import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "@emotion/styled";
import { shouldNotForwardProp } from "@utils/common";

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const Input = styled(
  "input",
  shouldNotForwardProp("isBorderRadius")
)<{ isBorderRadius?: boolean }>(({ isBorderRadius }) => ({
  width: "100%",
  height: "100%",
  padding: "10px 14px",
  border: "none",
  backgroundColor: "#f9f9f9",
  borderRadius: isBorderRadius ? "10px" : 0,
  "&:focus": {
    outline: "none",
  },
}));

const ErrorText = styled.p({
  color: "red",
});

interface InputProps {
  register?: UseFormRegisterReturn<string>;
  value?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  whiteSpace?: boolean;
  isBorderRadius?: boolean;
}

const TextInput = ({
  register,
  value,
  name,
  placeholder,
  defaultValue,
  errorMessage,
  maxLength,
  onChange,
  onFocus,
  onKeyDown,
  whiteSpace = true,
  isBorderRadius = false,
}: InputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!whiteSpace) {
      e.target.value = e.target.value.replace(/\s/gi, "");
    }

    onChange && onChange(e);
  };

  return (
    <Container>
      <Input
        type="text"
        name={name}
        {...register}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        isBorderRadius={isBorderRadius}
        maxLength={maxLength}
        defaultValue={defaultValue}
        {...register}
      />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};

export default TextInput;
