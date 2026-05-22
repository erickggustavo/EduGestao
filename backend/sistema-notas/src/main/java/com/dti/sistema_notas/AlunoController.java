package com.dti.sistema_notas;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// @RestController indica que esta classe é um controller REST
@RestController
@RequestMapping("/api/alunos") // Todas as URLs começam com /api/alunos
@CrossOrigin(origins = "http://localhost:3000") // Permite conexão com React
public class AlunoController {

    // Cria uma instância de Turma para gerenciar os alunos
    private Turma turma = new Turma();
    
    // ENDPOINT POST: Recebe dados para criar novo aluno
    @PostMapping
    public String adicionarAluno(@RequestBody Aluno aluno){
        try {
            turma.adicionarAlunos(aluno); // Adiciona aluno à turma
            return "Aluno adicionado com sucesso!!!";
        } catch(Exception e) {
            return "Erro: " + e.getMessage(); // Retorna mensagem de erro
        }
    }   
    
    // ENDPOINT GET: Retorna lista de todos os alunos
    @GetMapping 
    public ArrayList<Aluno> listarAlunos() {
        return turma.getListaAlunos();
    }
    
    // ENDPOINT GET: Retorna estatísticas completas da turma
    @GetMapping("/estatisticas")
    public Map<String, Object> getEstatisticas() {
        Map<String, Object> estatisticas = new HashMap<>();
        
        // Popula o Map com todos os dados estatísticos
        estatisticas.put("totalAlunos", turma.getListaAlunos().size());
        estatisticas.put("mediaGeralTurma", turma.calcularMediaTurmaGeral());
        estatisticas.put("mediasPorDisciplina", turma.calcularMediaPorDisciplina());
        
        // Converte lista de alunos para lista de nomes (acima da média)
        List<String> nomesAcimaMedia = new ArrayList<>();
        for (Aluno aluno : turma.getAlunosAcimaDaMedia()) {
            nomesAcimaMedia.add(aluno.getNomeAluno());
        }
        estatisticas.put("alunosAcimaMedia", nomesAcimaMedia);
        
        // Converte lista de alunos para lista de nomes (frequência baixa)
        List<String> nomesFrequenciaBaixa = new ArrayList<>();
        for (Aluno aluno : turma.getAlunosFrequenciaBaixa()) {
            nomesFrequenciaBaixa.add(aluno.getNomeAluno());
        }
        estatisticas.put("alunosFrequenciaBaixa", nomesFrequenciaBaixa);
        
        return estatisticas; // Retorna JSON com todas as estatísticas
    }
}