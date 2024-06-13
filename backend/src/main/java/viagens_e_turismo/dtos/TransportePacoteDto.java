package viagens_e_turismo.dtos;

import viagens_e_turismo.models.Veiculo;


public record TransportePacoteDto(
    int id,
    Veiculo veiculo,
    EnderecoRecordDto enderecoSaida,
    EnderecoRecordDto enderecoChegada
) {
}
