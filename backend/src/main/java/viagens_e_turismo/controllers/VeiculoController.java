package viagens_e_turismo.controllers;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import viagens_e_turismo.dtos.VeiculoRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.services.CompanhiaTransporteService;
import viagens_e_turismo.services.VeiculoService;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculoController {
    @Autowired
    VeiculoService veiculoService;
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;


    @PostMapping()
    public ResponseEntity<Veiculo> create(@RequestBody @Valid VeiculoRecordDto veiculoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoService.save(veiculoRecordDto));
    }

    @GetMapping("/companhia/{idCompanhia}")
    public ResponseEntity<List<Veiculo>> getById(@PathVariable int idCompanhia){
        CompanhiaTransporte companhiaTransporte = companhiaTransporteService.findById(idCompanhia).orElseThrow(() -> new EntityNotFoundException("Companhia de transporte não encontrado com o ID: " + idCompanhia));
        return ResponseEntity.status(HttpStatus.OK).body(veiculoService.findByCompanhiaTransporte(companhiaTransporte));
    } 

    @GetMapping()
    public ResponseEntity<List<Veiculo>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(veiculoService.findAll());
    } 

}
