import { createStore } from "magos";
import { menuBox } from "./boxes/menu.box";
import { userBox } from "./boxes/user.box";
import { enrollBox } from "./boxes/enroll.box";

export const store = createStore({
  menu: menuBox,
  user: userBox,
  enroll: enrollBox,
});
