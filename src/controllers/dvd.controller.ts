import { IDvdCreate } from "../database/database";
import { Request, Response } from "express";
import { dvdCreateService, dvdListService } from "../services/dvd.services";

const dvdCreateController = async (request: Request, response: Response) => {
  //   try {
  //     const data = request.body;
  //     const dvd: IDvdCreate = await dvdCreateService(data);
  //     return response.status(201).json(dvd);
  //    } catch (err) {
  //      if (err instanceof AppError) {
  //        handleError(err, response);
  //      }
  // }
};

const dvdListController = async (request: Request, response: Response) => {
  const dvdList: IDvdCreate[] = await dvdListService();

  return response.json(dvdList);
};

export { dvdCreateController, dvdListController };
