import type {
  CepInformations,
  GetCepInformations,
} from "../domain/usecases/get-cep-informations";
import axios from "axios";

export class GetCepInformationAdapter implements GetCepInformations {
  public async get(cep: string): Promise<CepInformations> {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      return data;
    } catch (err) {
      return null;
    }
  }
}
