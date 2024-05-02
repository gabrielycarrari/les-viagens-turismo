import { Endereco } from "../endereco/endereco";

export interface Cliente {
  id?: number
  login: string
  senha: string
  cpf: string
  nome: string
  data_nascimento: Date
  telefone: string
  email: string
  endereco?: Endereco
}
