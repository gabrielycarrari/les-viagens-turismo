package ViagensETurismo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ViagensETurismo.models.CompanhiaTransporte;
import ViagensETurismo.repositories.CompanhiaTransporteRepository;

@Service
public class CompanhiaTransporteService {

    @Autowired
    private CompanhiaTransporteRepository companhiaTransporteRepository;

    public CompanhiaTransporte save(CompanhiaTransporte companhiaTransporte){
        return companhiaTransporteRepository.save(companhiaTransporte);
    }

}
