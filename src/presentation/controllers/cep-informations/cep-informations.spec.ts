import { CepInformationsController } from "./cep-informations";
import { MissingParamError } from "../../errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Validation } from "../../protocols/validation";
import type {
  CepInformations,
  GetCepInformations,
} from "../../../domain/usecases/get-cep-informations";

const makeFakeHttpRequest = () => ({
  body: {
    cep: "any_cep",
  },
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeGetCepInformations = () => {
  class GetCepInformationsStub implements GetCepInformations {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get(cep: string): Promise<CepInformations> {
      return {
        cep: "any_cep",
        logradouro: "any_logradouro",
        complemento: "any_complemento",
        bairro: "any_bairro",
        localidade: "any_localidade",
        uf: "any_uf",
        ibge: "any_ibge",
        gia: "any_gia",
        ddd: "any_ddd",
        siafi: "any_siafi",
      };
    }
  }

  return new GetCepInformationsStub();
};

interface SutTypes {
  sut: CepInformationsController;
  validationStub: Validation;
  getCepInformationsStub: GetCepInformations;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const getCepInformationsStub = makeGetCepInformations();
  const sut = new CepInformationsController(
    validationStub,
    getCepInformationsStub
  );
  return {
    sut,
    validationStub,
    getCepInformationsStub,
  };
};

describe("CepInformations Controller", () => {
  test("should return 500 if AddAccount throws", async () => {
    const { sut, getCepInformationsStub } = makeSut();
    jest
      .spyOn(getCepInformationsStub, "get")
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toStrictEqual(serverError());
  });

  test("should call AddAccount with correct values", async () => {
    const { sut, getCepInformationsStub } = makeSut();
    const addSpy = jest.spyOn(getCepInformationsStub, "get");
    await sut.handle(makeFakeHttpRequest());

    expect(addSpy).toHaveBeenCalledWith("any_cep");
  });

  test("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toStrictEqual(
      ok({
        cep: "any_cep",
        logradouro: "any_logradouro",
        complemento: "any_complemento",
        bairro: "any_bairro",
        localidade: "any_localidade",
        uf: "any_uf",
        ibge: "any_ibge",
        gia: "any_gia",
        ddd: "any_ddd",
        siafi: "any_siafi",
      })
    );
  });

  test("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toStrictEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });
});
