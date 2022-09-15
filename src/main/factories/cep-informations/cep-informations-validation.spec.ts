import { CepValidation } from "../../../presentation/helpers/validators/cep-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import type { Validation } from "../../../presentation/protocols/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import type { CepValidator } from "../../../presentation/protocols/cep-validator";
import { makeCepInformationsValidation } from "./cep-informations-validation";

jest.mock("../../../presentation/helpers/validators/validation-composite");

const makeCepValidator = (): CepValidator => {
  class CepValidatorStub implements CepValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public isValid(cep: string): boolean {
      return true;
    }
  }
  return new CepValidatorStub();
};

describe("CepInformationsValidation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeCepInformationsValidation();
    const validations: Array<Validation> = [];

    for (const field of ["cep"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CepValidation("cep", makeCepValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
