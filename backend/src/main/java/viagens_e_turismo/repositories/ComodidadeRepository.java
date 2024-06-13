package viagens_e_turismo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import viagens_e_turismo.models.Comodidade;

@Repository
public interface ComodidadeRepository extends JpaRepository<Comodidade, Integer> {

}
