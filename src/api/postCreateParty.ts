import defaultRequest from "src/lib/axios/defaultRequest";

interface postPartyParticipationParameter {
  body: {
    partyId: number;
    leaderId: number;
    status: string;
  };
}

export const API_POST_PARTY_PARTICIPATION_KEY = "/api/party";

const postCreateParty = async (body: any) => {
  return defaultRequest
    .post(API_POST_PARTY_PARTICIPATION_KEY, body)
    .then((response) => {
      console.log("postCreateParty:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export default postCreateParty;
