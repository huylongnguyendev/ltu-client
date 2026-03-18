import { createBox } from "magos";

const initialState: boolean = false;

export const menuBox = createBox(initialState, (set) => ({
  setOpenMenu: () => set(true),
  setCloseMenu: () => set(false),
}));
