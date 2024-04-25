package viagens_e_turismo.dtos;

import java.time.LocalDate;

public record ClienteRecordDto(
     String login,
     String senha,
     String cpf,
     String nome,
     LocalDate data_nascimento,
     String telefone,
     String email,
     EnderecoRecordDto endereco
) {

}
