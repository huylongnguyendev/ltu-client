import type { ExamItemDetails } from "./exam.type";

export type EnrollStatus = "IN_PROGRESS" | "COMPLETED";

export interface EnrollItem {
  id: string;
  startAt: string | null;
  expectedEnd: string | null;
  duration: number;
  timeLimit: number;
  attempts?: any;
  violateCount: number;
  status: EnrollStatus;
  responses?: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
  examId: string;
  exam?: ExamItemDetails;
}

export interface EnrollRes {
  message: string;
  enroll: EnrollItem;
}

export interface EnrollRequest {
  userId: string;
  examId: string;
  startAt?: string;
  expectedEnd?: string;
  attempts?: any;
  violateCount?: number;
  status?: EnrollStatus;
  responses?: any;
}