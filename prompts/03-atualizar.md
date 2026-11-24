# Prompt 03 — Definir o TO-BE e migrar tecnologias

Use depois da instalacao e revisao do Spec Kit pelo [prompt 02](./02-speckit.md).
Use o AS-IS criado no prompt 02 como referencia da versao atual. Execute o
fluxo no chat do Copilot, uma etapa por vez, revendo e aprovando cada artefato
antes de prosseguir.

```text
Quero atualizar de forma controlada as tecnologias deste projeto, incluindo
Angular e dependencias relacionadas, para versoes estaveis atuais compativeis.
Comece pela especificacao e planejamento; nao altere arquivos nem instale
pacotes ate eu revisar e aprovar os artefatos do Spec Kit.

A especificacao criada nesta etapa sera o TO-BE: descreva a versao desejada
como um delta sobre a baseline AS-IS em
specs/001-baseline-asis/spec.md, preservando o comportamento necessario e
registrando deliberadamente as mudancas de tecnologia, compatibilidade e
validacao. Nao trate o AS-IS como se fosse um objetivo novo.

Inspecione o estado atual do repositorio, package.json/lockfile, angular.json,
tsconfig, testes e Dev Container. A baseline e Angular 21.2.x, Node 24, npm,
TypeScript 5.9.x, RxJS 7.8.x e Vitest 4.x; confirme nos arquivos, nao trate
essa lista como substituta da inspecao.

Use informacao atual e verificavel: guia oficial de atualizacao do Angular,
notas de versao e matriz oficial de compatibilidade Angular/Node/TypeScript/RxJS,
documentacao oficial das ferramentas e, se estiver disponivel, MCP angular-cli
(por exemplo, get_best_practices, search_documentation e list_projects).
Consulte documentacao oficial para as demais tecnologias. Cite as fontes e
datas/versoes consultadas. Nao presuma que o MCP esta ativo nem que consultou
uma ferramenta sem executa-la.

Limites e criterios:
- Preserve a funcionalidade de listar e criar tarefas, os endpoints e o
  contrato do backend Quarkus/Funqy, a estrutura do repositorio, as instrucoes,
  skills e MCPs atuais. Nao migre nem altere o backend.
- Atualize Angular CLI, framework, compiler e demais pacotes Angular em
  conjunto, respeitando a sequencia de migrations oficiais quando necessaria.
  Inclua TypeScript, RxJS, Vitest, Node/npm e ferramentas de build apenas quando
  a compatibilidade e o beneficio estiverem comprovados.
- Nao escolha automaticamente versoes major diferentes sem avaliar breaking
  changes, suporte, compatibilidade e custo. Identifique separadamente
  atualizacoes obrigatorias para compatibilidade e atualizacoes opcionais.
- Mantenha standalone, OnPush, zoneless, Signals, TypeScript estrito e Vitest;
  nao adicionar Zone.js ou NgModules. Nao introduza funcionalidades novas.
- Use migrations/schematics oficiais em vez de substituicoes textuais manuais
  sempre que existirem. Preserve lockfile coerente e reveja cada mudanca.
- A validacao deve incluir build e testes; adicione verificacoes de lint,
  formatacao ou auditoria somente se ja fizerem parte das convencoes do repo.
  Nao esconda falhas nem reporte sucesso sem executar os comandos.

Conduza o Spec Kit em etapas e pare para revisao entre elas:
1. `/speckit-specify`: especifique uma atualizacao de compatibilidade e
   seguranca, com escopo, restricoes, criterios de aceite e comportamento que
   deve permanecer igual. Liste duvidas sobre alvo e janela de manutencao.
2. `/speckit-clarify`: resolva as duvidas com perguntas objetivas; nao decida
   por mim quando houver escolhas de produto ou risco significativo.
3. `/speckit-plan`: proponha uma sequencia incremental de atualizacao, matriz de
   versoes compativeis, migrations oficiais, riscos, rollback e validacao.
   Separe atualizacao do runtime/toolchain da migracao do codigo se isso reduzir
   risco. Nao invente comandos de migracao: confirme-os na documentacao.
4. `/speckit-tasks`: crie tarefas pequenas, verificaveis e ordenadas com seus
   gates de build/testes.
5. `/speckit-analyze`: verifique conflitos entre especificacao, plano e tarefas.

Apresente os artefatos para revisao e aguarde minha aprovacao antes de executar
`/speckit-implement`. Depois da aprovacao, implemente uma etapa por vez, rode
build e testes em cada etapa indicada, e use `/speckit-converge` para procurar
lacunas. Ao final, informe versoes anterior/nova, migrations executadas,
arquivos relevantes, comandos e resultados. Se nao houver informacao oficial
suficiente para uma atualizacao segura, pare e explique a lacuna.

Para esta execucao, use como destino inicial a versao stable mais recente
confirmada no registro npm. Preserve Node 24.22.3; nao troque o Node apenas
para executar a migracao. Confirme TypeScript contra o peer de @angular/build,
align Angular framework/CLI/compiler/build em conjunto e use ng update antes
de edicoes textuais manuais.
```
