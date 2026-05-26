package com.dti.sistema_notas;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeAluno;
    private double frequencia;

    // O "EAGER" obriga o banco a nunca ter preguiça e sempre carregar as notas junto com o aluno
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "aluno_notas", joinColumns = @JoinColumn(name = "aluno_id"))
    @Column(name = "nota")
    private List<Double> notasDoAluno = new ArrayList<>();

    // Construtor vazio obrigatório para o banco de dados
    public Aluno() {
    }

    // --- GETTERS E SETTERS ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public double getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(double frequencia) {
        this.frequencia = frequencia;
    }

    public List<Double> getNotasDoAluno() {
        return notasDoAluno;
    }

    public void setNotasDoAluno(List<Double> notasDoAluno) {
        this.notasDoAluno = notasDoAluno;
    }

    // A REDE DE PROTEÇÃO: Se o formulário do React enviar apenas "notas", o Java captura e salva aqui!
    public void setNotas(List<Double> notas) {
        this.notasDoAluno = notas;
    }
}