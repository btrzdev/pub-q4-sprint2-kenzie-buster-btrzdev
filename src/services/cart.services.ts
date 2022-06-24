import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { Dvd } from "../entities/dvd.entity";
import { User } from "../entities/user.entity";
import { fixedFloat } from "../utils";
import { AppError } from "../errors/appError";
import { IUser } from "../database/database";

const cartPayService = async (payingUser: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const user = await userRepository.findOne({
    where: {
      id: payingUser.id,
    },
  });

  const updatedCarts = await cartRepository.update(
    {
      user: {
        id: payingUser.id,
      },
      paid: false,
    },
    {
      paid: true,
    }
  );

  const carts = await cartRepository.find({
    where: {
      user: {
        id: payingUser.id,
      },
    },
  });

  return carts;
};

export { cartPayService };
