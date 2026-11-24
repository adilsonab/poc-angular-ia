# Prompt 01 — Criar baseline e recursos de IA

Use este prompt em um workspace vazio, com o GitHub Copilot no VS Code e o
Dev Container aberto. O objetivo é criar a versão AS-IS do exemplo e instalar
seus recursos de IA: Rules, Agent Skills e MCP do Angular. Não modernize
tecnologias nem invente requisitos. Se este repositório estiver disponível,
trate os arquivos e o histórico como fonte de verdade.

```text
Crie neste workspace a baseline do projeto de exemplo Angular com IA descrita
abaixo. Antes de editar, inspecione o workspace e as instrucoes ja presentes.
Se o repositorio de referencia estiver disponivel, compare com ele e preserve
seu comportamento. Nao sobrescreva arquivos preexistentes sem apresentar a
colisao e pedir autorizacao.

## Resultado esperado

- Frontend Angular para listar tarefas e criar tarefas.
- A listagem consulta GET http://localhost:8080/listTasks e a criacao usa
  POST http://localhost:8080/createTask. Inspecione o contrato existente do
  backend/referencia antes de definir os tipos e o corpo; nao invente campos.
- A interface roda em http://localhost:4200. O backend Quarkus/Funqy e
  PostgreSQL pertencem a outro repositorio e nao devem ser recriados nem
  alterados.
- A tela permite criar e listar tarefas. Nao acrescente conclusao, edicao,
  remocao, autenticacao ou outras funcionalidades.

## Stack a reproduzir (nao atualizar)

- Angular 21.2.x, TypeScript estrito e RxJS 7.8.x, com versoes coerentes com a
  baseline e lockfile.
- Node 24 no Dev Container e npm; preserve a versao de npm/packageManager
  indicada pela referencia.
- Componentes standalone, ChangeDetectionStrategy.OnPush e aplicacao zoneless;
  nao instalar Zone.js nem criar NgModules.
- Signals para estado local/derivado; prefira computed()/linkedSignal() a
  effect() para sincronizacao. Use inject() e as APIs input()/output()/model().
- Templates semanticos e acessiveis, control flow nativo (@if/@for com track)
  e Vitest para testes.

## Customizacoes de IA a reproduzir

- Rules/instrucoes compartilhadas em .github/copilot-instructions.md,
  incluindo as regras Angular acima, build e testes, uso de Node/npm/CLI/MCP
  dentro do Dev Container e proibicao de dados reais ou sigilosos em exemplos
  e consultas externas.
- Instale as Agent Skills oficiais angular-developer e angular-new-app do
  repositorio
  angular/skills em .agents/skills, em modo de copia. Se a referencia estiver
  disponivel, mantenha a revisao registrada em skills-lock.json; nao atualize
  para outra revisao sem pedir.
- Explique a diferenca entre Rules, Agent Skills e MCP no README final:
  Rules orientam todas as interacoes relevantes; Agent Skills fornecem
  orientacao especializada sob demanda; MCP conecta o agente a ferramentas.
- Configure o MCP angular-cli em .vscode/mcp.json usando a CLI local do
  projeto e o Node do Dev Container. Nao adicione outros servidores MCP nem
  habilite acesso a segredos.
- Preserve a configuracao de Dev Container do projeto: imagem Node 24 Debian,
  npm ci na criacao e encaminhamento da porta 4200, adaptando apenas o que for
  indispensavel.

## Forma de trabalho e validacao

1. Leia README, instrucoes, skills, configuracoes e codigo existentes. Liste
   lacunas e conflitos antes de implementar.
2. Implemente somente o resultado esperado e as configuracoes listadas, usando
   os padroes do projeto e sem alterar o backend.
3. Revise as instrucoes das skills antes de aplica-las. Consulte o MCP
   angular-cli somente se estiver disponivel e ativo; nao presuma que uma
   ferramenta MCP foi executada.
4. Execute npm ci se necessario, npm run build e npm test -- --watch=false
   dentro do Dev Container. Corrija falhas causadas por suas mudancas.
5. Ao final, resuma arquivos criados, decisoes, comandos executados e
   resultados. Informe claramente qualquer ponto que nao pode ser verificado.
```
