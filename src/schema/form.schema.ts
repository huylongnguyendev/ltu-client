import {
  letterLowerRegex,
  letterUpperRegex,
  noHtmlMessage,
  noHtmlRegex,
  noSpaceMesssage,
  noSpaceRegex,
  specialCharRegex,
} from "#/lib/validate";
import z from "zod";

export const identificationSchema = z
  .string()
  .min(1, "Username/Email is required")
  .min(3, "Username must be at least 3 characters")
  .regex(noHtmlRegex, noHtmlMessage)
  .refine(
    (val) => {
      if (val.includes("@")) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      return true;
    },
    {
      message: "Invalid email format",
    },
  )
  .trim();

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .regex(noHtmlRegex, noHtmlMessage);

export const emailSchema = z
  .string()
  .email("Invalid email format")
  .regex(noHtmlRegex, noHtmlMessage);

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password too short (at least 8 characeters)")
  .regex(letterLowerRegex, "Missing lowercase letter")
  .regex(letterUpperRegex, "Missing uppercase letter")
  .regex(noHtmlRegex, noHtmlMessage)
  .regex(specialCharRegex, "Missing speacial letter")
  .regex(noSpaceRegex, noSpaceMesssage)
  .trim();
