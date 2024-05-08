package viagens_e_turismo.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.ClienteRecordDto;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.services.ClienteService;

@Validated
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/clientes")
public class ClienteController {
    @Autowired
    ClienteService clienteService;
    
    @PostMapping
    public ResponseEntity<Cliente> create(@RequestBody @Valid ClienteRecordDto clienteRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(clienteRecordDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid ClienteRecordDto clienteRecordDto){ 
        if(clienteService.login(clienteRecordDto)){
            return ResponseEntity.ok("{\"message\":\"Login efetuado com sucesso\"}");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login ou senha inválidos");
        }
        
    }
    
    
    @GetMapping()
    public ResponseEntity<List<Cliente>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.findAll());
    } 
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        System.out.println("ENtrou controller");
        clienteService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Cliente apagado com sucesso\"}");

    }

    

    //@GetMapping("/{id}")
}
