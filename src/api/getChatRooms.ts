import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

export const API_GET_CHAT_ROOMS_KEY =
  "/api/chat-rooms/group?roomType={{roomType}}";

const getChatRooms = async (): Promise<any> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_CHAT_ROOMS_KEY, {
      roomType: "GROUP",
    })
  );
  return data;
};

export default getChatRooms;
