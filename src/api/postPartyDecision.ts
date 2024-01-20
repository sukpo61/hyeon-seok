import defaultRequest from "src/lib/axios/defaultRequest";

interface postPartyParticipationParameter {
  partyId: number;
  nickname: string;
  status: string;
}

export const API_POST_PARTY_DECISION_KEY = "/api/party/decision";

const postPartyDecision = async (body: postPartyParticipationParameter) => {
  return defaultRequest
    .post(API_POST_PARTY_DECISION_KEY, body)
    .then((response) => {
      console.log("postPartyDecision:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export default postPartyDecision;
