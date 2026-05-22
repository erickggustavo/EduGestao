Sistema de Gestão Escolar - Professor Carlos

Descrição do Projeto
--Sistema completo para gerenciamento de notas e frequência de alunos, desenvolvido para o processo seletivo da DTI Digital. Permite ao professor Carlos acompanhar o desempenho da turma com estatísticas automáticas e identificação de alunos que precisam de atenção especial.

*Instruções para Executar o Sistema

Pré-requisitos
- Node.js 16+ [Download](https://nodejs.org/)
- Java JDK 8+ [Download](https://www.oracle.com/java/technologies/javase-downloads.html)
- Maven 3.6+ [Download](https://maven.apache.org/)

Execução do Sistema

--1. Backend (Spring Boot)
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run
```
Verifique se a saida é: `Tomcat started on port(s): 8080`

--2. Frontend (React)
```bash
# Terminal 2 - Frontend  
cd frontend
npm install    # Apenas na primeira vez
npm start
```
Verifique se a saida é: `Compiled successfully! Local: http://localhost:3000`

--3. Acesse a Aplicação**
- Abra: http://localhost:3000
- Backend API: http://localhost:8080
---

##Premissas Assumidas**

Funcionais
1. Notas: 5 disciplinas fixas, notas de 0 a 10, aceita decimais
2. Frequência: Percentual de 0% a 100%, aceita decimais
3. Alerta: Frequência abaixo de 75% requer atenção especial
4. Cálculos: Médias calculadas automaticamente pelo sistema
5. Validações: Frontend (UX) + Backend (segurança)

Técnicas
1. Compatibilidade: Java 8+, Node.js 16+
2. Comunicação: API REST JSON entre frontend/backend
3. Persistência: Dados em memória (reinicia com aplicação)
4. CORS: Configurado para desenvolvimento (localhost:3000 → localhost:8080)
  
Arquiteturais
1. Separação: Frontend e backend independentes
2. Stateless: API não mantém estado entre requisições
3. Validação Dupla: Client-side (experiência) + Server-side (segurança)

---

##Decisões de Projeto

Arquitetura e Tecnologias
| Decisão | Justificativa | Benefícios |
|---------|---------------|------------|
| Frontend/Backend Separados | Maior flexibilidade e manutenibilidade | Deploy independente, reutilização de API |
| React + Spring Boot | Stack moderna e mercado | Grande comunidade, documentação rica |
| API REST JSON | Padrão industry | Interoperabilidade, fácil debug |
| Validação Dupla | Segurança + UX | Feedback imediato + proteção de dados |

Design e UX
| Decisão | Implementação | Impacto |
|---------|---------------|---------|
| Validação em Tempo Real | Mensagens de erro dinâmicas | Usuário corrige erros antes de enviar |
| Feedback Visual | Loading states, cores, ícones | Experiência mais intuitiva |
| Design Responsivo | CSS Grid/Flexbox + media queries | Funciona em qualquer dispositivo |
| Cópia Defensiva | `array.clone()`, `new ArrayList<>()` | Previne efeitos colaterais |

 Código e Organização
| Decisão | Exemplo | Vantagem |
|---------|---------|----------|
| Componentes React Puros | `TabelaAlunos({ alunos })` | Reutilização, teste fácil |
| Separação de Responsabilidades | Aluno(domínio) × Turma(regras) × Controller(API) | Manutenção mais fácil |
| Tratamento de Erros Completo | `try/catch` + `finally` + `response.ok` | Sistema resiliente |
| Hooks React Modernos | `useState`, `useEffect` | Código mais limpo e funcional |

Validações e Segurança
| Camada | Validações Implementadas | Propósito |
|--------|--------------------------|-----------|
|Frontend| Notas 0-10, frequência 0-100%, campos obrigatórios | UX - Feedback imediato |
|Backend | `IllegalArgumentException`, cópia defensiva | Segurança - Integridade dos dados |
|Formato | Vírgula/ponto para decimais, trim() em nomes | Flexibilidade do usuário |


## Funcionalidades Implementadas

Requisitos Obrigatórios
- [x] Cadastro de Alunos com 5 notas e frequência
- [x] Cálculo Automático de médias individuais
- [x] Média da Turma por disciplina
- [x] Identificação alunos acima da média da turma  
- [x] Identificação alunos com frequência < 75%

Funcionalidades Extra
- [x] Validações em Tempo Real no frontend
- [x] Interface Responsiva e moderna
- [x] Feedback Visual com loading states
- [x] Tratamento de Erros completo
- [x] Dashboard com estatísticas visuais

---

## Melhorias Futuras

Prioritárias
- [ ] Banco de Dados (H2/PostgreSQL) para persistência
- [ ] Autenticação JWT para múltiplos professores
- [ ] Testes Automatizados (JUnit, React Testing Library)

 Interessantes
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Gráficos interativos (Chart.js)

---

## Tecnologias Utilizadas

Frontend
- React 18 - Biblioteca UI
- CSS3 - Estilização moderna
- HTML5 - Estrutura semântica
- Fetch API - Comunicação HTTP

 Backend
- Spring Boot 2.7 - Framework Java
- Maven - Gerenciamento de dependências
- Jackson - Serialização JSON
- Tomcat - Servidor embutido

---

AUTOR: Erick Gustavo

Desenvolvido para o processo seletivo da DTI Digital
