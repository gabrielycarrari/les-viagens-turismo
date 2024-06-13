import { Veiculo } from "../veiculo/veiculo"

export interface CompanhiaTransporte {
  id?: number
  nome: string
  categoria: string
  telefone: string
  email: string
  descricao: Date
  cnpj: string
  veiculos: Veiculo[]
}
