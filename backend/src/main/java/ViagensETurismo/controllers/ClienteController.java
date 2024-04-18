package ViagensETurismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.ClienteRecordDto;
import ViagensETurismo.models.Cliente;
import ViagensETurismo.services.ClienteService;
import jakarta.validation.Valid;

@RestController
public class ClienteController {
    @Autowired
    ClienteService clienteService;
    
    @PostMapping("/cliente")
    public ResponseEntity<Cliente> create(@RequestBody @Valid ClienteRecordDto clienteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(clienteRecordDto));
    }
}
