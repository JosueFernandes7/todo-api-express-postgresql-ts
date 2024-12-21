import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("E-mail is invalid"),
  password: z.string().min(6, "The password should have at least 6 characters"),
});

const resendEmailSchema = z.object({
  email: z.string().email("E-mail is invalid"),
});

export { authSchema, resendEmailSchema };
