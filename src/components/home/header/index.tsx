import { DefaultText } from "@components/common/DefaultText";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import { ArrowIcon } from "@components/icons/header/Arrow.icon";
import { NotificationIcon } from "@components/icons/header/Notification.icon";
import styled from "@emotion/styled";
import Link from "next/link";
import { PositionDataType } from "src/recoil-states/positionStates";

interface HeaderCenterAreaProps {
  onClick: () => void;
  position: PositionDataType;
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const CenterArea = ({ onClick, position }: HeaderCenterAreaProps) => {
  return (
    <Container onClick={onClick}>
      <DefaultText size={15} text={String(position?.address || "")} />
      <ArrowIcon
        styles={{
          marginTop: "-1px",
        }}
      />
    </Container>
  );
};

const RightArea = () => {
  return (
    <Container>
      <Link href={"/search"}>
        <SearchIcon />
      </Link>
      <Link href={"/notification"}>
        <NotificationIcon
          notificationCount={0}
          styles={{
            marginTop: "-5px",
          }}
        />
      </Link>
    </Container>
  );
};

const HomeHeader = {
  RightArea,
  CenterArea,
};

export default HomeHeader;
