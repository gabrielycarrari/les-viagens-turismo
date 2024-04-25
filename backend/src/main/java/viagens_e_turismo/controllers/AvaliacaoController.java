package viagens_e_turismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import viagens_e_turismo.dtos.AvaliacaoRecordDto;
import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.services.AvaliacaoService;

@RestController
public class AvaliacaoController {
    @Autowired
    AvaliacaoService avaliacaoService;


    @PostMapping("/avaliacao")
    public ResponseEntity<Avaliacao> create(@RequestBody @Valid AvaliacaoRecordDto avaliacaoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacaoRecordDto));
    }

}
