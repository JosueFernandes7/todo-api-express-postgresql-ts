import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  console.log("🌱 Start seed...");

  // User
  const passwordHash = await bcrypt.hash("123456", 10);
  const user = await prisma.user.create({
    data: {
      email: "teste@email.com",
      password: passwordHash,
    },
  });

  console.log("✅ User Created:", user);

  // Categories
  const category = await prisma.category.create({
    data: {
      name: "Work",
      userId: user.id,
    },
  });

  console.log("✅ Categoria Created:", category);

  // TODOs with Category
  const todo1 = await prisma.todo.create({
    data: {
      title: "Implementar API",
      description: "Criar endpoints da API TODO",
      dueDate: new Date("2024-12-20"),
      userId: user.id,
      categoryId: category.id,
    },
  });

  const todo2 = await prisma.todo.create({
    data: {
      title: "Documentar com Swagger",
      description: "Adicionar documentação Swagger para API",
      dueDate: new Date("2024-12-21"),
      userId: user.id,
    },
  });

  console.log("✅ TODOs Created:", [todo1, todo2]);

  console.log("🎉 Seed Finished!");
};

main()
  .catch((e) => {
    console.error("❌ Error in seed:", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
