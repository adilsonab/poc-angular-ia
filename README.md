# Angular e desenvolvimento com IA

Frontend Angular 21 com Signals, componentes standalone, OnPush, zoneless e
Vitest. A tela permite criar e listar tarefas; não inclui conclusão, edição ou
remoção. O estado persistente é mantido pelo backend Quarkus/Funqy e PostgreSQL
no repositório irmão `poc-quarkus-funqy-ia`.

## Pré-requisitos

- Docker Desktop em execução.
- VS Code com as extensões **Dev Containers** e **GitHub Copilot** e acesso
  ao Copilot habilitado.
- Internet para obter a imagem, as dependências e as extensões.

Não é necessário instalar ou atualizar Node.js, npm ou Angular no Windows.

### Windows com WSL

Para melhor desempenho, mantenha o projeto no sistema de arquivos do Ubuntu,
por exemplo em `~/projetos/poc-angular-ia`, em vez de `/mnt/c`. Ative a
integração do Ubuntu em **Docker Desktop > Settings > WSL Integration** e
instale também a extensão **WSL** no VS Code.

No PowerShell, abra o Ubuntu com `wsl -d Ubuntu`. No terminal do Ubuntu,
acesse a pasta do projeto e abra o VS Code:

```sh
cd ~/projetos/poc-angular-ia
code .
```

Em seguida, abra o projeto no Dev Container conforme as instruções abaixo.
O Ubuntu é o ambiente WSL que hospeda o projeto; o container continua usando
a imagem `node:24-bookworm`, baseada no Debian, com Node.js já instalado.
O Docker Desktop mantém sua própria distribuição WSL para o engine.

## Abrir e executar

### Backend

1. Abra `../poc-quarkus-funqy-ia` em outra janela do VS Code e execute
   **Dev Containers: Reopen in Container**.
2. No terminal do Dev Container do backend, inicie o Quarkus:

   ```sh
   ./mvnw quarkus:dev
   ```

   O PostgreSQL 17 é iniciado pelo Compose e o Liquibase prepara o schema.
   O backend encaminha a porta 8080 para o host.

### Frontend

1. Abra esta pasta como raiz do projeto no VS Code.
2. Na paleta (`Ctrl+Shift+P`), execute **Dev Containers: Reopen in Container**.
   Aguarde a criação do container e o `npm ci` automático. Os arquivos do
   projeto permanecem na pasta local.
3. No terminal **dentro do container**, execute:

   ```sh
   npm start -- --host 0.0.0.0
   ```

4. Abra `http://localhost:4200`. O VS Code encaminha a porta 4200.
   Encerre o servidor com `Ctrl+C`.

O frontend chama `http://localhost:8080/listTasks` e
`http://localhost:8080/createTask`; por isso, mantenha o backend em execução.
O CORS do backend permite as origens locais `localhost:4200` e
`127.0.0.1:4200`.

Para validar no mesmo terminal:

```sh
npm run build
npm test -- --watch=false
```

Após alterar `package.json` e o lockfile, execute novamente `npm ci` no
container. Caso a criação do container falhe, consulte o log do Dev Containers.
O repositório e os dados permanecem na máquina; o container é apenas ambiente
de desenvolvimento.

## Rules, MCP e skills

- **Rules:** [`.github/copilot-instructions.md`](.github/copilot-instructions.md)
  contém as instruções compartilhadas do projeto.
- **MCP:** [`.vscode/mcp.json`](.vscode/mcp.json) inicia a CLI instalada
  no projeto, usando Node do Dev Container. Após abrir no container, execute
  **MCP: List Servers**, selecione `angular-cli` e inicie-o. Em seguida,
  habilite suas ferramentas no chat, se necessário. Conforme a versão do
  VS Code e o tipo de sessão, a configuração do editor é encaminhada ao
  Copilot; se o servidor não aparecer, consulte
  [a documentação de configuração MCP](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).
  O servidor não é somente leitura: revise as solicitações de execução de
  ferramentas antes de autorizá-las. Para restringi-lo, acrescente
  `--read-only` ao array `args`; isso desabilita ferramentas que alteram o
  projeto.
- **Skills:** as cópias oficiais estão em
  [`.agents/skills/angular-developer/`](.agents/skills/angular-developer/)
  e [`.agents/skills/angular-new-app/`](.agents/skills/angular-new-app/).
  O instalador atual usa `.agents/skills`, reconhecida pelo VS Code, em vez
  de `.github/skills`. [`skills-lock.json`](skills-lock.json) registra a
  revisão instalada. Leia e revise as instruções antes de usá-las.

Para reinstalar ou atualizar as skills, execute no terminal do container:

```sh
npx --yes skills add https://github.com/angular/skills --agent github-copilot --skill angular-developer angular-new-app --copy -y
```

O comando acessa a internet e pode instalar uma revisão mais recente; revise
as alterações e o lockfile antes de compartilhá-las. `--copy` evita depender
de links simbólicos no Windows.

## Tutorial: Rules, Agent Skills, MCP e migração com Spec Kit

A pasta [`prompts/`](prompts/) contém três prompts numerados para reproduzir
este exemplo e estudar uma evolução controlada:

1. [01-recriar-poc.md](prompts/01-recriar-poc.md): gera o frontend de tarefas
   com Angular 21.2 e configura as três formas de instrução de IA deste projeto:
   Rules, Agent Skills e MCP do Angular. Não atualiza nem amplia o projeto.
2. [02-instalar-speckit.md](prompts/02-instalar-speckit.md): instala o Specify CLI,
   inicializa a integração GitHub Copilot e cria/revisa o AS-IS da versão atual,
   protegendo os arquivos e customizações existentes.
3. [03-migrar-stack.md](prompts/03-migrar-stack.md): usa o AS-IS como
   referência para especificar a versão desejada, planejar migrations e validar
   a atualização do Angular e do toolchain, com revisão humana entre etapas.

### Como usar o Spec Kit neste projeto

Este repositório demonstra um percurso em três momentos:

1. **01-recriar-poc — baseline e recursos de IA:** cria o projeto, as Rules, as Agent
   Skills e o MCP sem atualizar versões.
2. **02-instalar-speckit — instalação e AS-IS:** instala o Spec Kit e registra o estado
   confirmado da baseline antes de uma mudança.
3. **03-migrar-stack — TO-BE e migração:** compara a baseline AS-IS com a próxima
   versão desejada, planeja as migrations e executa somente após revisão.

Abra a raiz do projeto no VS Code, entre no Dev Container e use o prompt 02 no
chat do Copilot para instalar e inicializar o Spec Kit. A inicialização em um
repositório existente pode exigir `--force`; essa opção pode substituir
arquivos gerenciados, portanto revise conflitos e mantenha um baseline
revisável antes de autorizá-la. Não aceite uma sobrescrita de rules, skills ou
configuração MCP sem entender a diferença.

### Baseline AS-IS

A baseline atual está documentada em
[`specs/001-baseline-asis/spec.md`](specs/001-baseline-asis/spec.md), com a
validação em
[`specs/001-baseline-asis/checklists/requirements.md`](specs/001-baseline-asis/checklists/requirements.md).
Esse artefato registra o comportamento, os contratos HTTP, a stack Angular,
as customizações de IA e os gates de build/testes antes de uma mudança. Ele
não cria uma especificação retroativa de código novo e não autoriza nenhuma
modernização.

### Migração TO-BE já realizada

Esta versão foi migrada da baseline Angular 21 para Angular 22.3.0 em
2026-11-24. Os artefatos do objetivo estão em
[`specs/002-angular-22-latest/spec.md`](specs/002-angular-22-latest/spec.md),
com plano em
[`specs/002-angular-22-latest/plan.md`](specs/002-angular-22-latest/plan.md)
e tarefas em
[`specs/002-angular-22-latest/tasks.md`](specs/002-angular-22-latest/tasks.md).

Versões verificadas:

| Tecnologia | AS-IS | TO-BE |
| --- | --- | --- |
| Angular, CLI e build | 21.2.x / 21.2.30 | 22.3.0 |
| Node.js | 24.22.3 | 24.22.3 |
| npm | 11.19.1 | 11.19.1 |
| TypeScript | 5.9.3 | 6.0.3 |
| RxJS | 7.8.2 | 7.8.2 |
| Vitest | 4.1.12 | 5.1.1 |
| jsdom | 27.0.1 | 31.0.1 |
| tslib | versão 2.3.x anterior | 2.9.1 |

O resultado foi validado em 2026-11-24:

```sh
npm ci --no-audit --no-fund
npm run build
npm test -- --watch=false
```

- `npm ci`: concluído.
- `npm run build`: concluído.
- `npm test -- --watch=false`: 1 arquivo de testes passou e 3 testes passaram.
- As chamadas GET/POST do frontend não mudaram.
- Standalone, OnPush, zoneless e Signals foram preservados.
- A configuração Angular voltou a usar templates estritos.
- Não foram adicionados Zone.js ou NgModules.
- Rules, Agent Skills, MCP e Spec Kit foram preservados.

### Tutorial completo para iniciantes

Execute os passos em ordem. Faça alterações somente dentro do Dev Container
e mantenha o backend separado em execução quando testar a interface.

#### Passo 1 — Criar a baseline e os recursos de IA

1. Abra o workspace em branco no VS Code.
2. Abra o projeto no Dev Container.
3. Cole no chat do Copilot o conteúdo de
   [`prompts/01-recriar-poc.md`](prompts/01-recriar-poc.md).
4. Confira a criação de:
   `.github/copilot-instructions.md` (Rules);
   `.agents/skills/angular-developer/` e
   `.agents/skills/angular-new-app/` (Agent Skills);
   `.vscode/mcp.json` (MCP angular-cli).
5. Revise as diferenças; não aceite versões de skills mais recentes sem querer
   atualizar a baseline.
6. Execute `npm ci`, `npm run build` e
   `npm test -- --watch=false`.

#### Passo 2 — Instalar o Spec Kit e salvar o AS-IS

1. Confirme que o backend não é alterado e que o Git está limpo ou revisável.
2. Cole no chat do Copilot o conteúdo de
   [`prompts/02-instalar-speckit.md`](prompts/02-instalar-speckit.md).
3. Instale `uv` e o Spec Kit conforme a saída oficial, por exemplo:

   ```sh
   curl -LsSf https://astral.sh/uv/install.sh | sh
   export PATH="$HOME/.local/bin:$PATH"
   uv tool install specify-cli
   specify version
   ```

4. Inicialize na pasta existente sem usar `--force` antes de revisar colisões:

   ```sh
   specify init --here --integration copilot --non-interactive --ignore-agent-tools
   ```

5. Preencha a constitution confirmada em
   `.specify/memory/constitution.md`.
6. Execute no chat do Copilot:
   `/speckit-specify`, `/speckit-plan`, `/speckit-tasks` e
   `/speckit-analyze`, conforme a etapa de documentação AS-IS.
7. Confirme os artefatos em
   `specs/001-baseline-asis/spec.md` e
   `specs/001-baseline-asis/checklists/requirements.md`.
8. Crie um commit desse ponto antes de iniciar a migração.

#### Passo 3 — Definir o TO-BE e migrar

1. Escolha o destino da versão e registre a escolha no prompt.
2. Cole no chat do Copilot o conteúdo de
   [`prompts/03-migrar-stack.md`](prompts/03-migrar-stack.md).
3. Consulte a AS-IS e faça `/speckit-specify` para criar o TO-BE.
4. Use `/speckit-clarify` somente para dúvidas que alterem o risco ou o escopo.
5. Use `/speckit-plan`, `/speckit-tasks` e `/speckit-analyze`.
6. Execute a migração oficial somente após revisão. O exemplo realizado usou:

   ```sh
   npx --yes @angular/cli@22.3.0 update \
     @angular/core@22.3.0 @angular/cli@22.3.0 --allow-dirty
   npm install --save-dev vitest@5.1.1 jsdom@31.0.1 prettier@3.8.1
   npm install tslib@^2.9.1
   npm ci --no-audit --no-fund
   npm run build
   npm test -- --watch=false
   ```

7. Revise `package.json`, `package-lock.json`, `angular.json`, `tsconfig*.json`
   e o diff gerado pelos schematics.
8. Use `/speckit-converge` até não restarem lacunas ou até elas serem
   explicitamente registradas.
9. Atualize o README com versões anteriores, versões novas, migrations,
   comandos, resultados e rollback.
10. Faça commit e push somente depois que build e testes estiverem verdes.

Depois, trabalhe no chat do Copilot (não no terminal) e execute as skills do
Spec Kit separadamente, revisando o resultado de cada etapa:

1. `/speckit-constitution` registra princípios confirmados que orientarão o
   trabalho futuro. Faça isso uma vez após a instalação.
2. Para cada mudança, `/speckit-specify` define o resultado e os critérios de
   aceite; `/speckit-clarify` resolve dúvidas; `/speckit-plan` planeja a
   solução; `/speckit-tasks` divide o trabalho; `/speckit-analyze` procura
   inconsistências.
3. Revise os artefatos antes de autorizar `/speckit-implement`. Ao terminar,
   use `/speckit-converge` e repita implementação/convergência se houver
   lacunas.

Os nomes dos comandos e a sintaxe da integração podem mudar conforme a versão
instalada; confirme os comandos disponíveis no chat e na documentação oficial.
As rules orientam o agente, as skills fornecem instruções especializadas e o
MCP Angular pode consultar boas práticas/documentação e operar a CLI quando
suas ferramentas estiverem habilitadas. Esses recursos não substituem a
especificação, a revisão humana ou a execução de build e testes. O prompt 03
explicita como usá-los para uma atualização: verificar matrizes e migrations
oficiais, planejar etapas compatíveis e preservar o comportamento existente.

Consulte o [repositório do Spec Kit](https://github.com/github/spec-kit) e o
[guia de adoção em projetos existentes](https://github.github.io/spec-kit/how-to/existing-projects.html)
para conferir instruções atualizadas. O Spec Kit organiza o desenvolvimento
orientado por especificação; ele não atualiza versões automaticamente.

### Verificar no Copilot

No chat do VS Code, escolha uma sessão com agente e confira o servidor
`angular-cli` e suas ferramentas. Experimente:

> Consulte as boas práticas do Angular usando o MCP, explique como a lista
> usa Signals e rode o build e os testes.

Observe as chamadas de ferramentas e as referências exibidas no chat:
nem toda solicitação ativa automaticamente uma skill ou uma ferramenta MCP.
Para verificar as skills disponíveis, use **Chat: Open Customizations**.

## Roteiro de estudo

1. Leia o `SKILL.md` de `angular-new-app` para entender a criação de projetos.
2. Leia o `SKILL.md` de `angular-developer` e, conforme o tema, os arquivos
   da subpasta `references`, especialmente Signals, componentes e testes.
3. Peça ao Copilot: “Explique as decisões da skill angular-new-app e compare-as
   com este projeto”.
4. Peça: “Usando angular-developer, revise a lista de tarefas e explique
   possíveis melhorias antes de alterar o código”.
5. Implemente uma melhoria pequena e execute o build e os testes.

Fontes: [skills oficiais](https://github.com/angular/skills),
[MCP da Angular CLI](https://angular.dev/ai/mcp) e
[Agent Skills no VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).

Use somente dados fictícios em prompts, exemplos e pesquisas externas;
revise a política institucional antes de compartilhar código ou dados com
serviços de IA.
