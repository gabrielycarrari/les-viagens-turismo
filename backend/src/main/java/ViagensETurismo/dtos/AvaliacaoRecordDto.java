package ViagensETurismo.dtos;
import ViagensETurismo.models.Pacote;
import ViagensETurismo.models.Cliente;

public record AvaliacaoRecordDto(
    Pacote pacote,
    Cliente cliente,
    String comentario,
    boolean identificacao,
    int qtdEstrelas
) {
}
