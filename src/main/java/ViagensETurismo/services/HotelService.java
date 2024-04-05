package ViagensETurismo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ViagensETurismo.models.Hotel;
import ViagensETurismo.repositories.HotelRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel save(Hotel hotel){
        return hotelRepository.save(hotel);
    }

}
