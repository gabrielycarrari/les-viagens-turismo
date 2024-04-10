package ViagensETurismo.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.ComodidadeRecordDto;
import ViagensETurismo.dtos.HotelRecordDto;
import ViagensETurismo.models.Comodidade;
import ViagensETurismo.models.Endereco;
import ViagensETurismo.models.Hotel;
import ViagensETurismo.services.HotelService;
import jakarta.validation.Valid;

@RestController
public class HotelController {
    @Autowired
    HotelService hotelService;
    
    @PostMapping("/hotel")
    public ResponseEntity<Hotel> create(@RequestBody @Valid HotelRecordDto hotelRecordDto){
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
       
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.save(hotel));
    }
}
