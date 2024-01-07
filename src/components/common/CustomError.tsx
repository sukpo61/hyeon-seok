import { FC, ReactEventHandler } from "react";

interface CustomErrorProps {
  onClick: ReactEventHandler<HTMLButtonElement>;
}

export const CustomError: FC<CustomErrorProps> = ({ onClick }) => {
  return (
    <div>
      <span>에러입니다.</span>
      <button onClick={onClick}>재시도</button>
    </div>
  );
};
