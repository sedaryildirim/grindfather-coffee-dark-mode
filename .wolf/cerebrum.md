# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-18

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** fast-force
- **SDA architecture pattern:** IO observer gated behind `CSS.supports('animation-timeline: scroll()')` — SDA handles reveals in Chrome/Edge/Safari, IO runs as Firefox fallback. Global `@supports` block resets `[data-reveal]` to visible so non-animated elements show in SDA browsers.
- **::before on grid containers becomes a grid item** — breaks layout. Use `position: absolute` on the pseudo-element + `position: relative` on the grid to overlay the line without disrupting grid flow.
- **SDA `animation-duration`:** With `animation-timeline: view()`, omitting duration in the `animation` shorthand (defaulting to 0s) is treated as `auto` by the browser for scroll-driven timelines. Explicit `auto` not required.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
