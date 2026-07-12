# Postgres Migration Plan

## Purpose

This file explains how to move from a mock/local or lightweight repository setup to a real PostgreSQL-backed backend without rewriting the entire product.

## Migration strategy

### Phase 1

- Frontend uses repositories.
- Repository implementations are local/mock.
- UI and domain logic are stabilized first.[cite:28]

### Phase 2

- Introduce API-backed repository implementations.
- Keep method signatures stable.
- Preserve screen contracts and form contracts.

### Phase 3

- Introduce PostgreSQL schema based on `SCHEMA.md`.
- Add migrations.
- Add auth and multi-user persistence rules if needed.[cite:8]

## Key rule

The UI layer must never depend directly on the persistence mechanism. It should depend on stable repository contracts only.[cite:34]

## Migration success criteria

- Screen behavior remains unchanged.
- UX does not degrade.
- Domain logic is preserved.
- Repository swap does not require route rewrites.
