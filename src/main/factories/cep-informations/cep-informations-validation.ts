import { CepValidation } from "../../../presentation/helpers/validators/cep-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import type { Validation } from "../../../presentation/protocols/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { CepValidatorAdapter } from "../../../utils/cep-validator-adapter";

export const makeCepInformationsValidation = (): ValidationComposite => {
  const validations: Array<Validation> = [];

  for (const field of ["cep"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CepValidation("cep", new CepValidatorAdapter()));

  return new ValidationComposite(validations);
};
