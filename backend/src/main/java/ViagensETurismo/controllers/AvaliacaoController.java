package ViagensETurismo.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ViagensETurismo.dtos.AvaliacaoRecordDto;
import ViagensETurismo.models.Avaliacao;
import ViagensETurismo.services.AvaliacaoService;
import jakarta.validation.Valid;

@RestController
public class AvaliacaoController {
    @Autowired
    AvaliacaoService avaliacaoService;


    @PostMapping("/avaliacao")
    public ResponseEntity<Avaliacao> create(@RequestBody @Valid AvaliacaoRecordDto avaliacaoRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacaoRecordDto));
    }

}
