package ViagensETurismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.CompanhiaTransporteRecordDto;
import ViagensETurismo.models.CompanhiaTransporte;
import ViagensETurismo.models.Veiculo;
import ViagensETurismo.repositories.CompanhiaTransporteRepository;

@Service
public class CompanhiaTransporteService {

    @Autowired
    private CompanhiaTransporteRepository companhiaTransporteRepository;
    @Autowired
    VeiculoService veiculoService;
    

    public CompanhiaTransporte save(CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
         
        var companhiaTransporte = new CompanhiaTransporte();

        BeanUtils.copyProperties(companhiaTransporteRecordDto, companhiaTransporte);
        
        List<Veiculo> veiculos = new ArrayList<>();
        
        for (Veiculo veiculo : companhiaTransporteRecordDto.veiculos()) {
            Optional<Veiculo> optionalVeiculo = veiculoService.findById(veiculo.getId());
            optionalVeiculo.ifPresent(veiculos::add);
        }
        companhiaTransporte.setVeiculos(veiculos);
        return companhiaTransporteRepository.save(companhiaTransporte);
    }

}
