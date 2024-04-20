import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "./recoilPersistStorage";

const { persistAtom } = recoilPersist({
  key: "newnotification",
  storage: sessionStorage,
});
export const newNotificationRecoil = atom<number>({
  key: `newnotification`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
