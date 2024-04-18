package ViagensETurismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ViagensETurismo.models.Cliente;



@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{

}
