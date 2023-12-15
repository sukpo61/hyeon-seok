import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

interface GetPartyDetailParameter {
  id: string;
}

export const API_GET_PARTY_DETAIL_KEY = "/api/party/{{id}}";

const getPartyDetail = async ({
  id,
}: GetPartyDetailParameter): Promise<PartyDetailResponse> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PARTY_DETAIL_KEY, { id })
  );
  console.log("data", data);

  return data;
};

export default getPartyDetail;
