package viagens_e_turismo.dtos;

import java.time.LocalDate;

import viagens_e_turismo.models.Hotel;


public record HotelPacoteDto(
    int id,
    Hotel hotel,
    String tipoDiaria, // pernoite... diaria.
    int qtdDiarias,// se for diaria, pode ficar x dias.
    LocalDate dataEntrada
) {

}
