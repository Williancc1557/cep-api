import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";

const makeSut = () => {
  const sut = new RequiredFieldValidation("Cep");

  return {
    sut,
  };
};

describe("RequiredField validation", () => {
  test("should return MissingParamError if the field is not provided", () => {
    const { sut } = makeSut();
    const res = sut.validate({});

    expect(res).toStrictEqual(new MissingParamError("Cep"));
  });

  test("should return null if validation succeeds", () => {
    const { sut } = makeSut();
    const res = sut.validate({
      Cep: "any_Cep@mail.com",
    });

    expect(res).toBeUndefined();
  });
});
