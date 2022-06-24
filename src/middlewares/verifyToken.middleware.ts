import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../database/database";

dotenv.config();

const verifyToken = (
  req: Request & { user: IUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "missing authorization token" });
  }

  return verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }
    req.user = decoded as IUser;

    next();
  });
};

export default verifyToken;
