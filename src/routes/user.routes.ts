import verifyToken from "../middlewares/verifyToken.middleware";
import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/user.controller";
import { loginUserSchema, createUserSchema } from "../schemas/userSchema";
import validateSchema from "../middlewares/validateSchema.middleware";

const routes = Router();

routes.post(
  "/register",
  validateSchema(createUserSchema),
  createUserController
);
routes.post("/login", validateSchema(loginUserSchema), loginUserController);

export default routes;
