import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { cartPayService } from "../services/cart.services";

const cartPayController = async (request: Request, response: Response) => {
  const carts = await cartPayService(request.user);

  response.status(200).json({ cart: carts });
};

export { cartPayController };
