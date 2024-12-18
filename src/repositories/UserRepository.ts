import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  async createUser(email: string, hashedPassword: string): Promise<User> {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export { UserRepository };
