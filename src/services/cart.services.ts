import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { Dvd } from "../entities/dvd.entity";
import { User } from "../entities/user.entity";
import { Stock } from "../entities/stock.entity";
import { fixedFloat } from "../utils";
import { AppError } from "../errors/appError";
import { IUser } from "../database/database";

const cartPayService = async (payingUser: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const stockRepository = AppDataSource.getRepository(Stock);
  const user = await userRepository.findOne({
    where: {
      id: payingUser.id,
    },
    relations: ["carts"],
  });

  console.log(user);

  user?.carts?.map((c) => {
    cartRepository.findOne({ where: { id: c.id } }).then((cart) => {
      console.log(cart);
      const cartQuantity = cart.total / cart.dvd.stock.price;
      const newQuantity = cart.dvd.stock.quantity - cartQuantity;
      stockRepository
        .update(
          {
            id: cart.dvd.stock.id,
          },
          {
            quantity: newQuantity,
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
  });

  await cartRepository.update(
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
