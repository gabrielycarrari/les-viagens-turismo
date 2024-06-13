import { Cliente } from "../cliente/cliente"
import { Pacote } from "../pacotes/pacote/pacote"

export interface Avaliacao {
  id?: number
  pacote: Pacote
  cliente: Cliente
  qtdEstrelas: number
  comentario: string
  identificacao: boolean
}
