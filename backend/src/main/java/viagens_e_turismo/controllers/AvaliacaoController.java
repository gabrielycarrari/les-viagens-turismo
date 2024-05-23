package viagens_e_turismo.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.AvaliacaoRecordDto;
import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.services.AvaliacaoService;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {
    @Autowired
    AvaliacaoService avaliacaoService;


    @PostMapping()
    public ResponseEntity<Avaliacao> create(@RequestBody @Valid AvaliacaoRecordDto avaliacaoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacaoRecordDto));
    }

    @GetMapping()
    public ResponseEntity<List<Avaliacao>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoService.findAll());
    } 

}
