# Components Specification

## Purpose

This document defines the expected core UI components for the MVP and how they should behave.

## Core components

### Bottom navigation

Requirements:
- Maximum five items
- Label always visible
- Active state very clear
- Comfortable safe-area behavior
- No visual overload

### Top app header

Requirements:
- Calm and compact
- May include context title, subtle actions, and profile/settings entry
- Must not compete with content

### Quick add button

Requirements:
- Highly visible but not aggressive
- Reachable on mobile
- Consistent across main screens

### Inventory row

Requirements:
- Fast to scan
- Supports urgency marker
- Supports contextual actions
- Handles long names gracefully

### Status chip

Requirements:
- Used for states such as Fresh, Use soon, Expired, Frozen, Leftover
- Must remain elegant even in high urgency states
- Must not dominate the row visually

### Filter chip

Requirements:
- Easy to tap
- Clearly selected vs unselected
- Supports horizontal scrolling if needed

### Section card / grouped module

Requirements:
- Quiet surface styling
- Clear title
- Optional small metadata
- Optional CTA

### Recipe card

Requirements:
- Show title, time, and coverage quality
- Work in list form or compact card form
- Avoid decorative image dependency if images are not available

### Shopping row

Requirements:
- Very fast checkbox interaction
- Strong checked vs unchecked clarity
- Good readability while walking in a store

### Bottom sheet

Requirements:
- Used for quick add, edit, filters, actions, and confirmations
- Smooth entrance and dismissal
- Clear header and close affordance
- Strong thumb ergonomics

### Empty state module

Requirements:
- Explain what belongs here
- Include one clear next action
- No generic illustration clichés

## Component quality rules

- Components must look custom-refined, not untouched library defaults.
- Components must maintain visual consistency across the whole app.
- Interactive states must be visible and tasteful.
- Motion and feedback must reinforce trust.
