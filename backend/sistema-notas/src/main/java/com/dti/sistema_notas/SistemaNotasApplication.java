package com.dti.sistema_notas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// Força o Spring a procurar repositórios neste pacote
@EnableJpaRepositories(basePackages = "com.dti.sistema_notas.repository")
// Força o Spring a procurar entidades (@Entity) neste pacote
@EntityScan(basePackages = "com.dti.sistema_notas")
public class SistemaNotasApplication {

    public static void main(String[] args) {
        SpringApplication.run(SistemaNotasApplication.class, args);
    }
}