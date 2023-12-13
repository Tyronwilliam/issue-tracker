import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Titre est requis").max(255),
  description: z.string().max(65535).optional(),
  userId: z.string().min(1, "Un id est requis").max(255).optional(),
  projectId: z.number().optional(),
  timer: z.number().optional(),
  // creator: z.number().optional(),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Titre est requis").max(255).optional(),
  description: z.string().max(65535).optional(),
  userId: z.string().min(1, "Un id est requis").max(255).optional().nullable(),
  timer: z.number().optional(),
  projectId: z.number().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Titre est requis").max(50, "50 caractère maximum"),
  userId: z.string().min(1, "Un id est requis").max(255).optional(),
  creatorId: z.string().optional(),
});

export const patchCategorieSchema = z.object({
  title: z
    .string()
    .min(1, "Nom de catégorie requis")
    .max(50, "50 caractère maximum"),

  hexCode: z
    .string()
    .min(7, "Une couleur est requise")
    .max(7, "Couleur invalide"),
});

export const creatorSchema = z.object({
  userId: z.number(),
});
