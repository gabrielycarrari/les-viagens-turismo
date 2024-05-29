package viagens_e_turismo.services;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.VeiculoRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.repositories.VeiculoRepository;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private CompanhiaTransporteService companhiaTransporteService;

   
    public Veiculo save(VeiculoRecordDto veiculoRecordDto){
        var veiculo = new Veiculo();
        BeanUtils.copyProperties(veiculoRecordDto, veiculo);
        Optional<CompanhiaTransporte> optionalCompanhiaTransporte = companhiaTransporteService.findById(veiculoRecordDto.companhiaTransporte().getId());
        if(optionalCompanhiaTransporte.isPresent()){
            veiculo.setCompanhiaTransporte(optionalCompanhiaTransporte.get());
        }else {
            throw new RuntimeException("Companhia com ID: " + veiculoRecordDto.companhiaTransporte().getId() + " não encontrado.");
        } 
        return veiculoRepository.save(veiculo);
    }

    public Optional<Veiculo> findById(int id){
        return veiculoRepository.findById(id);
    }

    public List<Veiculo> findByCompanhiaTransporte(CompanhiaTransporte companhiaTransporte){
        return veiculoRepository.findByCompanhiaTransporte(companhiaTransporte);
    }

}
