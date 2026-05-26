package com.dti.sistema_notas;

import java.util.ArrayList;
import java.util.List;

public class Turma {
    private List<Aluno> alunos = new ArrayList<>();

    // Adiciona o aluno na lista temporária para cálculo
    public void adicionarAlunos(Aluno aluno) {
        this.alunos.add(aluno);
    }

    // Função auxiliar para calcular a média de 1 único aluno
    private double calcularMediaAluno(Aluno aluno) {
        List<Double> notas = aluno.getNotasDoAluno();
        if (notas == null || notas.isEmpty()) return 0.0;
        
        double soma = 0;
        for (Double nota : notas) {
            soma += nota;
        }
        return soma / notas.size();
    }

    // Calcula a média geral da sala
    public double calcularMediaTurmaGeral() {
        if (alunos.isEmpty()) return 0.0;
        
        double somaTurma = 0;
        for (Aluno aluno : alunos) {
            somaTurma += calcularMediaAluno(aluno);
        }
        return somaTurma / alunos.size();
    }

    // Calcula a média de cada uma das 5 disciplinas
    public double[] calcularMediaPorDisciplina() {
        if (alunos.isEmpty()) return new double[]{0, 0, 0, 0, 0};
        
        double[] medias = new double[5];
        int[] contadores = new int[5];

        for (Aluno aluno : alunos) {
            List<Double> notas = aluno.getNotasDoAluno();
            for (int i = 0; i < notas.size() && i < 5; i++) {
                medias[i] += notas.get(i);
                contadores[i]++;
            }
        }

        for (int i = 0; i < 5; i++) {
            if (contadores[i] > 0) {
                medias[i] = medias[i] / contadores[i];
            }
        }
        return medias;
    }

    // Retorna a lista de alunos que estão acima da média da turma
    public List<Aluno> getAlunosAcimaDaMedia() {
        List<Aluno> acimaDaMedia = new ArrayList<>();
        double mediaTurma = calcularMediaTurmaGeral();
        
        for (Aluno aluno : alunos) {
            if (calcularMediaAluno(aluno) > mediaTurma) {
                acimaDaMedia.add(aluno);
            }
        }
        return acimaDaMedia;
    }

    // Retorna a lista de alunos com risco de reprovação por falta (< 75%)
    public List<Aluno> getAlunosFrequenciaBaixa() {
        List<Aluno> frequenciaBaixa = new ArrayList<>();
        for (Aluno aluno : alunos) {
            if (aluno.getFrequencia() < 75.0) { // Considera 75% como limite
                frequenciaBaixa.add(aluno);
            }
        }
        return frequenciaBaixa;
    }
}