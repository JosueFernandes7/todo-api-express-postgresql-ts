import { Request, Response } from "express";
import { AuthRequest } from "../types/authRequest.js";
import { CategoryService } from "../services/CategoryService.js";

class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  
    this.getCategoriesWithTodos = this.getCategoriesWithTodos.bind(this);
}

  async getCategoriesWithTodos(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { page = 1, limit = 10, orderBy = "asc" } = req.query;
      
      const data = await this.categoryService.getCategoriesWithTodos(
        userId,
        Number(page),
        Number(limit),
        orderBy as "asc" | "desc"
      );

      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { CategoryController };
