import {
  createUserService,
  loginUserService,
} from "../services/users.services";
import { IUser } from "../database/database";
import { Request, Response } from "express";
import authenticateUser from "../services/auth.services";

const createUserController = async (request: Request, response: Response) => {
  const validatedData = request.validated as IUser;
  if (validatedData.isAdm === true) {
    const authUser = await authenticateUser(request, response);
    console.log(authUser);
    if (!authUser.success) {
      if (authUser.errorType === "jwt malformed") {
        return response.status(401).json({
          error: {
            name: "JsonWebTokenError",
            message: authUser.errorType,
          },
        });
      }
      return response.status(401).json({ error: authUser.errorType });
    } else if (!authUser.data.isAdm) {
      return response.status(401).json({
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }
  }
  const user = await createUserService(request);
  console.log(user);

  return response.status(201).json(user);
};

const loginUserController = async (request: Request, response: Response) => {
  const { status, message } = await loginUserService(request);

  return response.status(status).json(message);
};

export { createUserController, loginUserController };
