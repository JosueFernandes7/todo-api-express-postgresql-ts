import { CategoryRepository } from "../repositories/CategoryRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

class CategoryService {
  private categoryRepository: CategoryRepository;
  private userRepository: UserRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.userRepository = new UserRepository();
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

  async shareCategory(categoryId: number, ownerId: number, userEmail: string): Promise<void> {
    const userToShare = await this.userRepository.findUserByEmail(userEmail);
    if (!userToShare) {
      throw new Error("User not found");
    }

    const category = await this.categoryRepository.findCategoryById(categoryId, ownerId);
    if (!category) {
      throw new Error("Category not found or does not belong to the user.");
    }

    await this.categoryRepository.shareCategoryWithUser(categoryId, userToShare.id);
  }

  async getSharedCategories(userId: number) {
    return await this.categoryRepository.getSharedCategories(userId);
  }
}

export { CategoryService };
