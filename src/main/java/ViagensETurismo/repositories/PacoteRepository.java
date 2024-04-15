package ViagensETurismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ViagensETurismo.models.Pacote;


@Repository
public interface PacoteRepository extends JpaRepository<Pacote, Integer>{

}
