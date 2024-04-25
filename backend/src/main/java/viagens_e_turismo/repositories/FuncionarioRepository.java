package viagens_e_turismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import viagens_e_turismo.models.Funcionario;


@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer>{

}
