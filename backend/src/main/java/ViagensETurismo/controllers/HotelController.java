package ViagensETurismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.HotelRecordDto;
import ViagensETurismo.models.Hotel;
import ViagensETurismo.services.HotelService;
import jakarta.validation.Valid;

@RestController
public class HotelController {
    @Autowired
    HotelService hotelService;
    
    @PostMapping("/hotel")
    public ResponseEntity<Hotel> create(@RequestBody @Valid HotelRecordDto hotelRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.save(hotelRecordDto));
    }
}
