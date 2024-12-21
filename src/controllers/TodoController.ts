import { Response } from "express";
import { AuthRequest } from "../types/authRequest.js";
import { TodoService } from "../services/TodoService.js";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();

    this.createTodo = this.createTodo.bind(this);
    this.getPendingTodos = this.getPendingTodos.bind(this);
    this.getOverdueTodos = this.getOverdueTodos.bind(this);
    this.updateTodoStatus = this.updateTodoStatus.bind(this);
  }

  async createTodo(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { title, description, dueDate, categoryId } = req.body;

      const todo = await this.todoService.createTodo(
        userId,
        title,
        description,
        new Date(dueDate),
        categoryId
      );

      res.status(201).json({
        message: "TODO created successfully",
        todo,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPendingTodos(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const todos = await this.todoService.getPendingTodos(userId);
      res.status(200).json({ todos }); // Retornar o array dentro de um objeto
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOverdueTodos(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const todos = await this.todoService.getOverdueTodos(userId);
      res.status(200).json(todos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTodoStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { todoId, isCompleted } = req.body;
      
      const updatedTodo = await this.todoService.updateTodoStatus(
        todoId,
        userId,
        isCompleted
      );

      res.status(200).json({
        message: "TODO status updated successfully",
        todo: updatedTodo,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { TodoController };
