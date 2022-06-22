import {
  createUserService,
  loginUserService,
} from "../services/users.services";
import { IUser } from "../database/database";
import { Request, Response } from "express";

const createUserController = async (request: Request, response: Response) => {
  const user = await createUserService(request);
  console.log(user)

  return response.status(201).json(user);
};

const loginUserController = async (request: Request, response: Response) => {
  const { status, message } = await loginUserService(request);

  return response.status(status).json(message);
};

export { createUserController, loginUserController };
