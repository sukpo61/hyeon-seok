import CreateIcon from "@components/icons/bottombar/Create.icon";
import HomeIcon from "@components/icons/bottombar/Home.icon";
import ProfileIcon from "@components/icons/bottombar/Profile.icon";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import ChatIcon from "@components/icons/bottombar/Chat.icon";
import styled from "@emotion/styled";
import NavList from "./NavList";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  z-index: 999;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 75px;
  display: flex;
  padding: 0px 15px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const navList = [
  {
    title: "홈",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "검색",
    href: "/search",
    icon: SearchIcon,
  },
  {
    title: "파티 생성",
    href: "/party/create",
    icon: CreateIcon,
  },
  {
    title: "파티 채팅",
    href: "/chat/list",
    icon: ChatIcon,
  },
  {
    title: "프로필",
    href: "/profile",
    icon: ProfileIcon,
    query: {
      category: "partysituation",
      role: "HOST",
    },
  },
];

const BottomBar = () => (
  <Container>
    <NavContainer>
      {navList.map((item) => (
        <NavList key={item.href} item={item} />
      ))}
    </NavContainer>
  </Container>
);

export default BottomBar;
