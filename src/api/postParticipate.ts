import defaultRequest from "src/lib/axios/defaultRequest";

interface postParticipateParameter {
  partyId: number;
  leaderId?: number;
  status: string;
}

export const API_POST_PARTY_PARTICIPATION_KEY = "/api/party/participation";

const postParticipate = async (body: postParticipateParameter) => {
  return defaultRequest.post(API_POST_PARTY_PARTICIPATION_KEY, body);
};

export default postParticipate;
