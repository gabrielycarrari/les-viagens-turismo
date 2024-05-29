package viagens_e_turismo.dtos;

import java.util.List;

public record CompanhiaTransporteRecordDto(
     int id,
     String nome,
     String cnpj,
     String categoria,
     String telefone,
     String email,
     String descricao,
     List<VeiculoRecordDto> veiculos
) {
}
