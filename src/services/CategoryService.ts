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
}

export { CategoryService };
