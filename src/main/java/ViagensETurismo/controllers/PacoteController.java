package ViagensETurismo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ViagensETurismo.dtos.PacoteRecordDto;
import ViagensETurismo.models.Pacote;
import ViagensETurismo.services.PacoteService;
import jakarta.validation.Valid;

@RestController
public class PacoteController {
    @Autowired
    PacoteService pacoteService;


    @PostMapping("/pacote")
    public ResponseEntity<Pacote> create(@RequestBody @Valid PacoteRecordDto pacoteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(pacoteService.save(pacoteRecordDto));
    }

}
