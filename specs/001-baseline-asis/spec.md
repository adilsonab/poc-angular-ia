# Feature Specification: Baseline AS-IS Angular 21

**Feature Branch**: `001-baseline-asis`

**Created**: 2026-11-24

**Status**: Accepted baseline

**Input**: Document the AS-IS baseline of the Angular 21 task-list frontend,
including behavior, API contracts, architecture, dependencies, AI
customizations and validation, without changing implementation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar tarefas (Priority: P1)

Quando o usuário abre a aplicação, o sistema carrega as tarefas persistidas
no backend e mostra o estado de carregamento até concluir a consulta.

**Why this priority**: A consulta é o fluxo principal e permite visualizar o
estado persistente da lista.

**Independent Test**: Abrir a aplicação com o backend disponível e confirmar
que as tarefas retornadas são exibidas como itens de uma lista.

**Acceptance Scenarios**:

1. **Given** o backend disponível com tarefas cadastradas, **When** a página
   é carregada, **Then** o frontend envia uma consulta HTTP GET e exibe as
   tarefas retornadas.
2. **Given** o backend disponível sem tarefas, **When** a consulta termina,
   **Then** o frontend informa que nenhuma tarefa foi adicionada.
3. **Given** o backend indisponível ou uma resposta de erro, **When** a
   consulta termina, **Then** o frontend mostra uma mensagem de alerta sem
   interromper a interface.

---

### User Story 2 - Criar uma tarefa (Priority: P1)

O usuário informa um título no campo da página e adiciona uma tarefa à lista.

**Why this priority**: A criação é a única operação de escrita do frontend
nesta baseline.

**Independent Test**: Preencher o campo com texto válido, enviar o formulário
e confirmar o POST, o corpo enviado e a inclusão da tarefa.

**Acceptance Scenarios**:

1. **Given** um título não vazio, **When** o usuário envia o formulário,
   **Then** o sistema envia o título ao backend e acrescenta a tarefa
   retornada à lista.
2. **Given** um título contendo espaços no início ou no fim, **When** o
   usuário envia o formulário, **Then** o sistema remove os espaços extras
   antes do envio e limpa o campo após o sucesso.
3. **Given** um título vazio ou composto apenas por espaços, **When** o
   usuário envia o formulário, **Then** nenhuma requisição de criação é feita.
4. **Given** uma falha ao criar a tarefa, **When** o backend responde com
   erro, **Then** o sistema mostra uma mensagem de alerta e mantém o campo
   utilizável.

---

### Edge Cases

- Enquanto uma tarefa está sendo salva, o botão de envio fica desabilitado.
- Enquanto a consulta inicial está em andamento, a interface mostra estado de
  carregamento.
- Os itens da lista usam o identificador da tarefa para controle de repetição
  no template.
- Os dados reais não são necessários para executar ou demonstrar a aplicação;
  os testes usam dados fictícios.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST load tasks automatically when the application
  starts.
- **FR-002**: The system MUST send `GET http://localhost:8080/listTasks`.
- **FR-003**: The system MUST interpret the list response as tasks containing
  an numeric `id` and a textual `title`.
- **FR-004**: The system MUST display loading, empty, success and error states
  for task consultation.
- **FR-005**: The system MUST allow a user to submit a task title.
- **FR-006**: The system MUST trim leading and trailing spaces from the title
  before submission.
- **FR-007**: The system MUST send
  `POST http://localhost:8080/createTask` with JSON body `{ "title": "<title>" }`.
- **FR-008**: The system MUST append the task returned by the backend after a
  successful creation.
- **FR-009**: The system MUST prevent submission while a task is being saved
  and prevent submission of an empty title.
- **FR-010**: The system MUST not provide completion, editing, removal,
  authentication or unrelated task features.
- **FR-011**: The frontend MUST run at `http://localhost:4200` and depend on
  the separately hosted backend at `http://localhost:8080`.
- **FR-012**: The frontend MUST use the existing development rules and not
  alter the separate Quarkus/Funqy and PostgreSQL backend.

### Key Entities

- **Task**: A task with numeric `id` and textual `title`.
- **TaskApi**: HTTP adapter responsible for the list and create operations.
- **App**: Standalone root component responsible for loading state, saving
  state, error state and task collection.

## Baseline Technology AS-IS

- Angular 21.2.26 for framework packages and Angular CLI 21.2.30.
- Angular compiler 21.2.26 and compiler CLI 21.2.26.
- TypeScript 5.9.2, RxJS 7.8.0 and tslib 2.3.0.
- npm 11.19.1 and Node.js 24 in the Dev Container.
- Standalone application, zoneless, `ChangeDetectionStrategy.OnPush`,
  Angular Signals, `inject()`, native template control flow and the
  `provideHttpClient()` configuration.
- Vitest 4.0.8 and jsdom 27.0.1 for unit tests.
- Angular application builder and unit-test builder from `@angular/build`.
- Dev Container with Node 24 Debian, automatic `npm ci` and port 4200 forward.
- Copilot rules in `.github/copilot-instructions.md`.
- Angular skills `angular-developer` and `angular-new-app` in
  `.agents/skills`, with revisions recorded in `skills-lock.json`.
- Angular CLI MCP server configured in `.vscode/mcp.json`.
- Spec Kit 1.4.4 with Copilot integration, scripts and templates in
  `.specify`, and slash skills in `.github/skills`.

## API Contracts AS-IS

| Operation | Method | URL | Request | Success response |
| --- | --- | --- | --- | --- |
| List tasks | GET | `http://localhost:8080/listTasks` | No body | `Task[]` |
| Create task | POST | `http://localhost:8080/createTask` | `{ "title": "<title>" }` | `Task` |

The frontend treats HTTP errors as user-visible loading or saving failures.
The backend contract and persistence behavior are owned by the separate
`poc-quarkus-funqy-ia` repository.

## AI Resources AS-IS

- Rules provide shared Angular and security conventions.
- Skills provide scoped Angular creation and development guidance.
- The Angular CLI MCP provides project analysis, documentation and CLI tools.
- Spec Kit provides specification, planning, task, implementation, analysis
  and convergence workflows for future changes.
- AI resources guide and record change work; they do not replace build, test,
  code review or human approval.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A clean baseline installation completes `npm ci` successfully
  inside the Node 24 Dev Container.
- **SC-002**: The production build completes with `npm run build`.
- **SC-003**: The unit suite completes with
  `npm test -- --watch=false`, with all baseline tests passing.
- **SC-004**: Automated coverage verifies list loading, task creation, empty
  title prevention and backend loading failure.
- **SC-005**: No task completion, editing, removal or authentication behavior
  is present in the baseline.
- **SC-006**: The baseline API requests remain exactly the GET and POST URLs
  documented above.

## Assumptions

- The backend `poc-quarkus-funqy-ia` is running locally on port 8080.
- The browser can access both ports 4200 and 8080.
- PostgreSQL and Liquibase are managed by the separate backend repository.
- The baseline describes the repository before the next modernization change.
- Angular package versions may be updated only as part of a separately approved
  TO-BE specification.
- The baseline does not assert institutional policies not already confirmed
  in repository documentation.
