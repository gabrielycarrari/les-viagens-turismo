import { Time } from "@angular/common"
import { Endereco } from "../../endereco/endereco"
import { Pacote } from "./pacote"
import { Hotel } from "../../hotel/hotel"
import { Veiculo } from "../../veiculo/veiculo"

export interface TransportePacote {
  id?: number
  pacote: Pacote
  veiculo?: Veiculo
  enderecoSaida?: Endereco
  enderecoChegada?: Endereco
  }
