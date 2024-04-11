package ViagensETurismo.services;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.VeiculoRecordDto;
import ViagensETurismo.models.Veiculo;
import ViagensETurismo.repositories.VeiculoRepository;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

   
    public Veiculo save(VeiculoRecordDto veiculoRecordDto){
        var veiculo = new Veiculo();
        BeanUtils.copyProperties(veiculoRecordDto, veiculo);
        return veiculoRepository.save(veiculo);
    }

    public Optional<Veiculo> findById(int id){
        return veiculoRepository.findById(id);
    }

}
