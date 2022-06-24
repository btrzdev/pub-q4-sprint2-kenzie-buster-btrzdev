import verifyToken from "../middlewares/verifyToken.middleware";
import verifyIsAdm from "../middlewares/verifyIsAdm.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";
import { Router } from "express";

const router = Router();

router.post("/buy/:id", verifyToken);

export default router;
