import defaultRequest from "src/lib/axios/defaultRequest";

interface postPartyParticipationParameter {
  body: {
    partyId: number;
    leaderId: number;
    status: string;
  };
}

export const API_POST_PARTY_PARTICIPATION_KEY = "/api/party/participation";

const postPartyParticipation = async ({
  body,
}: postPartyParticipationParameter) => {
  return defaultRequest.post(API_POST_PARTY_PARTICIPATION_KEY, body);
};

export default postPartyParticipation;
