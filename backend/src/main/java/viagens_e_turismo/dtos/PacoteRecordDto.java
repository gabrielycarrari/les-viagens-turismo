package viagens_e_turismo.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record PacoteRecordDto( 
    int id,
    String nome,
    String descricao,
    EnderecoRecordDto enderecoSaida,
    LocalDate dataSaida,
    LocalTime horaSaida,
    EnderecoRecordDto enderecoDestino,
    LocalDate dataChegada,
    LocalTime horaChegada,
    List<HotelPacoteDto> hotelPacote,
    List<TransportePacoteDto> transportePacote,
    int vagas,
    float valorTotal
) {
}
