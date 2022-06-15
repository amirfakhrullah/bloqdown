import { z } from "zod";

export const createPostValidation = z.object({
  title: z.string().min(6).max(200),
  description: z.string().min(6).max(2000).trim(),
});

export const createCommentValidation = z.object({
  text: z.string().min(2).max(200).trim(),
  postId: z.string(),
});

export const tagInputValidation = z.object({
  postId: z.string(),
  tagName: z
    .string()
    .min(2)
    .max(20)
    .trim()
    .regex(
      /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
      "Invalid"
    ),
});
