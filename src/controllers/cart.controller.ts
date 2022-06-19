import { Request, Response } from "express";
import {
  cartAddDvdService,
  cartDeldDvdService,
} from "../services/cart.services";

const cartAddDvdController = async (request: Request, response: Response) => {
  try {
    const { userEmail } = request.body;

    const { dvd_id } = request.body;

    const cartAdd = await cartAddDvdService(userEmail, dvd_id);

    response.json(cartAdd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, response);
    }
  }
};

const cartDeldDvdController = async (request: Request, response: Response) => {
  try {
    const { dvd_id } = request.params;
    const { userEmail } = request.body;

    const cartDel = cartDeldDvdService(userEmail, dvd_id);

    return response.sendStatus(204);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, response);
    }
  }
};

export { cartAddDvdController, cartDeldDvdController };
