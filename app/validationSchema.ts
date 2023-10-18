import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1).max(65535),
  userId: z.string().min(1, "User id is requiered").max(255).optional(),
  projectId: z.number().optional(),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  userId: z
    .string()
    .min(1, "User id is requiered")
    .max(255)
    .optional()
    .nullable(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is requiered").max(50, "50 caracter maximum"),
  userId: z.string().min(1, "User id is requiered").max(255).optional(),
});
