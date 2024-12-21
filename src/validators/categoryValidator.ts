import { z } from "zod";

const listCategoriesSchema = z.object({
  page: z.number().int().min(1, "Page must be at least 1").optional().default(1),
  limit: z.number().int().positive("Limit must be greater than 0").optional().default(10),
  orderBy: z.enum(["asc", "desc"]).optional().default("asc"),
});

export { listCategoriesSchema };
