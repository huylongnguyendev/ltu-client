import type { Token } from "#/@types/session.type";
import type { User } from "#/@types/user.type";
import { createBox } from "magos";

export interface UserState {
  loading: "idle" | "loading" | "success" | "fail";
  message: string;
  user: User;
  token: Token;
}

const initialState = {
  message: "",
  loading: "idle",
  user: {
    wpUserId: null,
    email: "",
    firstName: "",
    lastName: "",
    role: "STUDENT",
    img: null,
    username: "",
    id: null,
    createdAt: "",
    updatedAt: "",
    fullName: "",
  },
  token: {
    access_token: "",
    access_time: "",
  },
} satisfies UserState as UserState;

export const userBox = createBox(initialState, (set) => ({
  setUser: (data: UserState) => set(data),
  setLoading: (state: UserState["loading"]) =>
    set((prev) => ({ ...prev, loading: state })),
}));
