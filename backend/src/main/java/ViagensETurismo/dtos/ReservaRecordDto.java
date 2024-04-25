package ViagensETurismo.dtos;
import ViagensETurismo.models.Pacote;
import ViagensETurismo.models.Cliente;

public record ReservaRecordDto(
    Pacote pacote,
    Cliente cliente,
    String observacoes,
    int quantidade
) {
}
