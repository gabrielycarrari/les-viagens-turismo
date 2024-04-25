package viagens_e_turismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.services.CompanhiaTransporteService;

@RestController
public class CompanhiaTransporteController {
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;
    
    
    
    @PostMapping("/companhiaTransporte")
    public ResponseEntity<CompanhiaTransporte> create(@RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.save(companhiaTransporteRecordDto));
    }
}
