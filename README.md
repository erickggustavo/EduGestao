
Sistema de Gestão Escolar - EduGestão 

Descrição do Projeto

Sistema completo Fullstack para gerenciamento de notas e frequência de alunos. Este foi um trabalho para faculdade, mas que também foi de grande serventia para o desenvolvimento das minhas habilidade. Permite a um professor acompanhar o desempenho da turma com estatísticas automáticas, visualização em dashboard moderno e identificação instantânea de alunos que precisam de atenção especial.

⚙️ Instruções para Executar o Sistema

 Pré-requisitos

* Node.js 18+ [Download](https://nodejs.org/)
* Java JDK 21 [Download](https://www.oracle.com/java/technologies/downloads/)
* PostgreSQL 16+ [Download](https://www.postgresql.org/download/)

 1. Configuração do Banco de Dados

Antes de rodar a aplicação, certifique-se de que o PostgreSQL está rodando na sua máquina.

1. Abra o pgAdmin (ou terminal do psql).
2. Crie um novo banco de dados chamado: `escoladti`
3. O sistema criará as tabelas `alunos` e `aluno_notas` automaticamente ao iniciar.
*(Nota: Verifique no arquivo `backend/sistema-notas/src/main/resources/application.properties` se o usuário e senha do banco correspondem à sua instalação local).*

 2. Execução do Backend (Spring Boot)

O projeto utiliza o Maven Wrapper, garantindo a execução sem precisar instalar o Maven globalmente.

```bash
# Terminal 1 - Backend
cd backend/sistema-notas
./mvnw clean spring-boot:run

```

*Verifique se a saída indica a inicialização na porta 8080 e a conexão bem-sucedida ao HikariPool (PostgreSQL).*

 3. Execução do Frontend (React)

```bash
# Terminal 2 - Frontend  
cd frontend
npm install    # Apenas na primeira vez para instalar as dependências
npm start

```

*A aplicação abrirá automaticamente no navegador em `http://localhost:3000`.*

---

 📌 Premissas Assumidas

 Funcionais

1. Notas: 5 disciplinas fixas, notas de 0 a 10, aceita casas decimais.
2. **Frequência:** Percentual de 0% a 100%.
3. **Alerta:** Frequência abaixo de 75% requer atenção especial.
4. **Cálculos:** Médias calculadas e reativas automaticamente pelo sistema.
5. **Gestão:** É possível excluir cadastros incorretos para manter a base limpa.

 Técnicas

1. **Compatibilidade:** Java 21, Node.js 18+.
2. **Comunicação:** API RESTful trafegando dados em formato JSON.
3. **Persistência:** Banco de dados relacional (PostgreSQL) garantindo integridade e salvamento definitivo dos dados.
4. **CORS:** Configurado e liberado para ambiente de desenvolvimento local.

### Arquiteturais

1. **Separação:** Arquitetura client-server com Frontend e Backend independentes.
2. **Mapeamento Objeto-Relacional (ORM):** Uso de JPA/Hibernate para tradução automática de objetos Java para tabelas SQL.
3. **Validação Dupla:** Client-side (melhorando a UX) + Server-side (garantindo a integridade no banco).

---

 🏗️ Decisões de Projeto

| Camada | Decisão | Justificativa e Benefícios |
| --- | --- | --- |
| **Arquitetura** | Frontend/Backend Separados | Maior flexibilidade, deploy independente e escalabilidade do ecossistema. |
| **Banco de Dados** | PostgreSQL + Spring Data JPA | Transição de dados em memória para persistência real, garantindo segurança, consultas eficientes e robustez corporativa. |
| **Interface / UI** | Tailwind CSS + Lucide Icons | Estilização ágil, design responsivo moderno, efeitos de *backdrop-blur* e componentes visualmente ricos. |
| **Código React** | React Hooks (`useState`, `useEffect`, `useMemo`) | Código mais limpo, prevenção de re-renderizações desnecessárias em cálculos de média e controle de estado eficiente. |

---

 ✨ Funcionalidades Implementadas

### Requisitos Obrigatórios

* [x] Cadastro de Alunos com 5 notas e frequência.
* [x] Cálculo Automático de médias individuais.
* [x] Média da Turma por disciplina.
* [x] Identificação de alunos com média acima do geral da turma.
* [x] Identificação de alunos em estado de alerta (frequência < 75%).

### Funcionalidades Extra

* [x] **Persistência de Dados Real:** Integração completa com banco PostgreSQL.
* [x] **Gestão de Registros:** Endpoint REST e botão na interface para Exclusão (DELETE) de alunos.
* [x] **Dashboard Avançado:** Layout com *cards* estatísticos, barras de progresso por disciplina e listas separadas de destaques.
* [x] **Sincronização Automática:** Atualização da tela em tempo real após inserção ou deleção no banco.
* [x] **Tratamento de Erros:** Feedbacks visuais e alertas para falhas de conexão com o servidor.

---

## 🚀 Melhorias Futuras

* [ ] Implementação de Autenticação JWT e painel de login para os professores.
* [ ] Dockerização da aplicação (Frontend + Backend + Banco) em um único `docker-compose`.
* [ ] Criação de testes automatizados unitários (JUnit) e de interface (Jest/React Testing Library).
* [ ] Endpoint para edição (PUT/PATCH) de informações de um aluno já cadastrado.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* **React 18** - Biblioteca UI
* **Tailwind CSS** - Framework de estilização utilitária
* **Lucide React** - Biblioteca de ícones modernos
* **Fetch API** - Comunicação assíncrona HTTP

### Backend

* **Java 21** - Linguagem core
* **Spring Boot 3.5.x** - Framework web
* **Spring Data JPA / Hibernate** - Mapeamento e persistência (ORM)
* **PostgreSQL** - Banco de dados relacional
* **Maven** - Gerenciador de dependências e build

---

**AUTOR:** Erick Gustavo Amaral Oliveira
