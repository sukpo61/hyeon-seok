import variableAssignMent from "@utils/variableAssignment";
import defaultRequest from "src/lib/axios/defaultRequest";
import { UserProfileResponse } from "types/profile/user/UserProfileResponse";

interface getProfileParameter {
  userId: number;
}

export const API_GET_PROFILE_KEY = "/api/profile/{{userId}}";

const getProfile = async ({
  userId,
}: getProfileParameter): Promise<UserProfileResponse> => {
  const { data } = await defaultRequest.get(
    variableAssignMent(API_GET_PROFILE_KEY, { userId: String(userId) })
  );
  return data;
};

export default getProfile;
