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

interface IStatusMessage {
  status: number;
  message: object;
}

const createUserService = async ({ name, email, password, isAdm }: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const users = await userRepository.find();

  const userAlreadyExists = users.find((user) => user.email === email);

  if (userAlreadyExists) {
    return "This email adress is already being used";
  }

  const cart = new Cart();
  cart.total = 0;

  cartRepository.create(cart);
  await cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashSync(password, 10);
  user.isAdm = isAdm;
  user.cart = cart;

  //   const finalUser = userWOPassword(user);

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

const loginUserService = async ({ body }: Request): Promise<IStatusMessage> => {
  const foundUser = await userRepository.retrieve({
    email: body.email,
  });

  if (!foundUser) {
    return { status: 404, message: { message: "Invalid credentials." } };
  }

  if (!(await foundUser.comparePwd(body.password))) {
    return { status: 400, message: { message: "Invalid credentials." } };
  }

  const token = sign({ ...foundUser }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { token } };
};

export { createUserService, loginUserService, IStatusMessage };
