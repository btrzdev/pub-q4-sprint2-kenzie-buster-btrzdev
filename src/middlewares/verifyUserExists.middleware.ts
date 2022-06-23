import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";

const verifyUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.retrieve({
    email: request.validated.email,
  });

  if (foundUser) {
    return response
      .status(409)
      .json({
        message: `Key (email)=(${request.validated.email}) already exists.`,
      });
  }

  return next();
};

export default verifyUserExists;
