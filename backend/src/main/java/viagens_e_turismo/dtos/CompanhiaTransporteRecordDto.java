package viagens_e_turismo.dtos;


public record CompanhiaTransporteRecordDto(
     String nome,
     String CNPJ,
     String categoria,
     String telefone,
     String email,
     String descricao
) {
}