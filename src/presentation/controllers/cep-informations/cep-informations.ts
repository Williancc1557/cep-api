import type {
  HttpResponse,
  HttpRequest,
  Controller,
} from "./cep-informations-protocols";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import type { Validation } from "../../protocols/validation";
import type { GetCepInformations } from "../../../domain/usecases/get-cep-informations";
import { InvalidParamError } from "../../errors";
export class CepInformationsController implements Controller {
  public constructor(
    private readonly validation: Validation,
    private readonly getCepInformations: GetCepInformations
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { cep } = httpRequest.body;
      const informations = await this.getCepInformations.get(cep);

      if (!informations) {
        return badRequest(new InvalidParamError("cep"));
      }

      return ok(informations);
    } catch (error) {
      return serverError();
    }
  }
}
