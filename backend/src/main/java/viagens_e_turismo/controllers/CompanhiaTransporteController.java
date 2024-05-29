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
import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.dtos.HotelRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.services.CompanhiaTransporteService;
import viagens_e_turismo.services.VeiculoService;

@RestController
@RequestMapping("/api/companhiasTransporte")
public class CompanhiaTransporteController {
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;

    @Autowired
    VeiculoService veiculoService;
    
    @PostMapping()
    public ResponseEntity<CompanhiaTransporte> create(@RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.save(companhiaTransporteRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<CompanhiaTransporte>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(companhiaTransporteService.findAll());
    } 

    @GetMapping("/{id}")
    public ResponseEntity<CompanhiaTransporte> getById(@PathVariable int id){
        Optional<CompanhiaTransporte> companhiaTransporte = companhiaTransporteService.findById(id);
        if(companhiaTransporte.isPresent()){
            List<Veiculo> veiculos = veiculoService.findByCompanhiaTransporte(companhiaTransporte.get()); 
            if (veiculos != null){
                companhiaTransporte.get().setVeiculos(veiculos);
            }
            return ResponseEntity.status(HttpStatus.OK).body(companhiaTransporte.get());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } 

    @PutMapping("/{id}")
    public ResponseEntity<CompanhiaTransporte> update(@PathVariable @Positive int id, @RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.update(id, companhiaTransporteRecordDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        companhiaTransporteService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Companhia Transporte apagada com sucesso\"}");
    }
}
