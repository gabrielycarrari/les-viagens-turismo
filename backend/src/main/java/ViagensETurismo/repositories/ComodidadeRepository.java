package ViagensETurismo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ViagensETurismo.models.Comodidade;
import jakarta.persistence.Id;

@Repository
public interface ComodidadeRepository extends JpaRepository<Comodidade, Id> {

}
