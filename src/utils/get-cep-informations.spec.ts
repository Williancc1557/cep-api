import axios from "axios";
import { GetCepInformationAdapter } from "./get-cep-information";

jest.mock("axios", () => ({
  get() {
    return {
      data: {
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
      },
    };
  },
}));

const makeSut = () => {
  return new GetCepInformationAdapter();
};

describe("GetCepInformations Adapter", () => {
  test("should return null if axios throws", async () => {
    const sut = makeSut();
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error());
    const res = await sut.get("12345678");

    expect(res).not.toBeTruthy();
  });

  test("should call axios.get with valid cep", async () => {
    const sut = makeSut();
    const getSpy = jest.spyOn(axios, "get");
    await sut.get("12345678");

    expect(getSpy).toBeCalledWith("https://viacep.com.br/ws/12345678/json/");
  });

  test("should return valid values if success", async () => {
    const sut = makeSut();
    const response = await sut.get("12345678");

    expect(response).toStrictEqual({
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
    });
  });
});
