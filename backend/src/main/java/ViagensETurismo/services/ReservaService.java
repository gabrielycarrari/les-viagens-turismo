package ViagensETurismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.ReservaRecordDto;
import ViagensETurismo.models.Cliente;
import ViagensETurismo.models.Pacote;
import ViagensETurismo.models.Reserva;
import ViagensETurismo.repositories.ReservaRepository;


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
        }
        return reservas;
    }

    public Optional<Reserva> findById(int id){
        return reservaRepository.findById(id);
    }

}
