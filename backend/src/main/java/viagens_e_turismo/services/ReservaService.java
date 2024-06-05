package viagens_e_turismo.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.ReservaRecordDto;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.models.Reserva;
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
        }
        return reservas;
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
        reservaRepository.delete(reserva);
    }
   
    public Float getGanhoTotal(){
        return reservaRepository.getGanhoTotal();
    }
}
