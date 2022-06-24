import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const verifyUserIsAdmMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.user.isAdm) {
    return response.status(401).json({ error: "missing admin permission" });
  }

  return next();
};

export default verifyUserIsAdmMiddleware;
