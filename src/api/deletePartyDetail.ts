import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";

interface DeletePartyDetailParameter {
  id: string;
}

export const API_DELETE_PARTY_DETAIL_KEY = "/api/party/{{id}}";

const deletePartyDetail = async ({ id }: DeletePartyDetailParameter) => {
  await defaultRequest.delete(
    variableAssignMent(API_DELETE_PARTY_DETAIL_KEY, { id })
  );
};

export default deletePartyDetail;
