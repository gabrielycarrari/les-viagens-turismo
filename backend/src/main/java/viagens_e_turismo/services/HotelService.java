package viagens_e_turismo.services;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.ComodidadeRecordDto;
import viagens_e_turismo.dtos.HotelRecordDto;
import viagens_e_turismo.models.Comodidade;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.models.HotelPacote;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.repositories.HotelPacoteRepository;
import viagens_e_turismo.repositories.HotelRepository;
import viagens_e_turismo.repositories.PacoteRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private HotelPacoteRepository hotelPacoteRepository;
    @Autowired
    private PacoteRepository pacoteRepository;

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

    public List<Hotel> findAll(){
        return hotelRepository.findAll();
    }
    

    public void delete(int id){
        Hotel hotel = findById(id).orElseThrow(() -> new EntityNotFoundException("Hotel não encontrado com o ID: " + id));
        List<HotelPacote> hotelPacotes = hotelPacoteRepository.findByHotel(hotel);
        
        Set<Pacote> pacotesParaDeletar = new HashSet<>();
        for (HotelPacote hotelPacote : hotelPacotes) {
            Pacote pacote = hotelPacote.getPacote();
            if (pacote != null) {
                pacotesParaDeletar.add(pacote);
            }
        }
        hotelPacoteRepository.deleteAll(hotelPacotes);
        pacoteRepository.deleteAll(pacotesParaDeletar);
        hotelRepository.delete(hotel);
    }

}
