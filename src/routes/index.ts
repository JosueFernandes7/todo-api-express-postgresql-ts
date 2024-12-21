import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { todoRoutes } from "./todoRoutes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use('/todos', todoRoutes);

export default routes;