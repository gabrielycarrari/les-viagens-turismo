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
import viagens_e_turismo.dtos.PacoteRecordDto;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.services.PacoteService;

@RestController
@RequestMapping("/api/pacotes")
public class PacoteController {
    @Autowired
    PacoteService pacoteService;

    @PostMapping()
    public ResponseEntity<Pacote> create(@RequestBody @Valid PacoteRecordDto pacoteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(pacoteService.save(pacoteRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<Pacote>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(pacoteService.findAll());
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Pacote> getById(@PathVariable int id){
        Optional<Pacote> pacote = pacoteService.findById(id);
        if(pacote.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(pacote.get());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } 

    @PutMapping("/{id}")
    public ResponseEntity<Pacote> update(@PathVariable @Positive int id, @RequestBody @Valid PacoteRecordDto pacoteTransporteRecordDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacoteService.update(id, pacoteTransporteRecordDto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        pacoteService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Pacote apagado com sucesso\"}");
    }

}
