# Diretrizes do exemplo Angular

- Use componentes standalone, OnPush e aplicação zoneless; não adicione Zone.js nem NgModules.
- Prefira `inject()` para injeção de dependências.
- Use Signals para estado local e derivado; prefira `computed()` ou `linkedSignal()` a `effect()` para sincronizar estado.
- Prefira `input()`, `output()` e `model()` às APIs baseadas em decorators.
- Para acesso assíncrono a APIs, avalie `resource()` e `httpResource()` conforme a versão do Angular; use RxJS quando adequado a fluxos complexos.
- Use control flow nativo (`@if`, `@for` com `track`, `@switch`, `@defer`) e bindings nativos de classe e estilo.
- Mantenha TypeScript estrito, sem `any`, e HTML semântico e acessível.
- Use Vitest nos testes. Execute testes e build após mudanças.
- Execute Node, npm, Angular CLI e MCP dentro do Dev Container.
- Não inclua dados reais ou sigilosos em exemplos, prompts ou consultas externas.
