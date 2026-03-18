import { createStore } from "magos";
import { menuBox } from "./boxes/menu.box";
export const store = createStore({
  menu: menuBox
});
