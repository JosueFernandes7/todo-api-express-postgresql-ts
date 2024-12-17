import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Inserir um usuário de teste
  const user = await prisma.user.create({
    data: {
      email: "teste@email.com",
      password: "123456", // Em produção, você usaria hash de senha
    },
  });

  console.log("Usuário criado:", user);

  // Listar todos os usuários
  const users = await prisma.user.findMany();
  console.log("Lista de usuários:", users);
}

// Executar o teste
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
