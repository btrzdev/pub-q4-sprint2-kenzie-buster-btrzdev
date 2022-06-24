import { AppDataSource } from "../data-source";
import { Dvd } from "../entities/dvd.entity";
import { Stock } from "../entities/stock.entity";
import { Cart } from "../entities/cart.entity";
import { IDvdCreate, IUser } from "../database/database";
import { AppError } from "../errors/appError";

type ServiceResponse = {
  success: boolean;
  data: Cart | null;
  error: string | null;
};

const UUID_Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const dvdCreateService = async (data: IDvdCreate[]) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);

  const dvds = await Promise.all(
    data.map(async ({ quantity, price, name, duration }) => {
      const stock = await stockRepository.save({
        quantity,
        price,
      });
      const dvd = await dvdRepository.save({
        name,
        duration,
        stock,
      });
      return dvd;
    })
  );
  return dvds;
};

const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvdList = await dvdRepository.find();

  return dvdList;
};

const dvdBuyService = async (
  id: string,
  quantity: number,
  user: IUser
): Promise<ServiceResponse> => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const cartRepository = AppDataSource.getRepository(Cart);

  if (!UUID_Regex.test(id)) {
    return { data: null, error: "dvd not found", success: false };
  }

  const dvd = await dvdRepository.findOneBy({ id });
  if (!dvd) {
    return { data: null, error: "dvd not found", success: false };
  }
  if (dvd.stock.quantity < quantity) {
    return {
      data: null,
      error: `current stock: ${dvd.stock.quantity}, received demand ${quantity}`,
      success: false,
    };
  }

  const cart = await cartRepository.save({
    total: quantity * dvd.stock.price,
    paid: false,
    user,
    dvd,
  });

  delete cart.user.password;
  return {
    success: true,
    data: cart,
    error: null,
  };
};

export { dvdCreateService, dvdListService, dvdBuyService };
