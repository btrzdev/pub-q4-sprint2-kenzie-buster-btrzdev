import * as express from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../database/database";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      decoded: string | JwtPayload;
      validated: IUser;
    }
  }
}
