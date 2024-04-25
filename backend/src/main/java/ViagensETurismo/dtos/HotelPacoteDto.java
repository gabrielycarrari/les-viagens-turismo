package ViagensETurismo.dtos;

import java.time.LocalDate;

import ViagensETurismo.models.Hotel;


public record HotelPacoteDto(
    Hotel hotel,
    String tipoDiaria, // pernoite... diaria.
    int qtdDiarias,// se for diaria, pode ficar x dias.
    LocalDate dataEntrada
) {

}
