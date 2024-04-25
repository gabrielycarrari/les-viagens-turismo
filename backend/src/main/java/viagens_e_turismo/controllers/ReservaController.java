package viagens_e_turismo.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.ReservaRecordDto;
import viagens_e_turismo.models.Reserva;
import viagens_e_turismo.services.ReservaService;

@RestController
public class ReservaController {
    @Autowired
    ReservaService reservaService;
    
    @PostMapping("/reserva")
    public ResponseEntity<List<Reserva>> create(@RequestBody @Valid ReservaRecordDto reservaRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.save(reservaRecordDto));
    }
}
