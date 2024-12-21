import { CategoryRepository } from "../repositories/CategoryRepository.js";

class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getCategoriesWithTodos(
    userId: number,
    page: number,
    limit: number,
    orderBy: "asc" | "desc"
  ) {
    return await this.categoryRepository.getCategoriesWithTodos(
      userId,
      page,
      limit,
      orderBy
    );
  }

  async createCategory(userId: number, name: string) {
    return await this.categoryRepository.createCategory(userId, name);
  }

  async deleteCategory(id: number, userId: number): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(id, userId);

    if (!category) {
      throw new Error("Category not found or does not belong to user.");
    }

    await this.categoryRepository.deleteCategory(id);
  }

  async updateCategory(id: number, userId: number, name: string) {
    const category = await this.categoryRepository.findCategoryById(id, userId);

    if (!category) {
      throw new Error("Category not found or does not belong to user.");
    }

    return await this.categoryRepository.updateCategory(id, name);
  }
}

export { CategoryService };
