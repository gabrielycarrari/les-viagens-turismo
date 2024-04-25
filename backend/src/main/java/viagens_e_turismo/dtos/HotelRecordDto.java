package viagens_e_turismo.dtos;

import java.util.List;


public record HotelRecordDto(
     String nome,
     String descricao,
     String email,
     String telefone,
     int classificacao,
     List<ComodidadeRecordDto> comodidades,
     EnderecoRecordDto endereco
) {

}
