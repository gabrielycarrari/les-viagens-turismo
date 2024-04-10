package ViagensETurismo.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ViagensETurismo.dtos.VeiculoRecordDto;
import ViagensETurismo.models.Veiculo;
import ViagensETurismo.services.VeiculoService;
import jakarta.validation.Valid;

@RestController
public class VeiculoController {
    @Autowired
    VeiculoService veiculoService;


    @PostMapping("/veiculo")
    public ResponseEntity<Veiculo> create(@RequestBody @Valid VeiculoRecordDto veiculoRecordDto){
        var veiculo = new Veiculo();
        BeanUtils.copyProperties(veiculoRecordDto, veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculoService.save(veiculo));
    }

}
