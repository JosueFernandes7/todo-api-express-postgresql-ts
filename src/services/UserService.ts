import { hash, compare } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../env.js";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await hash(password, 10);
    const user = await this.userRepository.createUser(email, hashedPassword);

    return user;
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Password");

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return token
  }
}

export { UserService };
