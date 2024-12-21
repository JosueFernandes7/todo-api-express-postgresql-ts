import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Middleware validation using Zod for post Routes
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
// Middleware validation using Zod for get Routes
const validateQuery = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query); // Valida a query string
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Unexpected validation error" });
      }
    }
  };
};

const queryParser = (req: Request, res: Response, next: NextFunction): void => {
  for (const key in req.query) {
    if (!isNaN(Number(req.query[key]))) {
      (req.query as any)[key] = Number(req.query[key]); // Converte valores numéricos
    }
  }
  next();
};

export { validate, validateQuery, queryParser };
