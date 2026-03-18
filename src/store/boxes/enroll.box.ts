import type { EnrollRes } from "#/@types/enroll.type";
import { createBox } from "magos";

const initialState = {
  message: "",
  enroll: {
    createdAt: "",
    updatedAt: "",
    duration: 0,
    examId: "",
    expectedEnd: null,
    id: "",
    startAt: "",
    status: "IN_PROGRESS",
    timeLimit: 0,
    userId: "",
    violateCount: 0,
  },
} satisfies EnrollRes as EnrollRes;

export const enrollBox = createBox(initialState, (set) => ({
  setNewEnroll: (enroll: EnrollRes) => set((prev) => ({ ...prev, ...enroll })),
}));
