package viagens_e_turismo.dtos;

import viagens_e_turismo.models.Veiculo;


public record TransportePacoteDto(
    Veiculo veiculo,
    EnderecoRecordDto enderecoSaida,
    EnderecoRecordDto enderecoChegada
) {
}
