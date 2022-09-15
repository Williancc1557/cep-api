import type { CepValidator } from "../presentation/protocols/cep-validator";

export class CepValidatorAdapter implements CepValidator {
  public isValid(cep: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return cep.length === 8;
  }
}
