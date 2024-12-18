import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Middleware validation using Zod
const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: ZodError | any) {

      res.status(400).json({ errors: error.errors });
      return;
    }
  };
};

export { validate };
