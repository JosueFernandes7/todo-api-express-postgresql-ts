import { query, Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  listCategoriesSchema,
  categorySchema,
  shareCategorySchema,
} from "../validators/categoryValidator.js";
import {
  validateQuery,
  queryParser,
  validate,
} from "../middlewares/validate.js";

const router = Router();
const categoryController = new CategoryController();

// CREATE CATEGORY
router.post(
  "/",
  authMiddleware,
  validate(categorySchema),
  categoryController.createCategory
);

// DELETE CATEGORY
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

// UPDATE CATEGORY
router.put(
  "/:id",
  authMiddleware,
  validate(categorySchema),
  categoryController.updateCategory
);

// LIST CATEGORIES WITH TODOS
router.get(
  "/with-todos",
  authMiddleware,
  queryParser,
  validateQuery(listCategoriesSchema),
  categoryController.getCategoriesWithTodos
);

// SHARE CATEGORY
router.post(
  "/:id/share",
  authMiddleware,
  validate(shareCategorySchema),
  categoryController.shareCategory
);

// LIST SHARE CATEGORIES
router.get("/shared", authMiddleware, categoryController.getSharedCategories);

export { router as categoryRoutes };
