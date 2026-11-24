# Feature Specification: Angular 22 Latest-Stack TO-BE

**Feature Branch**: `002-angular-22-latest`

**Created**: 2026-11-24

**Status**: Ready for planning

**Input**: Upgrade the accepted Angular 21 AS-IS baseline to the latest stable
Angular 22-compatible stack while preserving behavior and the Node 24
toolchain.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Preserve task consultation (Priority: P1)

As a learner, I open the application and verify that its task consultation
behavior is unchanged after the framework update.

**Why this priority**: Listing is the primary read flow in the AS-IS baseline.

**Independent Test**: Start the backend, open the frontend and verify loading,
success and empty states without changing the API contract.

**Acceptance Scenarios**:

1. **Given** the Angular 22 application is running, **When** it initializes,
   **Then** it sends `GET http://localhost:8080/listTasks`.
2. **Given** tasks are returned, **When** rendering finishes, **Then** the
   existing task titles are shown.
3. **Given** the backend is unavailable, **When** the request fails, **Then**
   the existing accessible error message is shown.

### User Story 2 - Preserve task creation (Priority: P1)

As a learner, I create a task and verify that the update preserves trimming,
submission prevention and saving feedback.

**Why this priority**: Creation is the only write flow in the baseline.

**Independent Test**: Run the HTTP test suite and submit a trimmed title.

**Acceptance Scenarios**:

1. **Given** a non-empty title, **When** the form is submitted, **Then** the
   system sends `POST http://localhost:8080/createTask` with `{ "title": "<title>" }`.
2. **Given** a whitespace-only title, **When** submit is requested, **Then**
   no create request is sent.
3. **Given** a successful response, **When** the task is returned, **Then**
   it is appended and the input is cleared.

### User Story 3 - Preserve development resources (Priority: P2)

As a colleague learning the three-prompt workflow, I verify that Rules,
Agent Skills and the Angular MCP remain available after migration.

**Independent Test**: Inspect the existing configuration and demonstrate that
the Angular MCP, Copilot rules and Agent Skills remain discoverable.

**Acceptance Scenarios**:

1. **Given** the migrated repository, **When** configuration is inspected,
   **Then** `.github/copilot-instructions.md`, `.agents/skills` and
   `.vscode/mcp.json` remain present and intentional.
2. **Given** the Spec Kit baseline, **When** a later change is started,
   **Then** the AS-IS and TO-BE artifacts remain separate and reviewable.

### Edge Cases

- The Node 24 Dev Container must remain compatible; do not switch Node majors
  solely for Angular 22.
- Angular 22 package and compiler versions must be aligned.
- The migration must not introduce Zone.js or NgModules.
- The backend repository and HTTP URLs must not change.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST upgrade Angular framework, CLI, compiler and
  build packages to an aligned latest stable Angular 22.3.0 set.
- **FR-002**: The system MUST preserve standalone components, OnPush,
  zoneless operation and Angular Signals.
- **FR-003**: The system MUST use TypeScript 6.0.x because Angular
  `@angular/build` 22.3.0 declares `>=6.0 <6.1`.
- **FR-004**: The system SHOULD preserve Node 24.22.3 and npm 11.19.1 unless
  an official compatibility check requires a change.
- **FR-005**: The system SHOULD update RxJS, Vitest and jsdom only to versions
  proven compatible with Angular 22.3.0 and the existing test builder.
- **FR-006**: The system MUST preserve the GET and POST endpoints and task
  entity shape.
- **FR-007**: The system MUST preserve Rules, Agent Skills, MCP configuration
  and Spec Kit artifacts.
- **FR-008**: The system MUST use official Angular migrations/schematics before
  manual source edits.
- **FR-009**: The system MUST run `npm ci`, `npm run build` and
  `npm test -- --watch=false` after migration.
- **FR-010**: The system MUST not recreate or modify the Quarkus/Funqy backend
  or PostgreSQL database.

### Key Entities

- **AS-IS baseline**: `specs/001-baseline-asis/spec.md`.
- **TO-BE target**: Angular 22.3.0-compatible stack for this application.
- **Task**: numeric `id` and textual `title`.
- **AI resources**: Rules, Agent Skills, Angular MCP and Spec Kit.

## Success Criteria *(mandatory)*

- **SC-001**: Angular reports a consistent 22.3.0 package set.
- **SC-002**: `npm ci` succeeds inside Node 24.
- **SC-003**: `npm run build` succeeds without Zone.js or NgModules.
- **SC-004**: `npm test -- --watch=false` passes all baseline tests.
- **SC-005**: The two HTTP endpoints remain unchanged.
- **SC-006**: Rules, Agent Skills, MCP and Spec Kit paths remain discoverable.
- **SC-007**: The README explains the three prompts and includes verified migration
  commands and outcomes.

## Assumptions

- The latest stable target confirmed on 2026-11-24 is Angular 22.3.0.
- Node 24.22.3 satisfies Angular 22.3.0 (`^24.15.0`).
- The migration should not add features to the task application.
- The user-approved target is the latest stable stack, not only Angular Core.
