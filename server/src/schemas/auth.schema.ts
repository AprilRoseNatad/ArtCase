import { z } from "zod";

export const syncAuthUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .optional(),
  })
  .strict();
  
export type SyncAuthUserInput = z.infer<typeof syncAuthUserSchema>;