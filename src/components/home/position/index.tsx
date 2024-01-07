import { DefaultText } from "@components/common/DefaultText";
import styled from "@emotion/styled";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface SettingPositionComponentProps {
  onClickCurrentPosition: MouseEventHandler<HTMLDivElement>;
  onClickMapPosition: MouseEventHandler<HTMLDivElement>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Setting = ({
  onClickCurrentPosition,
  onClickMapPosition,
}: SettingPositionComponentProps) => {
  return (
    <Container>
      <DefaultText
        text="현재 위치로 지정"
        size={15}
        style={{
          cursor: "pointer",
        }}
        onClick={onClickCurrentPosition}
      />
      <Link href={"/location-setting"}>
        <DefaultText
          text="지도에서 위치 지정"
          size={15}
          style={{
            cursor: "pointer",
          }}
          onClick={onClickMapPosition}
        />
      </Link>
    </Container>
  );
};

const PositionComponent = { Setting };

export default PositionComponent;
