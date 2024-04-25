package viagens_e_turismo.models;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class HotelPacote implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name="pacote_id")
    @JsonBackReference
    private Pacote pacote;

    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;

    private String tipoDiaria;
    private int qtdDiarias;
    private LocalDate dataEntrada;
}
