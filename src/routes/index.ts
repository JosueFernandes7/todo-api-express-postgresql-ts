import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { todoRoutes } from "./todoRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";
const routes = Router();

routes.use("/users", userRoutes);
routes.use('/todos', todoRoutes);
routes.use('/categories', categoryRoutes);

export default routes;