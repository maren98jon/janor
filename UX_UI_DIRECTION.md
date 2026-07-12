# UX/UI Direction

## Design intent

The product must achieve a premium UX/UI level with a calm, natural, high-craft feeling similar in spirit to Apple product experiences, without copying Apple visuals literally. The correct inspiration is the design philosophy behind Apple interfaces: clarity, deference, and depth.[web:53][web:54][web:67]

The app must not feel like a startup template, a component gallery, or an AI-generated mockup. It must feel like a real consumer product designed by a senior product design team.[cite:32][cite:52]

## Design principles

### 1. Clarity

Text must be legible, hierarchy must be obvious, and every screen must make the next action immediately understandable. The interface should remove uncertainty and visual clutter.[web:53][web:54][web:67]

### 2. Deference

The interface must support the content and the task rather than dominating them. Food, ingredients, recipes, quantities, and time-sensitive information are the real content; UI chrome should stay restrained.[web:54][web:67]

### 3. Depth

The app should feel layered and continuous through subtle motion, spatial relationships, sheets, grouped surfaces, safe spacing, and transitions that preserve context.[web:53][web:56][web:67]

## Visual tone

The visual tone should be:

- Calm
- Warm-neutral
- Premium
- Trustworthy
- Natural
- Human
- Highly polished

The visual tone should not be:

- Futuristic
- Neon
- Aggressive
- Hyper-saturated
- Over-decorated
- Corporate SaaS-like
- Obviously “AI aesthetic”

## Anti-AI design rules

The product must explicitly avoid these patterns:

- Purple-blue startup gradients.
- Three equal cards in generic feature grids.
- Decorative glowing blobs and abstract orbs.
- Repetitive icon circles with colored backgrounds.
- Empty “marketing copy” headings.
- Overuse of glassmorphism.
- Huge rounded corners on everything.
- Excessive shadows.
- Overloaded dashboard home screens.[cite:52]

## Mobile-first UX rules

- Start every screen design at 390 px width first.[web:45]
- Prioritize thumb-friendly actions and bottom reachability.
- Keep one primary action per screen.
- Avoid deep navigation nesting.
- Support short, repeated interactions such as add, consume, move, check, and buy.
- Optimize for one-handed use in the kitchen or supermarket.
- Reduce typing whenever possible through defaults, suggestions, recent items, templates, and scanning.[web:37][web:45]

## Navigation model

Use a bottom navigation with a maximum of five tabs:

- Home
- Inventory
- Recipes
- Plan
- Shopping

Use contextual flows, sheets, and drill-down pages for detail. The main mobile app should not feel like a desktop sidebar squeezed into a phone layout.[web:62]

## Home screen philosophy

The home screen should not be a classic analytics dashboard. It should be an action-oriented overview focused on the most important immediate decisions.

Recommended home modules:

- Expiring soon
- Cook today
- Active shopping list
- Quick add
- Leftovers / use-first suggestions

## Visual system

### Color

Use a restrained palette with one primary accent and mostly neutral surfaces. Good directions include muted green, soft sage, stone blue, or refined olive-gray. The palette must feel culinary and domestic rather than corporate.[web:53][web:54]

### Typography

Typography should carry the hierarchy. Use a clean, premium sans-serif with excellent readability and weight range. Avoid playful or obviously editorial fonts. The feeling should be close to the role typography plays in Apple interfaces: precise, spacious, and readable.[web:53]

### Icons

Use clean line icons with consistent stroke weight. Icons should support scanning, not decorate the UI.

### Cards and surfaces

Use grouped surfaces, restrained borders, soft depth, and carefully managed spacing. Surfaces should feel organized and tactile without looking “designed for show”.

### Motion

Motion should be subtle and meaningful:

- Soft page transitions.
- Bottom sheets that preserve context.
- Content reordering with smooth continuity.
- Feedback animations for add, consume, move, and complete.

Animation should never become spectacle. It should simply make the app feel alive and coherent.[web:56][web:67]

## Screen-level UX expectations

Every screen must include:

- A clear primary objective.
- A visible primary action.
- Strong empty states.
- Helpful defaults.
- Immediate feedback on user actions.
- Realistic error and loading states.
- No dead ends.

## Quality bar

Before any implementation is accepted, every screen should pass this test:

- Does it look like a real product, not a template?
- Does it feel premium without trying too hard?
- Could a user understand the main action in under one second?
- Would this still feel elegant with real, messy household data?
- Does the screen remain beautiful on mobile and not only in polished mockups?
