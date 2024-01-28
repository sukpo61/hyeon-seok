import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

interface GetPartyDetailParameter {
  id: string;
  userId: string;
}

export const API_GET_PARTY_DETAIL_KEY = "/api/party/{{id}}?userId={{userId}}";

const getPartyDetail = async ({
  id,
  userId,
}: GetPartyDetailParameter): Promise<PartyDetailResponse> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PARTY_DETAIL_KEY, { id, userId })
  );
  return data;
};

export default getPartyDetail;
