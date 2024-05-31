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

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import viagens_e_turismo.dtos.AvaliacaoRecordDto;
import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.services.AvaliacaoService;
import viagens_e_turismo.services.PacoteService;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {
    @Autowired
    AvaliacaoService avaliacaoService;
    @Autowired
    PacoteService pacoteService;


    @PostMapping()
    public ResponseEntity<Avaliacao> create(@RequestBody @Valid AvaliacaoRecordDto avaliacaoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacaoRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<Avaliacao>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoService.findAll());
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        avaliacaoService.delete(id);
        return ResponseEntity.ok("{\"message\":\"Avaliação apagada com sucesso\"}");
    }

    @GetMapping("/pacote/{idPacote}")
    public ResponseEntity<List<Avaliacao>> getByPacote(@PathVariable int idPacote){
        Pacote pacote = pacoteService.findById(idPacote).orElseThrow(() -> new EntityNotFoundException("Pacote não encontrado com o ID: " + idPacote));
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoService.findByPacote(pacote));
    } 


}
