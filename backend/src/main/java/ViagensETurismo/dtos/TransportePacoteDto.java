package ViagensETurismo.dtos;

import ViagensETurismo.models.Veiculo;


public record TransportePacoteDto(
    Veiculo veiculo,
    EnderecoRecordDto enderecoSaida,
    EnderecoRecordDto enderecoChegada
) {
}
