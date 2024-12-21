import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  async createUser(email: string, hashedPassword: string): Promise<User> {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

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

  async updateEmailVerificationStatus(
    id: number,
    isVerifield: boolean
  ): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { isEmailVerified: isVerifield },
    });
  }
}

export { UserRepository };
