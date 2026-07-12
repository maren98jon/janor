# Technical Decisions

## Purpose

This file captures the main technical decisions that should guide implementation.

## Current decisions

### 1. Frontend framework

Use Next.js with App Router and TypeScript.[web:36]

Reason:
- Strong modern baseline
- Good route architecture
- Good PWA path
- Suitable for mobile-first web app product work.[web:36][web:41]

### 2. Product format

Use a Progressive Web App.

Reason:
- Single codebase
- Installable experience
- App-like usage on mobile without separate native apps.[web:36][web:41]

### 3. Design approach

Use a premium, Apple-inspired design philosophy in principle, focused on clarity, deference, and depth.[web:53][web:54][web:67]

### 4. Architecture

Use pragmatic Clean Architecture + Vertical Slice by feature.[cite:34]

### 5. Initial persistence strategy

Allow mock/local-first implementation if necessary, but structure for later API and Postgres evolution.[cite:8][cite:28]

### 6. UX quality strategy

Optimize for fewer but better screens first, rather than broad shallow scope.[cite:31][cite:32]
