package ViagensETurismo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import ViagensETurismo.models.Hotel;
import jakarta.persistence.Id;


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Id>{

}
