import { PartyDetailResponse } from "types/party/detail/PartyDetailResponse";

export interface UserProfileResponse {
  createDate: string;
  modifiedDate: string;
  id: number;
  socialId: string;
  socialType: string;
  email: string;
  nickname: string;
  age: number;
  imgUrl: string;
  gender: string;
  role: string;
  partyList: PartyDetailResponse[];
}
