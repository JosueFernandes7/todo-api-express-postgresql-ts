import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { validate } from "../middlewares/validate.js";
import { authSchema } from "../validators/UserValidator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { AuthRequest } from "../types/authRequest.js";
const router = Router();
const userController = new UserController();

router.post("/register", validate(authSchema), userController.register);
router.post("/login", validate(authSchema), userController.login);

router.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  res
    .status(200)
    .json({ message: "Rota protegida acessada com sucesso!", user: req.user });
});

export { router as userRoutes };
