import defaultRequest from "src/lib/axios/defaultRequest";
import variableAssignMent from "@utils/variableAssignment";

interface postPartyParticipationParameter {
  body: {
    partyId: number;
    leaderId: number;
    status: string;
  };
}

export const API_POST_PARTY_PARTICIPATION_KEY =
  "/api/party/{{userId}}/party-status?role={{role}}";

const getPartyStatus = async ({ id, role }: any) => {
  return defaultRequest
    .get(
      variableAssignMent(API_POST_PARTY_PARTICIPATION_KEY, {
        userId: String(id),
        role,
      })
    )
    .then((response) => {
      console.log("getPartyStatus:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export default getPartyStatus;
