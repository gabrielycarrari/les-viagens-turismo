package viagens_e_turismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.ComodidadeRecordDto;
import viagens_e_turismo.dtos.HotelRecordDto;
import viagens_e_turismo.models.Comodidade;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.repositories.HotelRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel save(HotelRecordDto hotelRecordDto){
        var hotel = new Hotel();
        var endereco = new Endereco();
        BeanUtils.copyProperties(hotelRecordDto, hotel);
        BeanUtils.copyProperties(hotelRecordDto.endereco(), endereco);
        
        List<Comodidade> comodidades = new ArrayList<>();
        for (ComodidadeRecordDto comodidadeDto : hotelRecordDto.comodidades()) {
            var comodidade = new Comodidade();
            BeanUtils.copyProperties(comodidadeDto, comodidade);
            comodidades.add(comodidade);
        }
        hotel.setEndereco(endereco);
        hotel.setComodidades(comodidades);
        return hotelRepository.save(hotel);
    }

    public Optional<Hotel> findById(int id){
        return hotelRepository.findById(id);
    }
}
