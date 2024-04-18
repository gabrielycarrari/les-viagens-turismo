package ViagensETurismo.dtos;

import ViagensETurismo.models.CompanhiaTransporte;


public record TransportePacoteDto(
    CompanhiaTransporte companhiaTransporte,
    EnderecoRecordDto enderecoSaida,
    EnderecoRecordDto enderecoChegada
) {
}
