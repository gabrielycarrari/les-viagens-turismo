package ViagensETurismo.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Pacote")
public class Pacote implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pacote_sequence")
    @SequenceGenerator(name = "pacote_sequence", sequenceName = "pacote_seq", allocationSize = 1)
    private int id;
    private String nome;
    private String descricao;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_saida_id", referencedColumnName = "id")
    private Endereco enderecoSaida;
    private LocalDate dataSaida;
    private LocalTime horaSaida;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_destino_id", referencedColumnName = "id")
    private Endereco enderecoDestino;
    private LocalDate dataChegada;
    private LocalTime horaChegada;


    @OneToMany(mappedBy = "pacote", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HotelPacote> hotelPacote;
    
    @OneToMany(mappedBy = "pacote", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TransportePacote> transportePacote;
    
    private int vagas;
    private float valorTotal;
}
