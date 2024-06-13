import { Cliente } from "../cliente/cliente"
import { Pacote } from "../pacotes/pacote/pacote"

export interface Reserva {
  id?: number
  pacote: Pacote
  cliente: Cliente
  observacoes: string
}
