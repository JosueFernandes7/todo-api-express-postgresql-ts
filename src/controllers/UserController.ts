import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await this.userService.createUser(email, password);

      return res.json({
        message: "User created sucessfully",
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
}

export { UserController };
