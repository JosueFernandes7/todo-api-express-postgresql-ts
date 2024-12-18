import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { validate } from "../middlewares/validate.js";
import { authSchema } from "../validators/UserValidator.js";

const router = Router();
const userController = new UserController();

router.post("/register", validate(authSchema), userController.register);
router.post("/login", validate(authSchema), userController.login);


export { router as userRoutes };
