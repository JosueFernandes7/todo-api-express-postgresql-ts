import { query, Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { listCategoriesSchema } from "../validators/categoryValidator.js";
import { validateQuery, queryParser } from "../middlewares/validate.js";
const router = Router();
const categoryController = new CategoryController();

router.get(
  "/with-todos",
  authMiddleware,
  queryParser,
  validateQuery(listCategoriesSchema),
  categoryController.getCategoriesWithTodos
);

export { router as categoryRoutes };
