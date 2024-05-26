export interface Endereco {
  id: number | null;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: number;
  pontoReferencia: string;
}
