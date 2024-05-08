package viagens_e_turismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Reserva;


public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

     List<Reserva> findByCliente(Cliente cliente);
}
