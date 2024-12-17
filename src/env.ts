import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().default("3000"),
});

export const env = envSchema.parse(process.env);
