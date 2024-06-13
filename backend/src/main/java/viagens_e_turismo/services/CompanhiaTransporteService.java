package viagens_e_turismo.services;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.CompanhiaTransporteRecordDto;
import viagens_e_turismo.dtos.VeiculoRecordDto;
import viagens_e_turismo.models.CompanhiaTransporte;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.repositories.CompanhiaTransporteRepository;
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
        CompanhiaTransporte companhiaSalva = companhiaTransporteRepository.save(companhiaTransporte);
        if(companhiaTransporteRecordDto.veiculos() != null){
            for (var veiculoRecordDto : companhiaTransporteRecordDto.veiculos()){
                var veiculo = new Veiculo();
                BeanUtils.copyProperties(veiculoRecordDto, veiculo);
                veiculo.setCompanhiaTransporte(new CompanhiaTransporte());
                veiculo.getCompanhiaTransporte().setId(companhiaSalva.getId());
                veiculoRepository.save(veiculo);
            }
        }
        return companhiaSalva;
    }

    public Optional<CompanhiaTransporte> findById(int id){
        return companhiaTransporteRepository.findById(id);
    }
    
    public List<CompanhiaTransporte> findAll(){
        List<CompanhiaTransporte> companhiaTransportes = companhiaTransporteRepository.findAll();
        return companhiaTransportes;
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

    @Transactional(rollbackFor = Exception.class)
    public CompanhiaTransporte update(int id, CompanhiaTransporteRecordDto companhiaTransporteRecordDto) {
        Optional<CompanhiaTransporte> companhiaTransporteDb = companhiaTransporteRepository.findById(id);

        if (companhiaTransporteDb.isPresent()) {
            CompanhiaTransporte companhiaTransporte = companhiaTransporteDb.get();
            BeanUtils.copyProperties(companhiaTransporteRecordDto, companhiaTransporte);

            Set<Veiculo> veiculosAtuais = new HashSet<>(veiculoRepository.findByCompanhiaTransporte(companhiaTransporte));
            Set<Integer> veiculosIdsRecebidos = new HashSet<>();

            for (VeiculoRecordDto veiculoRecordDto : companhiaTransporteRecordDto.veiculos()) {
                veiculosIdsRecebidos.add(veiculoRecordDto.id());

                var veiculo = new Veiculo();
                BeanUtils.copyProperties(veiculoRecordDto, veiculo);
                veiculo.setCompanhiaTransporte(companhiaTransporte);
                veiculoRepository.save(veiculo);
            }

            for (Veiculo veiculoAtual : veiculosAtuais) {
                if (!veiculosIdsRecebidos.contains(veiculoAtual.getId())) {
                    veiculoRepository.delete(veiculoAtual);
                }
            }

            return companhiaTransporteRepository.save(companhiaTransporte);
            
        }else{
            throw new EntityNotFoundException("Companhia de Transporte " + id + "não encontrado.");
        }
    }
}
