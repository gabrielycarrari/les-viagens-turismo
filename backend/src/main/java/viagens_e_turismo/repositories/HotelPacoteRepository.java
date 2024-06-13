package viagens_e_turismo.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.models.HotelPacote;
import viagens_e_turismo.models.Pacote;

@Repository
public interface HotelPacoteRepository extends JpaRepository<HotelPacote, Integer>{
    List<HotelPacote> findByHotel(Hotel hotel);
    List<HotelPacote> findByPacote(Pacote pacote);
}
