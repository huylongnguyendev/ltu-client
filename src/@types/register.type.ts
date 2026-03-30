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
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(0|\+84)(\d{9})$/,
        "Invalid phone number format (e.g. 0912345678)",
      )
      .trim(),
    password: passwordSchema,
    confirmPassword: z.string().trim(),
    userCode: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
