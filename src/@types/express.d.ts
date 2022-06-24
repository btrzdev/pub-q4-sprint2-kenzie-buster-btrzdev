import * as express from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser, IDvdCreate } from "../database/database";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      decoded: string | JwtPayload;
      validated: IUser | { dvds: IDvdCreate[] };
    }
  }
}
