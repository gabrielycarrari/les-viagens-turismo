package viagens_e_turismo.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.ReservaRecordDto;
import viagens_e_turismo.models.Reserva;
import viagens_e_turismo.services.ReservaService;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {
    @Autowired
    ReservaService reservaService;
    
    @PostMapping()
    public ResponseEntity<List<Reserva>> create(@RequestBody @Valid ReservaRecordDto reservaRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.save(reservaRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<Reserva>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(reservaService.findAll());
    } 

}
