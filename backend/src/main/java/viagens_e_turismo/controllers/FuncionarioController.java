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
import viagens_e_turismo.dtos.FuncionarioRecordDto;
import viagens_e_turismo.models.Funcionario;
import viagens_e_turismo.services.FuncionarioService;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    @Autowired
    FuncionarioService funcionarioService;


    @PostMapping()
    public ResponseEntity<Funcionario> create(@RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionarioRecordDto));
    }

    
    @GetMapping()
    public ResponseEntity<List<Funcionario>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findAll());
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        funcionarioService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Funcionario apagado com sucesso\"}");

    }
}
