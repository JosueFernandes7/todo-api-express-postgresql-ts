import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

class TodoRepository {
  async createTodo(data: {
    title: string;
    description: string;
    dueDate: Date;
    isCompleted: boolean;
    userId: number;
    categoryId?: number;
  }): Promise<Todo> {
    return await prisma.todo.create({
      data,
    });
  }

  async findCategoryById(categoryId: number, userId: number): Promise<boolean> {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    // Double negation (!!) converts the result to a boolean: true if a category exists, false otherwise.
    return !!category;
  }

  async findPendingTodosByUserId(userId: number): Promise<Todo[]> {
    return await prisma.todo.findMany({
      where: {
        userId,
        isCompleted: false,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async findOverdueTodosByUserId(userId: number): Promise<Todo[]> {
    return await prisma.todo.findMany({
      where: {
        userId,
        isCompleted: false,
        dueDate: {
          lt: new Date(), // Due date is in the past
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async updateTodoStatus(id: number, userId: number, isCompleted: boolean): Promise<Todo | null> {
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    console.log(existingTodo);
    
  
    if (!existingTodo) {
      throw new Error("Todo not found or does not belong to the user.");
    }
  
    return await prisma.todo.update({
      where: {
        id: existingTodo.id,
      },
      data: {
        isCompleted,
      },
    });    
  }
  
  
  
  
}

export { TodoRepository };
