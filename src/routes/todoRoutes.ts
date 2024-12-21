import { Router } from "express";
import { TodoController } from "../controllers/TodoController.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createSchema,
  updateStatusSchema,
} from "../validators/todoValidator.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
const todoController = new TodoController();

router.post(
  "/",
  authMiddleware,
  validate(createSchema),
  todoController.createTodo
);

router.get("/pending", authMiddleware, todoController.getPendingTodos);
router.get("/overdue", authMiddleware, todoController.getOverdueTodos);

// Update todo status
router.patch(
  "/status",
  authMiddleware,
  validate(updateStatusSchema),
  todoController.updateTodoStatus
);

export { router as todoRoutes };
