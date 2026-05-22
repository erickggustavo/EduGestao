// Importa o React
import React from 'react';

// Componente da tabela de alunos
// Recebe a lista de alunos como parâmetro
function TabelaAlunos({ alunos }) {
  
  // O que aparece na tela
  return (
    <div className="tabela-alunos">
      <h2>Lista de Alunos</h2>
      
      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
                     //tabela sera dividida por partes, head = cabeçalho, e body = dados
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Média</th>
              <th>Frequência</th>
              <th>Situação</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                <td>{aluno.media}</td>          
                <td>{aluno.frequencia}%</td>
                <td>{aluno.frequencia < 75 ? '⚠️ Atenção' : '✅ OK'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exporta para usar em outros arquivos
export default TabelaAlunos;