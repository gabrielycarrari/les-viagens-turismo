package ViagensETurismo.services;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.CompanhiaTransporteRecordDto;
import ViagensETurismo.models.CompanhiaTransporte;
import ViagensETurismo.repositories.CompanhiaTransporteRepository;

@Service
public class CompanhiaTransporteService {

    @Autowired
    private CompanhiaTransporteRepository companhiaTransporteRepository;

    public CompanhiaTransporte save(CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
         
        var companhiaTransporte = new CompanhiaTransporte();

        BeanUtils.copyProperties(companhiaTransporteRecordDto, companhiaTransporte);
        return companhiaTransporteRepository.save(companhiaTransporte);
    }

    public Optional<CompanhiaTransporte> findById(int id){
        return companhiaTransporteRepository.findById(id);
    }

}
