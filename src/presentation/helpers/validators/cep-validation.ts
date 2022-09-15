import { InvalidParamError } from "../../errors";
import type { CepValidator } from "../../protocols/cep-validator";
import type { Validation } from "../../protocols/validation";

export class CepValidation implements Validation {
  public constructor(
    private readonly fieldName: string,
    private readonly cepValidator: CepValidator
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validate(input: any): Error {
    const isValid = this.cepValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
