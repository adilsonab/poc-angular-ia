# poc-angular-ia Constitution

## Core Principles

### I. Preserve Existing Behavior
The application remains a frontend example for listing and creating tasks.
Preserve the GET `http://localhost:8080/listTasks` and POST
`http://localhost:8080/createTask` contracts unless a user-approved change
explicitly updates them. Do not add task completion, editing, removal,
authentication, or unrelated features as part of an infrastructure or
toolchain change.

### II. Use Current Angular Architecture
Use standalone components, `ChangeDetectionStrategy.OnPush`, zoneless
change detection and Signals. Prefer `inject()`, `input()`, `output()` and
`model()` over equivalent decorator APIs. Use native control flow and maintain
strict, semantic, accessible TypeScript and HTML. Do not add Zone.js or
NgModules.

### III. Test and Validate
Use Vitest for tests. Run the relevant build and test commands after implementation.
For this project, validate changes with `npm run build` and
`npm test -- --watch=false`. Report actual results without hiding failures.

### IV. Prefer Official and Incremental Migrations
Use Angular CLI migrations and official tooling where available instead of
manual substitutions. Update Angular packages as a compatible set, keep the
lockfile coherent and use small, reviewable changes. Do not assume a newer
major version is safe; verify official compatibility and migration guidance.

### V. Protect Project Knowledge and Data
Run Node, npm, Angular CLI and MCP tools inside the Dev Container. Preserve the
existing Copilot rules, Angular skills and Angular CLI MCP configuration.
Use only fictitious data in examples and do not submit real or sensitive
information to external services. Review community catalogs and third-party
Spec Kit components before enabling them.

## Additional Constraints
The Quarkus/Funqy backend and PostgreSQL database belong to a separate
repository. This project must not recreate or modify them. The Spec Kit process
is used for reviewable specifications, plans, tasks and validation; it does not
automatically change technologies or application behavior.

## Development Workflow
Each feature or modernization starts with a bounded specification and requires
review of requirements and compatibility boundaries. Clarify ambiguous choices,
produce a plan, break it into ordered tasks and analyze consistency before
implementation. Review implementation and generated Spec Kit artifacts together.
Run build and tests after implementation, then converge until remaining gaps
are resolved or explicitly deferred.

## Governance
This constitution supersedes ad hoc project practices for Spec Kit workflows.
Amendments require a reviewed change that records the reason, migration impact
and any affected validation gate. Human approval is required before implementation
of a scoped change.

**Version**: 1.0.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-24
