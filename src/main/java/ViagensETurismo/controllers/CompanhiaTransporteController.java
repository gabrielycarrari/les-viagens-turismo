package ViagensETurismo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.CompanhiaTransporteRecordDto;
import ViagensETurismo.models.CompanhiaTransporte;
import ViagensETurismo.models.Veiculo;
import ViagensETurismo.services.CompanhiaTransporteService;
import ViagensETurismo.services.VeiculoService;
import jakarta.validation.Valid;

@RestController
public class CompanhiaTransporteController {
    @Autowired
    CompanhiaTransporteService companhiaTransporteService;
    @Autowired
    VeiculoService veiculoService;
    
    
    @PostMapping("/companhiaTransporte")
    public ResponseEntity<CompanhiaTransporte> create(@RequestBody @Valid CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
        
        var companhiaTransporte = new CompanhiaTransporte();

        BeanUtils.copyProperties(companhiaTransporteRecordDto, companhiaTransporte);
        
        List<Veiculo> veiculos = new ArrayList<>();
        
        for (Veiculo veiculo : companhiaTransporteRecordDto.veiculos()) {
            Optional<Veiculo> optionalVeiculo = veiculoService.findById(veiculo.getId());
            optionalVeiculo.ifPresent(veiculos::add);
        }
        companhiaTransporte.setVeiculos(veiculos);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(companhiaTransporteService.save(companhiaTransporte));
    }
}
