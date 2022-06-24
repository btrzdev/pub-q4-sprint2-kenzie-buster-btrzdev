import { Request, Response, NextFunction } from "express";
import { IUser } from "../database/database";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";

const verifyUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData = request.validated as IUser;
  const foundUser: User = await userRepository.retrieve({
    email: userData.email,
  });

  if (foundUser) {
    return response.status(409).json({
      message: `Key (email)=(${userData.email}) already exists.`,
    });
  }

  return next();
};

export default verifyUserExists;
