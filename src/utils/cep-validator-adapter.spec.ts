import { CepValidatorAdapter } from "./cep-validator-adapter";

const makeSut = (): CepValidatorAdapter => {
  return new CepValidatorAdapter();
};

describe("cepValidator Adapter", () => {
  test("should return false if validator returns false", () => {
    const sut = makeSut();
    const isValid = sut.isValid("invalid_cep");

    expect(isValid).toBe(false);
  });

  test("should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("12345678");

    expect(isValid).toBe(true);
  });
});
