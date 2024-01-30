import { atom } from "recoil";

export const userState = atom({
  key: "userEmail",
  default: null,
});
