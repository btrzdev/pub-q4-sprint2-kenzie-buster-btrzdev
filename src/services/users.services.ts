import { IUser } from "../database/database";
import { User } from "../entities/user.entity";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { AssertsShape } from "yup/lib/object";
import { AppDataSource } from "../data-source";

interface IStatusMessage {
  status: number;
  message: object;
}

const userRepository = AppDataSource.getRepository(User);

const createUserService = async ({
  validated,
}: Request): Promise<AssertsShape<any>> => {
  validated.password = hashSync(validated.password, 10);
  const user: User = await userRepository.save(validated);

  delete user.password;
  return user;
};

const loginUserService = async ({
  validated,
}: Request): Promise<IStatusMessage> => {
  const foundUser = await userRepository.findOneBy({
    email: validated.email,
  });

  if (!foundUser) {
    return { status: 401, message: { message: "Invalid credentials." } };
  }

  if (!(await foundUser.comparePwd(validated.password))) {
    return { status: 401, message: { message: "Invalid credentials." } };
  }

  const token: string = sign({ ...foundUser }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { token } };
};

export { createUserService, loginUserService, IStatusMessage };
