import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { Dvd } from "../entities/dvd.entity";
import { User } from "../entities/user.entity";
import { fixedFloat } from "../utils";

const cartAddDvdService = async (dvd_id: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await userRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvdToAdd = await userRepository.findOne({
    where: {
      id: dvd_id,
    },
  });

  //   if (!dvdToAdd) {
  //     throw new AppError(404, "Dvd not found");
  //   }

  //   if(cart && dvdToAdd){
  //       if(cart.dvds.filter(dvd => dvd.name === dvdToAdd.name).length > 0) {
  //           throw new AppError(409, "Dvd is already in the cart")
  //       }
  //cart.dvds = [...cart.dvds, dvdToAdd];
  //cart.total = fixedFloat(cart.total + dvdToAdd.price);
  //await cartRepository.save(cart);

  //return cart;
  //   }
};

const cartDeldDvdService = async (userEmail: string, dvd_id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: userEmail } });

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  if (cart) {
    if (cart.dvds.filter((dvd) => dvd.id === dvd_id).length === 0) {
      throw new AppError(404, "Dvd is not in the cart");
    }

    cart.dvds = cart.dvds.filter((dvd) => dvd.id !== dvd_id);
    cart.total = fixedFloat(cart.dvds.reduce((acc, dvd) => acc + dvd.price, 0));

    await cartRepository.save(cart);

    return
  }
};

export{ cartAddDvdService, cartDeldDvdService;
