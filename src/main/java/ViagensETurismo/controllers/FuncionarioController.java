package ViagensETurismo.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ViagensETurismo.dtos.FuncionarioRecordDto;
import ViagensETurismo.models.Funcionario;
import ViagensETurismo.services.FuncionarioService;
import jakarta.validation.Valid;

@RestController
public class FuncionarioController {
    @Autowired
    FuncionarioService funcionarioService;


    @PostMapping("/funcionario")
    public ResponseEntity<Funcionario> create(@RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto){
        var funcionario = new Funcionario();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
    }

}
