import { useQuery } from "@tanstack/react-query";
import { API_GET_CHAT_ROOMS_KEY } from "src/api/getChatRooms";
import Loading from "@components/partydetail/Loading";
import ErrorPage from "@components/partydetail/ErrorPage";
import getChatRooms from "src/api/getChatRooms";

const ChatListPage = () => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [API_GET_CHAT_ROOMS_KEY],
    queryFn: () => getChatRooms(),
  });

  console.log(data);

  return <div>ChatListPage</div>;
};

export default ChatListPage;
