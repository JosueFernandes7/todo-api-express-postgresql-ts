import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { EmailService } from "../services/EmailService.js";

class UserController {
  private userService: UserService;
  private emailService: EmailService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.userService.createUser(email, password);
  
      await this.emailService.sendVerificationEmail(email, token);
  
      return res.json({
        message: "User created successfully. Please verify your email.",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.validateUser(email, password);

      res.status(200).json({ message: "Login successful", token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  async verify(req: Request, res: Response): Promise<any> {
    try {
      const { token } = req.query;
      if (!token) return res.status(400).json({ error: "Token is required" });
      console.log("TOKEN", token);
      
      await this.userService.verifyEmail(token as string);
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async resendVerification(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;
      await this.userService.resendVerificationEmail(email);
  
      res.status(200).json({ message: "Verification email resent successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
}

export { UserController };
