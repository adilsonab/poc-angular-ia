# Prompt 02 — Instalar o Spec Kit e registrar o AS-IS

Use depois de criar/revisar a baseline do [prompt 01](./01-recriar.md), com o
repositório aberto na raiz e um baseline revisável. Este prompt instala o
Spec Kit e cria a documentação AS-IS da versão atual. Não implemente nem
modernize uma funcionalidade.

```text
Instale e inicialize o GitHub Spec Kit neste repositorio existente para uso com
GitHub Copilot no VS Code. Nao recrie o projeto nem modifique o codigo da
aplicacao. Antes de agir, leia o README, o estado do Git, .github/ e .agents/,
skills-lock.json, .vscode/mcp.json, package.json, angular.json, src/app e a
documentacao oficial atual do Spec Kit.

1. Verifique os pre-requisitos atuais e a instalacao oficial do Specify CLI
   (Python 3.11+ e uv conforme a documentacao vigente). Trabalhe no ambiente
   apropriado ao projeto sem alterar a imagem do Dev Container ou instalar
   ferramentas globalmente sem necessidade. Se um pre-requisito estiver
   ausente, explique a alternativa segura antes de mudar o ambiente.
2. Instale o CLI conforme a documentacao oficial vigente. A instrucao oficial
   atualmente usa `uv tool install specify-cli`; confirme que continua correta
   antes de executar.
3. Inicialize o Spec Kit na raiz deste repositorio com a integracao GitHub
   Copilot, usando a sintaxe atual (`specify init --here
   --integration copilot`, se ainda for a recomendada). Consulte `--help` e a
   documentacao para confirmar as opcoes.
4. Esta e uma pasta nao vazia. Nao use `--force` automaticamente: a opcao pode
   substituir arquivos gerenciados. Primeiro identifique colisões e liste os
   arquivos que seriam afetados. Se a inicializacao exigir `--force` e houver
   risco de sobrescrita, pare e solicite autorizacao; nao apague, mova ou
   substitua .github/copilot-instructions.md, .agents/skills, skills-lock.json,
   .vscode/mcp.json ou arquivos da aplicacao.
5. Revise os artefatos adicionados pelo Spec Kit e a integracao Copilot. Mantenha
   as Rules, Agent Skills e a configuracao MCP existentes e evite duplicar
   instrucoes.
6. Prepare uma constitution baseada apenas em regras confirmadas no projeto:
   manter as funcionalidades atuais e o contrato do backend; usar componentes
   standalone, OnPush e zoneless sem Zone.js/NgModules; preferir Signals,
   inject() e APIs Angular modernas compativeis com a versao; manter TypeScript
   estrito, acessibilidade e Vitest; executar build e testes; trabalhar no Dev
   Container; nao usar dados reais ou sigilosos.
   Nao invente normas institucionais ou requisitos nao documentados.
7. Nao altere dependencias nem execute modernizacao de codigo. Os comandos do
   AS-IS abaixo sao apenas documentacao da baseline; nao execute o fluxo de
   implementacao de uma funcionalidade.

Depois da inicializacao, crie o AS-IS da baseline, sem alterar codigo:

8. Execute `/speckit-specify` no chat do Copilot com esta finalidade:
   "Documente o AS-IS deste repositorio como baseline da versao atual. Nao
   altere codigo nem proponha funcionalidades novas. Inclua os cenarios de
   listar e criar tarefas, contratos GET/POST, Angular e dependencias atuais,
   standalone/OnPush/zoneless/Signals, Vitest, Dev Container, Rules, Agent
   Skills, MCP Angular e criterios de build/testes."
9. Revise `spec.md` e a checklist gerada. Corrija somente imprecisoes confirmadas
   nos arquivos existentes; nao invente requisitos institucionais.
10. Use `/speckit-plan` e `/speckit-tasks` somente se os artefatos AS-IS
    precisarem ser decompostos em uma tarefa de documentacao revisavel.
11. Execute `/speckit-analyze` para verificar consistencia entre constitution,
    especificacao e checklist. Nao implemente a especificacao AS-IS.
12. Grave explicitamente no README onde estao os artefatos AS-IS e que eles
    representam a versao atual, nao a versao desejada. Nao comece o prompt 03
    antes desta baseline ser revisada e aceita.
```

Referencias oficiais para confirmar os comandos antes de instalar:

- https://github.com/github/spec-kit
- https://github.github.io/spec-kit/how-to/existing-projects.html
