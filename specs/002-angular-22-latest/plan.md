# Implementation Plan: Angular 22 Latest-Stack TO-BE

**Branch**: `002-angular-22-latest`

**Date**: 2026-11-24

**Spec**: [spec.md](./spec.md)

**AS-IS**: [001-baseline-asis](../001-baseline-asis/spec.md)

## Summary

Upgrade the frontend to Angular 22.3.0 and compatible TypeScript, build,
testing and runtime packages. Preserve the Angular 21 behavior and architecture,
then validate build and tests.

## Technical Context

- **Language/Version**: TypeScript 6.0.2
- **Framework**: Angular 22.3.0
- **Runtime**: Node 24.22.3
- **Package Manager**: npm 11.19.1
- **HTTP**: Angular HttpClient and existing local endpoints
- **State**: Angular Signals
- **Testing**: Vitest with Angular unit-test builder
- **Platform**: Dev Container, Linux, port 4200

## Constitution Check

- Preserve existing task behavior: pass.
- Preserve standalone/OnPush/zoneless/Signals: pass.
- Preserve strict TypeScript and Vitest: pass.
- Run build and tests: required gate.
- Preserve backend boundaries: pass.
- Preserve Rules, Agent Skills, MCP and Spec Kit: pass.

## Migration Sequence

1. Create a branch and review a clean Git baseline.
2. Run `npx @angular/cli@22.3.0 update @angular/core@22.3.0`
   and `npx @angular/cli@22.3.0 update @angular/cli@22.3.0`
   according to Angular CLI prompts.
3. Update build/compiler/framework packages together.
4. Update TypeScript to 6.0.2 and re-run dependency resolution.
5. Reconcile Vitest/jsdom against `@angular/build` peer metadata.
6. Apply official Angular migrations when the CLI reports them.
7. Run `npm ci`, `npm run build` and tests.
8. Inspect HTTP behavior and AI resource configuration.
9. Update the README with the exact learner steps and observed outcome.

## Rollback

Keep the pre-migration commit/branch intact. If a gate fails, restore the
previous commit or revert only the migration commit, then investigate one
dependency or schematic at a time.

## Project Structure

```text
.agents/skills/       # Angular Agent Skills
.github/              # Copilot rules and Spec Kit skills
.specify/             # Spec Kit constitution and workflow
.vscode/              # Angular MCP configuration
specs/001-baseline-asis/
specs/002-angular-22-latest/
src/app/              # Existing standalone application
package.json
package-lock.json
angular.json
README.md
```
