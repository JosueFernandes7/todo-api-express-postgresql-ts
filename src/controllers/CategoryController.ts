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
    this.getSharedCategories = this.getSharedCategories.bind(this);
    this.shareCategory = this.shareCategory.bind(this);

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

  async shareCategory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const ownerId = req.user?.id;
      const categoryId = parseInt(req.params.id);
      const { email } = req.body;

      if (!ownerId || isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid input data" });
        return;
      }

      await this.categoryService.shareCategory(categoryId, ownerId, email);

      res.status(200).json({ message: "Category shared successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSharedCategories(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const sharedCategories = await this.categoryService.getSharedCategories(
        userId
      );

      res.status(200).json(sharedCategories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { CategoryController };
