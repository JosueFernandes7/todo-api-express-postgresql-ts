import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

class TokenService {
  generateVerificationToken(email: string): string {
    return jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "12h" });
  }
}

export { TokenService };
