import { AppDataSource } from "../data-source";
import { Dvd } from "../entities/dvd.entity";
import { IDvdCreate } from "../database/database";
import { AppError } from "../errors/appError";

const dvdCreateService = async ({ name, duration }: IDvdCreate) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);

  const dvdAlreadyExists = await dvdRepository.findOne({
    where: { name },
  });
  if (dvdAlreadyExists) {
    throw new AppError(409, "Dvd already exists");
  }

  const dvd = new Dvd();
  dvd.name = name;
  dvd.duration = duration;

  dvdRepository.create(dvd);
  dvdRepository.save(dvd);

  return dvd;
};

const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvdList = await dvdRepository.find();

  return dvdList;
};

export { dvdCreateService, dvdListService };
