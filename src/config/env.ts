import { z } from "zod";
import { config } from "dotenv";

config(); // load the .env file

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().default("3000"),
});

export const env = envSchema.parse(process.env);
