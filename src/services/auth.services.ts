import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../database/database";

dotenv.config();

const authenticateUser = async (
  req: Request & { user: IUser },
  res: Response
): Promise<{ success: boolean; data?: IUser; errorType?: string }> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return { success: false, errorType: "missing authorization token" };
  }

  const jwtPromise = new Promise<{
    success: boolean;
    data?: IUser;
    errorType?: string;
  }>((resolve) => {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        resolve({ success: false, errorType: "jwt malformed" });
      } else {
        resolve({ success: true, data: decoded as IUser });
      }
    });
  });

  return await jwtPromise;
};

export default authenticateUser;
