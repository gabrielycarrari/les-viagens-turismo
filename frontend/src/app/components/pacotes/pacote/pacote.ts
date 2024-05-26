import { Time } from "@angular/common"
import { Endereco } from "../../endereco/endereco"
import { HotelPacote } from "./hotelPacote"
import { TransportePacote } from "./transportePacote"

export interface Pacote {
  id?: number
  nome: string
  descricao: string
  enderecoSaida?: Endereco
  dataSaida: Date
  horaSaida: Time
  enderecoDestino?: Endereco
  dataChegada: Date
  horaChegada: Time
  hotelPacote?: HotelPacote[]
  transportePacote?: TransportePacote[]
  vagas: number
  valorTotal: number
}
