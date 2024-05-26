package viagens_e_turismo.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.repositories.CompanhiaTransporteRepository;
import viagens_e_turismo.repositories.PacoteRepository;
import viagens_e_turismo.repositories.TransportePacoteRepository;
import viagens_e_turismo.repositories.VeiculoRepository;

@Service
public class CompanhiaTransporteService {

    @Autowired
    private CompanhiaTransporteRepository companhiaTransporteRepository;
    @Autowired
    private TransportePacoteRepository transportePacoteRepository;
    @Autowired
    private VeiculoRepository veiculoRepository;
    

    public CompanhiaTransporte save(CompanhiaTransporteRecordDto companhiaTransporteRecordDto){
         
        var companhiaTransporte = new CompanhiaTransporte();

        BeanUtils.copyProperties(companhiaTransporteRecordDto, companhiaTransporte);
        return companhiaTransporteRepository.save(companhiaTransporte);
    }

    public Optional<CompanhiaTransporte> findById(int id){
        return companhiaTransporteRepository.findById(id);
    }

     public List<CompanhiaTransporte> findAll(){
        return companhiaTransporteRepository.findAll();
    }


     public void delete(int id){
        CompanhiaTransporte companhiaTransporte = findById(id).orElseThrow(() -> new EntityNotFoundException("Companhia de Transporte não encontrada com o ID: " + id));
        List<Veiculo> veiculos = veiculoRepository.findByCompanhiaTransporte(companhiaTransporte);
        for (Veiculo veiculo : veiculos){
            transportePacoteRepository.deleteAll(transportePacoteRepository.findByVeiculo(veiculo));
        }
       veiculoRepository.deleteAll(veiculos);
       companhiaTransporteRepository.delete(companhiaTransporte);
    }
}
