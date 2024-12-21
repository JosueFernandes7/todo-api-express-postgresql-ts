import { TodoRepository } from "../repositories/TodoRepository.js";
import { Todo } from "@prisma/client";
class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async createTodo(
    userId: number,
    title: string,
    description: string,
    dueDate: Date,
    categoryId?: number
  ) {
    if (categoryId) {
      const categoryExists = await this.todoRepository.findCategoryById(
        categoryId,
        userId
      );
      if (!categoryExists) {
        throw new Error("Category not found or does not belong to user.");
      }
    }

    return await this.todoRepository.createTodo({
      title,
      description,
      dueDate,
      isCompleted: false,
      userId,
      categoryId,
    });
  }

  async getPendingTodos(userId: number): Promise<Todo[]> {
    return await this.todoRepository.findPendingTodosByUserId(userId);
  }
  
}

export { TodoService };
