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

## Prompts para estudo

A pasta [`prompts/`](prompts/) contém três prompts numerados para reproduzir
este exemplo e estudar uma evolução controlada:

1. [01 — Recriar a baseline](prompts/01-recriar.md): gera o frontend de tarefas
   com Angular 21.2, as instruções, skills, MCP e Dev Container deste projeto,
   sem adicionar funcionalidades nem atualizar versões.
2. [02 — Instalar o Spec Kit](prompts/02-speckit.md): prepara o Specify CLI e a
   integração GitHub Copilot no repositório existente, protegendo os arquivos e
   customizações que já existem.
3. [03 — Atualizar tecnologias](prompts/03-atualizar.md): usa o fluxo do Spec
   Kit para especificar, planejar e validar a atualização de Angular e do
   toolchain, com revisão antes da implementação.

### Como usar o Spec Kit neste projeto

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
