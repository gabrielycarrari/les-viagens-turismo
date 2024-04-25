package viagens_e_turismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.FuncionarioRecordDto;
import viagens_e_turismo.models.Funcionario;
import viagens_e_turismo.services.FuncionarioService;

@RestController
public class FuncionarioController {
    @Autowired
    FuncionarioService funcionarioService;


    @PostMapping("/funcionario")
    public ResponseEntity<Funcionario> create(@RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionarioRecordDto));
    }

}
