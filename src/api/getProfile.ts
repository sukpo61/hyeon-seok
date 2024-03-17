import defaultRequest from "src/lib/axios/defaultRequest";
import { UserProfileResponse } from "types/profile/user/UserProfileResponse";

export const API_GET_PROFILE_KEY = "/api/profile";

const getProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await defaultRequest.get(API_GET_PROFILE_KEY);
  return data;
};

export default getProfile;
