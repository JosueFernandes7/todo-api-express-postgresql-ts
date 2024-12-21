import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  dueDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Invalid due date format."
  ),
  categoryId: z.number().optional(),
});

export { createSchema };
