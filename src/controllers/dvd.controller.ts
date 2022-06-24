import { IDvdCreate } from "../database/database";
import { Request, Response } from "express";
import {
  dvdCreateService,
  dvdListService,
  dvdBuyService,
} from "../services/dvd.services";
import { AppError, handleError } from "../errors/appError";

const dvdCreateController = async (request: Request, response: Response) => {
  const data = request.validated as { dvds: IDvdCreate[] };
  const dvds = await dvdCreateService(data.dvds);
  return response.status(201).json({ dvds: dvds });
};

const dvdListController = async (req: Request, res: Response) => {
  const dvdList = await dvdListService();
  return res.status(200).json(dvdList);
};

const dvdBuyController = async (req: Request, res: Response) => {
  const purchase = await dvdBuyService(
    req.params.id as string,
    req.body.quantity as number,
    req.user
  );
  if (purchase.success === false) {
    if (purchase.error === "dvd not found") {
      return res.status(404).json({ error: purchase.error });
    }
    return res.status(422).json({ error: purchase.error });
  }
  return res.status(200).json(purchase.data);
};

export { dvdCreateController, dvdListController, dvdBuyController };
