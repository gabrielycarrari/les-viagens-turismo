package ViagensETurismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ViagensETurismo.models.Funcionario;
import jakarta.persistence.Id;


@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Id>{

}
