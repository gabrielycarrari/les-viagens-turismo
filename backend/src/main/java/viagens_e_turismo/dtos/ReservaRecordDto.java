package viagens_e_turismo.dtos;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;

public record ReservaRecordDto(
    Pacote pacote,
    Cliente cliente,
    String observacoes,
    int quantidade
) {
}
