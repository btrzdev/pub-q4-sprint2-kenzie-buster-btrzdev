import verifyToken from "../middlewares/verifyToken.middleware";
import verifyIsAdm from "../middlewares/verifyIsAdm.middleware";
import { Router } from "express";
import {
  dvdCreateController,
  dvdListController,
} from "../controllers/dvd.controller";

const routes = Router();

routes.post("/dvds/register", verifyToken, verifyIsAdm, dvdCreateController);
routes.get("/dvds"), dvdListController;

export default routes;
