import { query, Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  listCategoriesSchema,
  categorySchema,
} from "../validators/categoryValidator.js";
import { validateQuery, queryParser, validate } from "../middlewares/validate.js";
const router = Router();
const categoryController = new CategoryController();

router.post(
  "/",
  authMiddleware,
  validate(categorySchema),
  categoryController.createCategory
);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);
router.put(
  "/:id",
  authMiddleware,
  validate(categorySchema),
  categoryController.updateCategory
);

router.get(
  "/with-todos",
  authMiddleware,
  queryParser,
  validateQuery(listCategoriesSchema),
  categoryController.getCategoriesWithTodos
);

export { router as categoryRoutes };
