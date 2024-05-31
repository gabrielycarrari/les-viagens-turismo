package viagens_e_turismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;




public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {
 List<Avaliacao> findByCliente(Cliente cliente);
 List<Avaliacao> findByPacote(Pacote cliente);
}
