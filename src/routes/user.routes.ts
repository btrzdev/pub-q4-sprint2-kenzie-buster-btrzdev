import verifyToken from "../middlewares/verifyToken";
import { Router } from "express";

import {
  createUserController,
  loginUserController,
} from "../controllers/user.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/users/register", createUserController);
  routes.post("/users/login", loginUserController);

  return routes;
};
