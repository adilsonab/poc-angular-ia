# Tasks: Angular 22 Latest-Stack TO-BE

**Input**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md)

## Phase 1: Baseline and tooling

- [ ] T001 Confirm clean Git state and preserve the AS-IS commit.
- [ ] T002 Confirm Node 24.22.3, npm 11.19.1 and Angular 21 baseline.
- [ ] T003 Capture baseline `npm run build` and test results.
- [ ] T004 Use Angular CLI MCP and official package metadata to confirm target versions.

## Phase 2: Angular migration

- [ ] T005 Run Angular 22 core and CLI update commands through official schematics.
- [ ] T006 Align `@angular/common`, `compiler`, `forms`, `platform-browser`,
  `router`, `build` and `compiler-cli` to 22.3.0.
- [ ] T007 Update TypeScript to 6.0.2.
- [ ] T008 Reconcile RxJS, Vitest and jsdom with supported peers.
- [ ] T009 Run `npm install` or `npm ci` and review lockfile changes.

## Phase 3: Source and configuration validation

- [ ] T010 Apply available official migrations and review every source diff.
- [ ] T011 Verify no Zone.js or NgModules were introduced.
- [ ] T012 Verify standalone, OnPush, zoneless and Signals remain intact.
- [ ] T013 Verify the two HTTP endpoints and task entity remain unchanged.
- [ ] T014 Verify Rules, Agent Skills, MCP and Spec Kit paths remain present.

## Phase 4: Validation and documentation

- [ ] T015 Run `npm run build` and fix migration failures.
- [ ] T016 Run `npm test -- --watch=false` and fix migration failures.
- [ ] T017 Record installed versions and commands in the migration report.
- [ ] T018 Add the exact beginner workflow to `README.md`.
- [ ] T019 Run `/speckit-analyze` equivalent consistency checks.
- [ ] T020 Commit and push the migration and documentation.
