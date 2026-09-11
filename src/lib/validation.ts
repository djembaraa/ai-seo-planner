import { z } from "zod";

export const MAX_KEYWORD_LENGTH = 200;

export const generateRequestSchema = z.object({
  keyword: z
    .string({ message: "Keyword is required" })
    .min(1, "Keyword cannot be empty")
    .max(MAX_KEYWORD_LENGTH, "Keyword must be under 200 characters")
    .transform((s) =>
      s
        .replace(/[<>{}[\]\\]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .refine((s) => s.length > 0, "Keyword cannot be empty after sanitization"),
});

