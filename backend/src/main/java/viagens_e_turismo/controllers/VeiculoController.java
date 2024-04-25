package viagens_e_turismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.VeiculoRecordDto;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.services.VeiculoService;

@RestController
public class VeiculoController {
    @Autowired
    VeiculoService veiculoService;


    @PostMapping("/veiculo")
    public ResponseEntity<Veiculo> create(@RequestBody @Valid VeiculoRecordDto veiculoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoService.save(veiculoRecordDto));
    }

}
