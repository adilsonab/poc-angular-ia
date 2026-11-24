# Research: Angular 22 Latest-Stack Migration

**Date**: 2026-11-24

## Current Baseline

- Angular framework and CLI: 21.2.x.
- Node: 24.22.3.
- npm: 11.19.1.
- TypeScript: 5.9.3.
- RxJS: 7.8.2.
- Vitest: 4.1.12.
- jsdom: 27.0.1.
- Standalone, OnPush, zoneless application with Signals.

## Official Target Metadata

The npm registry reports Angular 22.3.0 as latest stable:

- `@angular/core@22.3.0`
- `@angular/cli@22.3.0`
- `@angular/build@22.3.0`
- All Angular framework packages aligned at 22.3.0.

Official package metadata reports:

- Node: `^22.22.3 || ^24.15.0 || >=26.0.0`
- TypeScript: `>=6.0 <6.1`
- RxJS peer: `^6.5.3 || ^7.4.0`
- Zone.js remains peer-only and is not required by this zoneless project.

## MCP and Documentation

The Angular CLI MCP:

- lists `poc-angular-ia` as one Angular 21 application;
- retrieves standalone, OnPush, strict TypeScript and native control-flow
  best practices;
- does not find a specific Angular 22 migration page for the tested natural-
  language query.

The migration therefore uses official npm compatibility metadata and Angular
CLI `ng update` schematics, plus a local build/test gate.

## Decision

Update Angular packages to 22.3.0, TypeScript to 6.0.2, RxJS to 7.8.2, Vitest
to a supported 4 or 5 release, and jsdom to the latest compatible release.
Keep Node 24 and npm 11 where Angular 22 and the Dev Container support them.
