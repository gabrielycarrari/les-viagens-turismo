import { Time } from "@angular/common"
import { Endereco } from "../../endereco/endereco"
import { Pacote } from "./pacote"
import { Hotel } from "../../hotel/hotel"

export interface HotelPacote {
  id?: number
  pacote: Pacote
  hotel: Hotel
  tipoDiaria: string
  qtdDiarias: number
  dataEntrada: Date
}
