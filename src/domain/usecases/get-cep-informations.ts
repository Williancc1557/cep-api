export interface CepInformations {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface GetCepInformations {
  get: (cep: string) => Promise<CepInformations>;
}
