import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const verifyUserIsAdmMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  if (!request.user.isAdm) {
    throw new AppError(401, "Missing admin permission");
  }

  return next();
};

export default verifyUserIsAdmMiddleware;
