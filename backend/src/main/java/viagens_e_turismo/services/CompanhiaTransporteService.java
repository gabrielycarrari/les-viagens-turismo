package viagens_e_turismo.services;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.repositories.CompanhiaTransporteRepository;

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
