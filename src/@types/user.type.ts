export type UserRole = "STUDENT" | "LECTUTER" | "ADMIN";

export interface User {
  wpUserId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  img: string | null;
  username: string;
  id: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}
