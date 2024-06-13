package viagens_e_turismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import viagens_e_turismo.models.Cliente;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
    Cliente findByLogin(String login);

    @Query("SELECT COUNT(c) FROM Cliente c")
    Integer getTotalClientes();
}
