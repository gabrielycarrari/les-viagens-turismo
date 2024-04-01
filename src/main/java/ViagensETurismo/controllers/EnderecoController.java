package ViagensETurismo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ViagensETurismo.repositories.EnderecoRepository;

@RestController
public class EnderecoController {
    @Autowired
    EnderecoRepository enderecoRepository;

}
