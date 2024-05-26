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
import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.services.CompanhiaTransporteService;

@RestController
@RequestMapping("/api/companhiasTransporte")
public class CompanhiaTransporteController {
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;
    
    @PostMapping()
    public ResponseEntity<CompanhiaTransporte> create(@RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.save(companhiaTransporteRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<CompanhiaTransporte>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(companhiaTransporteService.findAll());
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        companhiaTransporteService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Companhia Transporte apagada com sucesso\"}");
    }
}
