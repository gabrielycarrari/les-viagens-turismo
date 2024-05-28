package viagens_e_turismo.controllers;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import viagens_e_turismo.dtos.HotelRecordDto;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.services.HotelService;

@RestController
@RequestMapping("/api/hoteis")
public class HotelController {
    @Autowired
    HotelService hotelService;
    
    @PostMapping()
    public ResponseEntity<Hotel> create(@RequestBody @Valid HotelRecordDto hotelRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.save(hotelRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<Hotel>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(hotelService.findAll());
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable int id){
        Optional<Hotel> hotel = hotelService.findById(id);
        if(hotel.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(hotel.get());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        hotelService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Hotel apagado com sucesso\"}");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable @Positive int id, @RequestBody @Valid HotelRecordDto hotelRecordDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.update(id, hotelRecordDto));
    }
}
