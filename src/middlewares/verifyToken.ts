import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import  IUser from "../database/database";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  return verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err });
    }

    req.decoded = decoded as IUser;

    return next();
  });
};

export default verifyToken;
