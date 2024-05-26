package viagens_e_turismo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
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

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        pacoteService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Pacote apagado com sucesso\"}");
    }

}
