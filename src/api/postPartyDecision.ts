import defaultRequest from "src/lib/axios/defaultRequest";

interface postPartyParticipationParameter {
  body: {
    partyId: number;
    leaderId: number;
    status: string;
  };
}

export const API_POST_PARTY_PARTICIPATION_KEY = "/api/party/decision";

const postPartyDecision = async ({ body }: any) => {
  return defaultRequest
    .post(API_POST_PARTY_PARTICIPATION_KEY, body)
    .then((response) => {
      console.log("postPartyDecision:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export default postPartyDecision;
