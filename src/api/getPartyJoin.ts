import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyJoinResponse } from "types/party/join/PartyJoinResponse";

interface getPartyJoinParameter {
  role: string;
}

export const API_GET_PARTY_JOIN_KEY = "/api/party/party-join?role={{role}}";

const getPartyJoin = async ({
  role,
}: getPartyJoinParameter): Promise<PartyJoinResponse[]> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PARTY_JOIN_KEY, { role: role })
  );
  return data;
};

export default getPartyJoin;
