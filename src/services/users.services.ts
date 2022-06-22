import { IUser } from "../database/database";
import { User } from "../entities/user.entity";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt";
import { userWOPassword } from "../utils";
import { AppDataSource } from "../data-source";
import { sign } from "jsonwebtoken";
import userRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import { Cart } from "../entities/cart.entity";
import * as dotenv from "dotenv";
import { AssertsShape } from "yup/lib/object";
import { serializedCreateUserSchema } from "../schemas/userSchema";

interface IStatusMessage {
  status: number;
  message: object;
}

const createUserService = async ({
  validated,
}: Request): Promise<AssertsShape<any>> => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const users = await userRepository.find();

  validated.password = hashSync(validated.password, 10);
  console.log(validated);
  const user: User = await userRepository.save(validated);

  return await serializedCreateUserSchema.validate(user, {
    stripUnknown: true,
  });

  const cart = new Cart();
  cart.total = 0;

  cartRepository.create(cart);
  await cartRepository.save(cart);

  //user.cart = cart;

  //   const finalUser = userWOPassword(user);

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

const loginUserService = async ({
  validated,
}: Request): Promise<IStatusMessage> => {
  const foundUser = await userRepository.retrieve({
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
