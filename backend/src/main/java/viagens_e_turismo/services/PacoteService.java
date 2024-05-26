package viagens_e_turismo.services;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.HotelPacoteDto;
import viagens_e_turismo.dtos.PacoteRecordDto;
import viagens_e_turismo.dtos.TransportePacoteDto;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.models.Hotel;
import viagens_e_turismo.models.HotelPacote;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.models.Reserva;
import viagens_e_turismo.models.TransportePacote;
import viagens_e_turismo.models.Veiculo;
import viagens_e_turismo.repositories.HotelPacoteRepository;
import viagens_e_turismo.repositories.PacoteRepository;
import viagens_e_turismo.repositories.ReservaRepository;
import viagens_e_turismo.repositories.TransportePacoteRepository;

@Service
public class PacoteService {

    @Autowired
    private PacoteRepository pacoteRepository;

    @Autowired
    private HotelService hotelService;

    
    @Autowired
    private TransportePacoteRepository transportePacoteRepository;

    @Autowired
    private HotelPacoteRepository hotelPacoteRepository;
    
    @Autowired
    private ReservaRepository reservaRepository;

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


    public List<Pacote> findAll(){
        return pacoteRepository.findAll();
    }

    public void delete(int id){
        Pacote pacote = findById(id).orElseThrow(() -> new EntityNotFoundException("Pacote não encontrado com o ID: " + id));
        List<HotelPacote> hotelPacotes = hotelPacoteRepository.findByPacote(pacote);
        List<TransportePacote> transportePacotes = transportePacoteRepository.findByPacote(pacote);
        List<Reserva> reservas = reservaRepository.findByPacote(pacote);
        reservaRepository.deleteAll(reservas);
        hotelPacoteRepository.deleteAll(hotelPacotes);
        transportePacoteRepository.deleteAll(transportePacotes);
        pacoteRepository.delete(pacote);
    }
    
}
