import { atom } from "recoil";

export interface PositionDataType {
  coords: {
    x: number;
    y: number;
  };
  address?: string;
}

export const PositionSate = atom<PositionDataType>({
  key: "position",
  default: {
    coords: {
      x: 0,
      y: 0,
    },
    address: "",
  },
});
