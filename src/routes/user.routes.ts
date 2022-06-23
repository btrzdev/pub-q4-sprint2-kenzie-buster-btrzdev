import verifyToken from "../middlewares/verifyToken.middleware";
import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/user.controller";
import { loginUserSchema, createUserSchema } from "../schemas/userSchema";
import validateSchema from "../middlewares/validateSchema.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";

const routes = Router();

routes.post(
  "/register",
  validateSchema(createUserSchema),
  verifyUserExists,
  createUserController
);
routes.post("/login", validateSchema(loginUserSchema), loginUserController);

export default routes;
