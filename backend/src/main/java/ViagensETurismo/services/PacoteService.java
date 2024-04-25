package ViagensETurismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.HotelPacoteDto;
import ViagensETurismo.dtos.PacoteRecordDto;
import ViagensETurismo.dtos.TransportePacoteDto;
import ViagensETurismo.models.Endereco;
import ViagensETurismo.models.Hotel;
import ViagensETurismo.models.HotelPacote;
import ViagensETurismo.models.Pacote;
import ViagensETurismo.models.TransportePacote;
import ViagensETurismo.models.Veiculo;
import ViagensETurismo.repositories.PacoteRepository;

@Service
public class PacoteService {

    @Autowired
    private PacoteRepository pacoteRepository;

    @Autowired
    private HotelService hotelService;

    
    @Autowired
    private VeiculoService veiculoService;

    public Pacote save(PacoteRecordDto pacoteRecordDto){
         
        var pacote = new Pacote();
        var enderecoDestino = new Endereco();
        var enderecoSaida = new Endereco();
        var enderecoChegadaTransporte = new Endereco();
        var enderecoSaidaTransporte = new Endereco();

        BeanUtils.copyProperties(pacoteRecordDto, pacote);
        
        List<HotelPacote> hotelPacotes = new ArrayList<>();
        
        
        for (HotelPacoteDto hotelPacoteDto : pacoteRecordDto.hotelPacote()) {
            Optional<Hotel> optionalHotel = hotelService.findById(hotelPacoteDto.hotel().getId());
            if (optionalHotel.isPresent()) {    
                HotelPacote hotelPacote = new HotelPacote();
                hotelPacote.setHotel(optionalHotel.get());
                hotelPacote.setPacote(pacote);
                hotelPacote.setTipoDiaria(hotelPacoteDto.tipoDiaria());
                hotelPacote.setQtdDiarias(hotelPacoteDto.qtdDiarias());
                hotelPacote.setDataEntrada(hotelPacoteDto.dataEntrada());
                hotelPacotes.add(hotelPacote);
            } else {
            throw new RuntimeException("Hotel com ID: " + hotelPacoteDto.hotel().getId() + " não encontrado.");
        } 
        }

        List<TransportePacote> transportePacotes = new ArrayList<>();
        
        for(TransportePacoteDto transportePacoteDto : pacoteRecordDto.transportePacote()){
            Optional<Veiculo> optionalVeiculo = veiculoService.findById(transportePacoteDto.veiculo().getId());
            if(optionalVeiculo.isPresent()){
                TransportePacote transportePacote = new TransportePacote();
                transportePacote.setVeiculo(optionalVeiculo.get());
                transportePacote.setPacote(pacote);
                BeanUtils.copyProperties(transportePacoteDto.enderecoChegada(), enderecoChegadaTransporte);
                transportePacote.setEnderecoChegada(enderecoChegadaTransporte);
                BeanUtils.copyProperties(transportePacoteDto.enderecoSaida(), enderecoSaidaTransporte);
                transportePacote.setEnderecoSaida(enderecoSaidaTransporte);
                transportePacotes.add(transportePacote);
            } else {
                throw new RuntimeException("Veiculo com ID: " + transportePacoteDto.veiculo().getId() + " não encontrado.");
            } 
        }

        BeanUtils.copyProperties(pacoteRecordDto.enderecoDestino(), enderecoDestino);
        pacote.setEnderecoDestino(enderecoDestino);
        BeanUtils.copyProperties(pacoteRecordDto.enderecoSaida(), enderecoSaida);
        pacote.setEnderecoSaida(enderecoSaida);
        pacote.setHotelPacote(hotelPacotes);
        pacote.setTransportePacote(transportePacotes);
        return pacoteRepository.save(pacote);
    }



    public Optional<Pacote> findById(int id){
        return pacoteRepository.findById(id);
    }


}
