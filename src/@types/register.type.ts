import {
  noNumberMessage,
  noNumberRegex,
  noSpecialCharMessage,
  noSpecialCharRegex,
} from "#/lib/validate";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "#/schema/form.schema";
import z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Firstname is required")
      .regex(noSpecialCharRegex, noSpecialCharMessage)
      .regex(noNumberRegex, noNumberMessage)
      .trim(),
    lastName: z
      .string()
      .min(1, "Lastname is required")
      .regex(noSpecialCharRegex, noSpecialCharMessage)
      .regex(noNumberRegex, noNumberMessage)
      .trim(),
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
