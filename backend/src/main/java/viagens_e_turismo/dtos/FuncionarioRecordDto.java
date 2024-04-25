package viagens_e_turismo.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FuncionarioRecordDto(
    @NotBlank
    @NotNull
    String login,
    @NotBlank
    @NotNull
    String senha,
    @NotBlank
    @NotNull
    String cpf,
    @NotBlank
    @NotNull
    String nome,
    @NotNull
    LocalDate data_nascimento,
    @NotBlank
    @NotNull
    String telefone,
    @NotBlank
    @NotNull
    String email) {

}
