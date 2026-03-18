import type { ExamType } from "./exam.type";

export interface TypeDropItem {
  name: string;
  label: string;
  type: ExamType;
}

export interface SortItem {
  name: string;
  value: string;
  label: string;
}

export type TypeDropItems = TypeDropItem[];
export type SortItems = SortItem[];
