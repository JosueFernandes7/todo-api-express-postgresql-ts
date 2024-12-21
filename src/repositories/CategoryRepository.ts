import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryRepository {
  async getCategoriesWithTodos(
    userId: number,
    page: number,
    limit: number,
    orderBy: "asc" | "desc"
  ) {
    const offset = (page - 1) * limit;

    const categories = await prisma.category.findMany({
      where: { userId },
      include: {
        todos: {
          orderBy: { dueDate: orderBy }, // Ordena os TODOs associados
        },
      },
      orderBy: {
        id: orderBy,
      },
      skip: offset,
      take: limit,
    });

    const total = await prisma.category.count({ where: { userId } });

    return { categories, total };
  }
  async createCategory(userId: number, name: string): Promise<Category> {
    return await prisma.category.create({
      data: { userId, name },
    });
  }

  async findCategoryById(id: number, userId: number): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: { id, userId },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    return await prisma.category.update({
      where: { id },
      data: { name },
    });
  }
}

export { CategoryRepository };
