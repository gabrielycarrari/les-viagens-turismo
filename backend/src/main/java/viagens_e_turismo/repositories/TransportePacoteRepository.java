package viagens_e_turismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.models.TransportePacote;
import viagens_e_turismo.models.Veiculo;


public interface TransportePacoteRepository extends JpaRepository<TransportePacote, Integer> {
    List<TransportePacote> findByVeiculo(Veiculo veiculo);
    List<TransportePacote> findByPacote(Pacote pacote);
}
