import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env.js";
import { AuthRequest } from "../types/authRequest.js";

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Token not found" });
      return;
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      res.status(401).json({ error: "Invalid Token" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: number;
      email: string;
    };

    // Add the decoded user to the request object
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { authMiddleware };
