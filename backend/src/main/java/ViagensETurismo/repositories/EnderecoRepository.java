package ViagensETurismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ViagensETurismo.models.Endereco;
import jakarta.persistence.Id;


@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Id>{
}
