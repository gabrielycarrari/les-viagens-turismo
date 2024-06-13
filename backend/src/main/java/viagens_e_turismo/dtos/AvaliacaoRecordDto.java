package viagens_e_turismo.dtos;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;

public record AvaliacaoRecordDto(
    Pacote pacote,
    Cliente cliente,
    String comentario,
    boolean identificacao,
    int qtdEstrelas
) {
}
