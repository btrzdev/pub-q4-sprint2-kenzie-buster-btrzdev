import verifyToken from "../middlewares/verifyToken.middleware";
import verifyIsAdm from "../middlewares/verifyIsAdm.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import {
  dvdCreateController,
  dvdListController,
  dvdBuyController,
} from "../controllers/dvd.controller";
import { createDvdSchema } from "../schemas/dvdSchema";

const router = Router();

router.post(
  "/register",
  verifyToken,
  verifyIsAdm,
  validateSchema(createDvdSchema),
  dvdCreateController
);

router.get("/", dvdListController);

router.post("/buy/:id", verifyToken, dvdBuyController);

export default router;
