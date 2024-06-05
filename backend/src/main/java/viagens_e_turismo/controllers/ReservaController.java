package viagens_e_turismo.controllers;
import java.util.List;

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
import viagens_e_turismo.dtos.ReservaRecordDto;
import viagens_e_turismo.models.Hotel;
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

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Reserva>> findByCliente(@PathVariable int idCliente){
        return ResponseEntity.status(HttpStatus.OK).body(reservaService.findByCliente(idCliente));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        reservaService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Reserva apagada com sucesso\"}");
    }

    @GetMapping("/ganhoTotal")
    public ResponseEntity<Float> getGanhoTotal(){
        return ResponseEntity.status(HttpStatus.OK).body(reservaService.getGanhoTotal());
    } 

}
