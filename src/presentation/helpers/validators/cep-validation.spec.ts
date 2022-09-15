import { InvalidParamError } from "../../errors";
import type { CepValidator } from "../../protocols/cep-validator";
import { CepValidation } from "./cep-validation";

const makeCepValidator = (): CepValidator => {
  class CepValidatorStub implements CepValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public isValid(cep: string): boolean {
      return true;
    }
  }
  return new CepValidatorStub();
};

const makeSut = () => {
  const cepValidatorStub = makeCepValidator();
  const sut = new CepValidation("cep", cepValidatorStub);

  return {
    sut,
    cepValidatorStub,
  };
};

describe("Cep Validation", () => {
  test("should return error if Cep is not valid", async () => {
    const { sut, cepValidatorStub } = makeSut();
    jest.spyOn(cepValidatorStub, "isValid").mockReturnValueOnce(false);
    const response = sut.validate({ cep: "any_cep@mail.com" });

    expect(response).toStrictEqual(new InvalidParamError("cep"));
  });

  test("should call CepValidator with correct Cep", async () => {
    const { sut, cepValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cepValidatorStub, "isValid");
    sut.validate({ cep: "any_cep@mail.com" });

    expect(isValidSpy).toHaveBeenCalledWith("any_cep@mail.com");
  });

  test("should return 500 if CepValidator throws", async () => {
    const { sut, cepValidatorStub } = makeSut();
    jest.spyOn(cepValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});
