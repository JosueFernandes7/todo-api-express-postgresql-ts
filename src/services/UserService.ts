import { hash, compare } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { EmailService } from "./EmailService.js";
import { TokenService } from "./TokenService.js";
class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;
  private tokenService: TokenService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
    this.tokenService = new TokenService();
  }

  async createUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const hashedPassword = await hash(password, 10);
    const user = await this.userRepository.createUser(email, hashedPassword);

    const verificationToken = this.tokenService.generateVerificationToken(email);
    return { user, token: verificationToken };
  }

  async validateUserToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number; email: string };

      // Find the user and mark as verified
      const user = await this.userRepository.findUserById(decoded.id);
      if (!user) throw new Error("User not found");

      await this.userRepository.updateEmailVerificationStatus(user.id, true);

      return user;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Password");

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return token;
  }

  async verifyEmail(token: string): Promise<void> {
    
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: number;
      email: string;
    };
    
    const user = await this.userRepository.findUserByEmail(decoded.email);

    if (!user) throw new Error("User not found");
    if (user.isEmailVerified) throw new Error("Email already verifield");

    await this.userRepository.updateEmailVerificationStatus(user.id, true);
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);
    if(!user) throw new Error("User not found");

    const verificationToken = this.tokenService.generateVerificationToken(email);

    await this.emailService.sendVerificationEmail(email, verificationToken);
  }
}

export { UserService };
