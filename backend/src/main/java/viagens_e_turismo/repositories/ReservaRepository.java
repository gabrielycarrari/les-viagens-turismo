package viagens_e_turismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.models.Reserva;


public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
     List<Reserva> findByCliente(Cliente cliente);
     List<Reserva> findByPacote(Pacote pacote);

     @Query("SELECT SUM(p.valorTotal) FROM Reserva r INNER JOIN r.pacote p;")
     Float getGanhoTotal();
}
