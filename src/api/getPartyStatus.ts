import defaultRequest from "src/lib/axios/defaultRequest";
import variableAssignMent from "@utils/variableAssignment";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

interface getPartyStatusParameter {
  role: string;
}

export const API_GET_PARTY_STATUS_KEY = "/api/party/party-status?role={{role}}";

const getPartyStatus = async ({
  role,
}: getPartyStatusParameter): Promise<PartyDetailResponse[]> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PARTY_STATUS_KEY, { role: role })
  );
  return data;
};

export default getPartyStatus;
