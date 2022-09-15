import { LogControllerDecorator } from "../../../decorators/log";
import { CepInformationsController } from "../../../presentation/controllers/cep-informations/cep-informations";
import type { Controller } from "../../../presentation/protocols";
import { GetCepInformationAdapter } from "../../../utils/get-cep-information";
import { makeCepInformationsValidation } from "./cep-informations-validation";

export const makeCepInformationsController = (): Controller => {
  const getCepInformations = new GetCepInformationAdapter();
  const cepInformationsController = new CepInformationsController(
    makeCepInformationsValidation(),
    getCepInformations
  );

  return new LogControllerDecorator(cepInformationsController);
};
