import verifyToken from "../middlewares/verifyToken.middleware";
import verifyIsAdm from "../middlewares/verifyIsAdm.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import { cartPayController } from "../controllers/cart.controller";

const router = Router();

router.put("/pay", verifyToken, cartPayController);

export default router;
