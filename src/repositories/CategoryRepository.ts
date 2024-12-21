import { PrismaClient } from "@prisma/client";

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
}

export { CategoryRepository };
