package ViagensETurismo.dtos;

import java.util.List;

import ViagensETurismo.models.Veiculo;

public record CompanhiaTransporteRecordDto(
     String nome,
     String CNPJ,
     String categoria,
     String telefone,
     String email,
     String descricao,
     List<Veiculo> veiculos
) {
}
