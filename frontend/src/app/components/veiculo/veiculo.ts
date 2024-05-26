
import { CompanhiaTransporte } from "../companhiaTransporte/companhiaTransporte"

export interface Veiculo {
  id?: number
  nome: string
  vagas: number
  registro: string
  companhiaTransporte: CompanhiaTransporte
}
