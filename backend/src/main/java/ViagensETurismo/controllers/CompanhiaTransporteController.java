package ViagensETurismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.CompanhiaTransporteRecordDto;
import ViagensETurismo.models.CompanhiaTransporte;
import ViagensETurismo.services.CompanhiaTransporteService;
import jakarta.validation.Valid;

@RestController
public class CompanhiaTransporteController {
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;
    
    
    
    @PostMapping("/companhiaTransporte")
    public ResponseEntity<CompanhiaTransporte> create(@RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.save(companhiaTransporteRecordDto));
    }
}
