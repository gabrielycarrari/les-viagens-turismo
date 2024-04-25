package viagens_e_turismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import viagens_e_turismo.models.Pacote;


@Repository
public interface PacoteRepository extends JpaRepository<Pacote, Integer>{

}
