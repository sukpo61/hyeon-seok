import defaultRequest from "src/lib/axios/defaultRequest";

interface patchProfileParameter {
  nickname: string;
  imgUrl?: string;
}

export const API_PATCH_PROFILE_KEY = "/api/profile";

const patchProfile = async (body: patchProfileParameter) => {
  return defaultRequest.patch(API_PATCH_PROFILE_KEY, body);
};

export default patchProfile;
