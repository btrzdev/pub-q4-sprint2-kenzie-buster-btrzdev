import * as express from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      decoded: string | JwtPayload;
      validated: IUser;
    }
  }
}
