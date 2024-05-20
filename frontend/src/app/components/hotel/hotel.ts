import { Comodidade } from "../comodidade/comodidade"
import { Endereco } from "../endereco/endereco"

export interface Hotel {
  id?: number
  nome: string
  descricao: string
  email: string
  telefone: string
  classificacao: number
  comodidades?: Comodidade[]
  endereco?: Endereco
}
