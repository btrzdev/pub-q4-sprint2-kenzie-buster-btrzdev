import { hashSync } from "bcrypt";
import { v4 } from "uuid";

interface IUser {
  email: string;
  name: string;
  password: string;
  isAdm: boolean;
  id: string;
  created_at: Date;
  updated_at: Date;
}

interface IDvd {
  id: number;
  name: string;
  duration: string;
}

interface IDvdCreate {
  name: string;
  duration: string;
}

export { IUser, IDvd, IDvdCreate };
