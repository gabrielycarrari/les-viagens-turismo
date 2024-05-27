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
import viagens_e_turismo.dtos.AlterarSenhaRecordDto;
import viagens_e_turismo.dtos.ClienteRecordDto;
import viagens_e_turismo.dtos.FuncionarioRecordDto;
import viagens_e_turismo.models.Cliente;
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

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getById(@PathVariable int id){
        Optional<Funcionario> funcionario = funcionarioService.findById(id);
        if(funcionario.isPresent()){
            funcionario.get().setSenha("");
            return ResponseEntity.status(HttpStatus.OK).body(funcionario.get());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        funcionarioService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Funcionario apagado com sucesso\"}");

    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> update(@PathVariable @Positive int id, @RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.update(id, funcionarioRecordDto));
    }


    @PostMapping("/alterarSenha")
    public ResponseEntity<String> alterarSenha(@RequestBody @Valid AlterarSenhaRecordDto alterarSenhaRecordDto){ 
        if(funcionarioService.alterarSenha(alterarSenhaRecordDto)){
            return ResponseEntity.ok("{\"message\":\"Senha alterada com sucesso\"}");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Senha atual inválida");
        }
    }
}
