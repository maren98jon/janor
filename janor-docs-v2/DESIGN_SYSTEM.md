# Design System

## Purpose

This file is the visual source of truth for the product. Every screen, component, layout, state, and future extension must follow this system to preserve a premium, calm, natural, and coherent product experience.[cite:31][cite:32][web:53][web:54]

## Experience goals

The product must feel:

- Premium
- Natural
- Calm
- Tactile
- Refined
- Human
- Intentional

The product must not feel:

- Generic
- Template-based
- Over-decorated
- Loud
- Futuristic for the sake of it
- Obviously AI-generated

## Foundational principles

### Clarity

The UI must always make the next action understandable at a glance. Information hierarchy, text legibility, and touch targets must support immediate comprehension.[web:53][web:54][web:67]

### Deference

The interface must serve content, not compete with it. Ingredient names, dates, quantities, lists, and recipes are the stars of the product.[web:54][web:67]

### Depth

The app should feel layered through grouping, spacing, sheets, motion, and transitions that preserve context instead of abruptly switching states.[web:53][web:56][web:67]

## Color system

### Palette direction

Use a restrained palette with mostly neutral surfaces and one culinary accent. Recommended accent directions:

- Sage green
- Olive gray
- Stone blue
- Warm muted teal

Avoid intense corporate blues, purple gradients, and overly playful food colors.[web:53][web:54]

### Semantic tokens

- Background
- Surface
- Surface elevated
- Surface grouped
- Divider
- Text primary
- Text secondary
- Text tertiary
- Accent primary
- Success
- Warning
- Critical

### Color behavior

- Backgrounds should stay quiet.
- Accent should be used sparingly for key actions and selected states.
- Expiration urgency can use semantic color, but never create visual chaos.
- Critical states must remain elegant and readable.

## Typography

### Typographic intent

Typography must do most of the hierarchy work. Avoid relying on heavy decoration, colorful boxes, or oversized icons.

### Type behavior

- Large title for primary screen identity.
- Section headers with strong but restrained contrast.
- Dense but readable list text.
- Quiet metadata styling for expiration dates, quantities, and locations.

### Tone rules

- No playful rounded font.
- No editorial serif display font.
- No exaggerated weight contrast.
- Text should feel precise, modern, and trustworthy.

## Spacing system

Use a consistent 4 px spacing logic. Dense areas such as shopping and inventory must still breathe. The product should never feel cramped or crowded, even when handling messy real data.

## Surfaces and elevation

- Prefer grouped surfaces over hard card-heavy layouts.
- Use subtle separation rather than loud borders.
- Use gentle depth for sheets, sticky controls, and primary surfaces.
- Do not stack too many visual containers.

## Component language

### Buttons

Primary buttons:
- Used sparingly.
- Filled accent style.
- Clear text labels.

Secondary buttons:
- Tinted or neutral surface style.
- Used for non-primary actions.

Ghost buttons:
- Used inside cards, lists, and sheets where visual weight must stay low.

### Inputs

Inputs must feel native, spacious, and trustworthy. Labels should be clear. Placeholders should never carry essential meaning.

### Lists

Lists are central to the product. They should be highly scannable and support fast action. Each row must make name, quantity, location, and urgency understandable quickly.

### Chips and segmented controls

Use them for filtering and switching contexts, especially in recipes, inventory, and plan views.

### Sheets

Bottom sheets should be the default pattern for quick actions, edits, confirmations, and picker flows. They preserve context better than full page jumps for mobile use.[web:56][web:62]

## Iconography

Use line icons with calm, precise strokes. Icons support recognition and task efficiency but must not become decorative noise.

## Motion system

Motion should be soft, brief, and context-preserving:

- Sheet open and close
- Filter state changes
- Reordering transitions
- Confirmation feedback
- Empty-to-filled state transitions

Motion must communicate continuity and confidence, not spectacle.[web:56][web:67]

## State design

### Empty states

Each empty state must include:
- A clear explanation
- A useful next action
- A calm visual tone
- No generic filler illustrations

### Loading states

Use realistic skeletons and progressive reveal rather than spinners whenever possible.

### Error states

Errors must be plain-language, recoverable, and specific.

## Anti-patterns

Never use:

- Gradient-heavy hero sections
- Three identical feature cards in a row
- Excessively rounded “bubbly” UI
- Decorative icon circles everywhere
- Hyper-saturated callouts
- Dense admin-like tables on mobile
- Long forms without progressive disclosure
- Placeholder copy that sounds artificial

## Design acceptance checklist

A screen is acceptable only if all of these are true:

- It feels premium and calm.
- It looks believable with real data.
- The primary action is obvious.
- The visual hierarchy is immediate.
- It does not look like a template.
- It does not contain obvious AI design tropes.
