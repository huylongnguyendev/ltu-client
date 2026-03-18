import { identificationSchema, passwordSchema } from "#/schema/form.schema";
import z from "zod";

export const loginSchema = z.object({
  identicator: identificationSchema,
  password: passwordSchema,
  isRemember: z.boolean(),
});

export type LoginType = z.infer<typeof loginSchema>;
