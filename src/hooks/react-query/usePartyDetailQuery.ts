import axios, { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import QueryKeys from "./QueryKeys";

interface PartyDetailData {
  id: number;
  // 스키마 확정후 추가
}

interface QueryVariables {
  id: string;
}

const fetchGetPartyDetailWithId = async ({
  id,
}: QueryVariables): Promise<PartyDetailData> => {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/party/${id}`
  );
  return data;
};

export const usePartyDetailQuery = ({
  id,
}: QueryVariables): UseQueryResult<PartyDetailData, AxiosError> => {
  return useQuery([QueryKeys.partyDetail, id], () =>
    fetchGetPartyDetailWithId({ id })
  );
};
