package viagens_e_turismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.EnderecoRecordDto;
import viagens_e_turismo.dtos.HotelPacoteDto;
import viagens_e_turismo.dtos.PacoteRecordDto;
import viagens_e_turismo.dtos.ReservaRecordDto;
import viagens_e_turismo.dtos.TransportePacoteDto;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.HotelPacote;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.models.Reserva;
import viagens_e_turismo.models.TransportePacote;
import viagens_e_turismo.repositories.ReservaRepository;


@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PacoteService pacoteService;


    public List<Reserva> save(ReservaRecordDto reservaRecordDto){    
        List<Reserva> reservas = new ArrayList<Reserva>();
        for( int i = 0 ; i < reservaRecordDto.quantidade(); i++){

            var reserva = new Reserva();
            BeanUtils.copyProperties(reservaRecordDto, reserva);

            Optional<Cliente> optionalCliente = clienteService.findById(reservaRecordDto.cliente().getId());
            if(optionalCliente.isPresent()){
                reserva.setCliente(optionalCliente.get());
            }else {
                throw new RuntimeException("Cliente com ID: " + reservaRecordDto.cliente().getId() + " não encontrado.");
            } 

            Optional<Pacote> optionalPacote = pacoteService.findById(reservaRecordDto.pacote().getId());
            if(optionalPacote.isPresent()){
                reserva.setPacote(optionalPacote.get());
            }else {
                throw new RuntimeException("Pacote com ID: " + reservaRecordDto.pacote().getId() + " não encontrado.");
            } 
            
            reservaRepository.save(reserva);
            reservas.add(reserva);
            
            Pacote pacote = reserva.getPacote();
            pacote.setVagas(pacote.getVagas()-1);

            PacoteRecordDto pacoteRecordDto = toDto(pacote);
            pacoteService.update(pacote.getId(),pacoteRecordDto);

        }
        return reservas;
    }

public PacoteRecordDto toDto(Pacote pacote) {
    EnderecoRecordDto enderecoSaidaDto = new EnderecoRecordDto(
        pacote.getEnderecoSaida().getId(),
        pacote.getEnderecoSaida().getCep(),
        pacote.getEnderecoSaida().getUf(),
        pacote.getEnderecoSaida().getCidade(),
        pacote.getEnderecoSaida().getBairro(),
        pacote.getEnderecoSaida().getRua(),
        pacote.getEnderecoSaida().getNumero(),
        pacote.getEnderecoSaida().getPontoReferencia()
    );

    EnderecoRecordDto enderecoDestinoDto = new EnderecoRecordDto(
        pacote.getEnderecoDestino().getId(),
        pacote.getEnderecoDestino().getCep(),
        pacote.getEnderecoDestino().getUf(),
        pacote.getEnderecoDestino().getCidade(),
        pacote.getEnderecoDestino().getBairro(),
        pacote.getEnderecoDestino().getRua(),
        pacote.getEnderecoDestino().getNumero(),
        pacote.getEnderecoDestino().getPontoReferencia()
    );

    List<HotelPacoteDto> hotelPacoteDtos = new ArrayList<>();
    for (HotelPacote hotelPacote : pacote.getHotelPacote()) {
        HotelPacoteDto hotelPacoteDto = new HotelPacoteDto(
            hotelPacote.getId(),
            hotelPacote.getHotel(),
            hotelPacote.getTipoDiaria(),
            hotelPacote.getQtdDiarias(),
            hotelPacote.getDataEntrada()
        );
        hotelPacoteDtos.add(hotelPacoteDto);
    }

    List<TransportePacoteDto> transportePacoteDtos = new ArrayList<>();
    for (TransportePacote transportePacote : pacote.getTransportePacote()) {
        TransportePacoteDto transportePacoteDto = new TransportePacoteDto(
            transportePacote.getId(),
            transportePacote.getVeiculo(),
            new EnderecoRecordDto(
                transportePacote.getEnderecoSaida().getId(),
                transportePacote.getEnderecoSaida().getCep(),
                transportePacote.getEnderecoSaida().getUf(),
                transportePacote.getEnderecoSaida().getCidade(),
                transportePacote.getEnderecoSaida().getBairro(),
                transportePacote.getEnderecoSaida().getRua(),
                transportePacote.getEnderecoSaida().getNumero(),
                transportePacote.getEnderecoSaida().getPontoReferencia()
            ),
            new EnderecoRecordDto(
                transportePacote.getEnderecoChegada().getId(),
                transportePacote.getEnderecoChegada().getCep(),
                transportePacote.getEnderecoChegada().getUf(),
                transportePacote.getEnderecoChegada().getCidade(),
                transportePacote.getEnderecoChegada().getBairro(),
                transportePacote.getEnderecoChegada().getRua(),
                transportePacote.getEnderecoChegada().getNumero(),
                transportePacote.getEnderecoChegada().getPontoReferencia()
            )
        );
        transportePacoteDtos.add(transportePacoteDto);
    }

    return new PacoteRecordDto(
        pacote.getId(),
        pacote.getNome(),
        pacote.getDescricao(),
        enderecoSaidaDto,
        pacote.getDataSaida(),
        pacote.getHoraSaida(),
        enderecoDestinoDto,
        pacote.getDataChegada(),
        pacote.getHoraChegada(),
        hotelPacoteDtos,
        transportePacoteDtos,
        pacote.getVagas(),
        pacote.getValorTotal()
    );
}


    public Optional<Reserva> findById(int id){
        return reservaRepository.findById(id);
    }


    public void excluirReservasPorCliente(Cliente cliente) {
        List<Reserva> reservas = reservaRepository.findByCliente(cliente);
        reservaRepository.deleteAll(reservas);
    }

    public List<Reserva> findAll(){
        return reservaRepository.findAll();
    }

    public List<Reserva> findByCliente(int idCliente){
        Optional<Cliente> cliente = clienteService.findById(idCliente);
        if(!cliente.isPresent()){
            throw new EntityNotFoundException("Cliente não encontrado com o ID: " + idCliente);
        }
        return reservaRepository.findByCliente(cliente.get());
    }

    public void delete(int id){
        Reserva reserva = findById(id).orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada com o ID: " + id));
        
        Pacote pacote = reserva.getPacote();
        pacote.setVagas(pacote.getVagas()+1);
        PacoteRecordDto pacoteRecordDto = toDto(pacote);
        pacoteService.update(pacote.getId(),pacoteRecordDto);
        
        reservaRepository.delete(reserva);
    }
   
    public Float getGanhoTotal(){
        return reservaRepository.getGanhoTotal();
    }
}
