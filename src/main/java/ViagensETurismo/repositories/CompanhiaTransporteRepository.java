package ViagensETurismo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ViagensETurismo.models.CompanhiaTransporte;
import jakarta.persistence.Id;

public interface CompanhiaTransporteRepository extends JpaRepository<CompanhiaTransporte, Id> {

}
