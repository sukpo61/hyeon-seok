import defaultRequest from "src/lib/axios/defaultRequest";
import variableAssignMent from "@utils/variableAssignment";

interface postPartyParticipationParameter {
  body: {
    partyId: number;
    leaderId: number;
    status: string;
  };
}

export const API_POST_PARTY_PARTICIPATION_KEY = "/api/party/join?role={{role}}";

const getPartyJoin = async ({ role }: any) => {
  return defaultRequest
    .get(variableAssignMent(API_POST_PARTY_PARTICIPATION_KEY, { role: role }))
    .then((response) => {
      console.log("getPartyJoin:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export default getPartyJoin;

// GUEST, USER, VOLUNTEER, HOST
