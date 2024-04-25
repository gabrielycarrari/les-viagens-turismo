package viagens_e_turismo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import viagens_e_turismo.models.Reserva;


public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

}
