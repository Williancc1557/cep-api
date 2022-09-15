import type { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeCepInformationsController } from "../factories/cep-informations/cep-informations";

export default (router: Router): void => {
  router.get("/cep-informations", adaptRoute(makeCepInformationsController()));
};
