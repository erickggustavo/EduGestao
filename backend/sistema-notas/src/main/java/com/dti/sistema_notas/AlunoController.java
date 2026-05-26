package com.dti.sistema_notas;

import com.dti.sistema_notas.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "http://localhost:3000")
public class AlunoController {

    // INJEÇÃO DE DEPENDÊNCIA: O Spring traz o repositório do PostgreSQL para usarmos aqui
    @Autowired
    private AlunoRepository alunoRepository;
    
    // ENDPOINT POST: Recebe dados e salva no banco de dados
    @PostMapping
    public String adicionarAluno(@RequestBody Aluno aluno){
        try {
            // Salva fisicamente na tabela "alunos" do PostgreSQL
            alunoRepository.save(aluno); 
            return "Aluno adicionado com sucesso!!!";
        } catch(Exception e) {
            return "Erro: " + e.getMessage(); 
        }
    }   
    
    // ENDPOINT GET: Retorna lista de todos os alunos direto do banco
    @GetMapping 
    public List<Aluno> listarAlunos() {
        // Faz um "SELECT * FROM alunos" automaticamente
        return alunoRepository.findAll();
    }
    
    // ENDPOINT GET: Retorna estatísticas completas da turma
    @GetMapping("/estatisticas")
    public Map<String, Object> getEstatisticas() {
        Map<String, Object> estatisticas = new HashMap<>();
        
        // 1. Busca todos os alunos salvos no banco
        List<Aluno> alunosNoBanco = alunoRepository.findAll();
        
        // 2. Instancia uma Turma temporária apenas para reaproveitar sua lógica de cálculo
        Turma turmaHelper = new Turma();
        for (Aluno aluno : alunosNoBanco) {
            turmaHelper.adicionarAlunos(aluno);
        }
        
        estatisticas.put("totalAlunos", alunosNoBanco.size());
        
        // 3. Previne erros de divisão por zero caso o banco esteja vazio
        if (!alunosNoBanco.isEmpty()) {
            estatisticas.put("mediaGeralTurma", turmaHelper.calcularMediaTurmaGeral());
            estatisticas.put("mediasPorDisciplina", turmaHelper.calcularMediaPorDisciplina());
            
            List<String> nomesAcimaMedia = new ArrayList<>();
            for (Aluno aluno : turmaHelper.getAlunosAcimaDaMedia()) {
                nomesAcimaMedia.add(aluno.getNomeAluno());
            }
            estatisticas.put("alunosAcimaMedia", nomesAcimaMedia);
            
            List<String> nomesFrequenciaBaixa = new ArrayList<>();
            for (Aluno aluno : turmaHelper.getAlunosFrequenciaBaixa()) {
                nomesFrequenciaBaixa.add(aluno.getNomeAluno());
            }
            estatisticas.put("alunosFrequenciaBaixa", nomesFrequenciaBaixa);
        } else {
            // Valores padrão de segurança se não houver ninguém cadastrado
            estatisticas.put("mediaGeralTurma", 0.0);
            estatisticas.put("mediasPorDisciplina", new double[]{0, 0, 0, 0, 0});
            estatisticas.put("alunosAcimaMedia", new ArrayList<>());
            estatisticas.put("alunosFrequenciaBaixa", new ArrayList<>());
        }

        return estatisticas; 
    }

    // ENDPOINT DELETE: Remove um aluno do banco de dados pelo ID
    @DeleteMapping("/{id}")
    public String deletarAluno(@PathVariable Long id) {
        try {
            // Verifica se o aluno existe antes de tentar deletar
            if (alunoRepository.existsById(id)) {
                alunoRepository.deleteById(id);
                return "Aluno removido com sucesso!";
            } else {
                return "Aluno não encontrado.";
            }
        } catch (Exception e) {
            return "Erro ao remover: " + e.getMessage();
        }
    }
}