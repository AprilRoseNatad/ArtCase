import { z } from "zod";

export const signupSchema = z
  .object({
    Username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters"),

    Email: z
      .string()
      .trim()
      .email("Invalid email address."),

    Password: z
      .string()
      .min(6, "Password must be at least 6 characters."),

    "Confirm Password": z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine(
    (data) => data.Password === data["Confirm Password"],
    {
      message: "Passwords do not match.",
      path: ["Confirm Password"],
    }
  );

export type SignupInput = z.infer<typeof signupSchema>;