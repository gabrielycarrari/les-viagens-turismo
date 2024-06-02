import { Reserva } from "./reserva";

export interface ReservaDTO {
  reserva: Partial<Reserva>;
  quantidade: number;
}
