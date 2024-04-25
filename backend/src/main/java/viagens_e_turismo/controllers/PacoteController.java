package viagens_e_turismo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.PacoteRecordDto;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.services.PacoteService;

@RestController
public class PacoteController {
    @Autowired
    PacoteService pacoteService;


    @PostMapping("/pacote")
    public ResponseEntity<Pacote> create(@RequestBody @Valid PacoteRecordDto pacoteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(pacoteService.save(pacoteRecordDto));
    }

}
