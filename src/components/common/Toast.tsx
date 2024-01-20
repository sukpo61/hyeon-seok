import styled from "@emotion/styled";
import { ToastOption } from "types/toast";
import InfoIcon from "@components/icons/toast/Info.icon";
import WarnIcon from "@components/icons/toast/Warn.icon";
import CloseIcon from "@components/icons/common/Close.icon";

interface ToastIconProps {
  type?: "info" | "warn";
}

interface ToastProps {
  message: string;
  option: ToastOption;
  onToastClose: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  height: 64px;
  padding: 20px 12px;
  align-items: center;
  border-radius: 4px;
  background: var(--neutral-white, #fff);
  box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.2);
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToastIcon = ({ type }: ToastIconProps) => {
  switch (type) {
    case "info":
      return <InfoIcon />;
    case "warn":
      return <WarnIcon />;
    default:
      return null;
  }
};

const Toast = ({ message, option, onToastClose }: ToastProps) => {
  const { type } = option;
  return (
    <Container>
      <Content>
        <ToastIcon type={type} />
        {message}
      </Content>
      <button onClick={onToastClose}>
        <CloseIcon />
      </button>
    </Container>
  );
};

export default Toast;
