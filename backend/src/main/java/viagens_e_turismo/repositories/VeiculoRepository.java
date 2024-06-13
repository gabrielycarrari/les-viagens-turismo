package viagens_e_turismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Veiculo;


public interface VeiculoRepository extends JpaRepository<Veiculo, Integer>{
    List<Veiculo> findByCompanhiaTransporte(CompanhiaTransporte companhiaTransporte);
}
