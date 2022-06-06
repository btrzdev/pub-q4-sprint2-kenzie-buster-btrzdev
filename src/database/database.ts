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

export default IUser;
