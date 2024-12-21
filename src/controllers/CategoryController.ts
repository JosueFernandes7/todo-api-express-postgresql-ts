import { Request, Response } from "express";
import { AuthRequest } from "../types/authRequest.js";
import { CategoryService } from "../services/CategoryService.js";

class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();

    this.getCategoriesWithTodos = this.getCategoriesWithTodos.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    
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

  async createCategory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { name } = req.body;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const category = await this.categoryService.createCategory(userId, name);

      res
        .status(201)
        .json({ message: "Category created successfully", category });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      await this.categoryService.deleteCategory(Number(id), userId);

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;
      const { name } = req.body;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const category = await this.categoryService.updateCategory(
        Number(id),
        userId,
        name
      );

      res
        .status(200)
        .json({ message: "Category updated successfully", category });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { CategoryController };
