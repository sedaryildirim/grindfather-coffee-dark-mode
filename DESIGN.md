<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: v5 Coffee
description: A bold urban coffee shop landing site — typographic, choreographed, uncompromising.
---

# Design System: v5 Coffee

## 1. Overview

**Creative North Star: "The Urban Broadsheet"**

This is a coffee shop that thinks like a publication. The visual language borrows from the authority of mid-century condensed type posters and the editorial confidence of the New York Times front page — stripped of sentimentality, committed to the page. Onyx Coffee Lab is the closest analogue in the specialty coffee world: confident typography, no explanatory clutter, design that assumes the product speaks for itself.

Color is tonal, not chromatic. "Drenched" here means total commitment to a high-contrast tonal field — near-black or off-white owns the entire surface. Not a neutral backdrop with an accent; the tone IS the color. There are no decorative fills or gradients softening the edges. Motion is choreographed but purposeful: sections arrive with the weight of a printed page revealing itself, not the drift of a scroll kit template.

This system explicitly rejects: the over-branded corporate warmth of Starbucks (seasonal palettes, committee-safe templates), the Instagram softness of third-wave café aesthetics (latte art, earth tones, amber filter nostalgia), the dark neon / glowing border crypto aesthetic, and the startup template look (SaaS-cream, gradient blobs, icon-grid sections). What remains is conviction.

**Key Characteristics:**
- High tonal contrast as the primary design statement — no chromatic decoration
- Condensed display type as the dominant visual element; it carries the brand identity
- Scroll-driven choreography with purpose: sections arrive, they don't drift
- Information lands fast — no atmospheric padding, no copy that restates the headline
- Urban texture: looks like it belongs on a real street, not a mood board

## 2. Colors

Total tonal commitment. Near-black or off-white owns the surface entirely. This is not a neutral backdrop — it is the design statement.

### Primary
- **Dominant field** `[to be resolved during implementation]`: Near-black — the primary surface. A tinted near-black (blue-black or warm-black, not pure `#000000`) owns large sections. Text is off-white against it.

### Neutral
- **Inverse field** `[to be resolved during implementation]`: Off-white — the counterpoint. A tinted near-white (not pure `#ffffff`) owns alternating sections or serves as text on the dark field. Never pure. Always tinted toward the brand hue.
- **Single chromatic accent** `[to be resolved during implementation — if used at all]`: A single color may appear in ≤2 instances per view. Brick, amber, or a sharp warm tone. Optional. If it exists, its rarity is the point.

**The Drenched Rule.** The surface IS the color. Near-black or off-white owns every screen without apology. No gradient backgrounds, no hero overlays, no tonal gradients softening the commitment.

**The Achromatic Authority Rule.** Color is not required. The system works entirely in near-black and off-white. A chromatic accent is an option, not a requirement — and if used, it must appear sparingly enough that its presence is noticed.

**The No-Warmth-by-Default Rule.** Neutrals are not warm by instinct. Warmth (amber, cream, roast-brown) must be justified, not assumed from the category. Cold neutrals are equally valid and sharper.

## 3. Typography

**Display Font:** Condensed sans-serif `[font pairing to be chosen at implementation — target: high x-height grotesque condensed, Neue Haas Grotesk Condensed / Aktiv Grotesk Condensed / Franklin Gothic Condensed family or equivalent]`
**Body Font:** Regular humanist or grotesque sans `[to be chosen at implementation]`

**Character:** The condensed display type is the brand voice made visible — tall, authoritative, poster-bred. It carries the identity the way a newspaper masthead does. References: Neue Haas Grotesk era Helvetica posters, New York Times front page mastheads. Body type is restrained and legible; its job is to get out of the display type's way.

### Hierarchy
- **Display** (black or heavy weight, `clamp(3rem, 10vw, 7rem)` TBD, leading ~0.9): Hero headlines, section-opening statements. Never decorative — always load-bearing.
- **Headline** (bold, `clamp(1.5rem, 4vw, 3rem)` TBD, leading ~1.1): Secondary section headers.
- **Title** (medium, 1.125–1.25rem, leading ~1.3): Subsection labels, card headings.
- **Body** (regular, 16–18px, leading 1.6): Long-form content. Cap line length at 65–75ch.
- **Label** (medium, 11–13px, tracked +0.08–0.12em, uppercase): Tags, captions, nav items, timestamps.

**The Condensed Commits Rule.** The condensed display font appears only at sizes where the condensed proportion reads — minimum 2.5rem. Below that threshold, it collapses. Use the body typeface for any text below this size.

**The Scale Earns Rule.** Hierarchy lives in scale and weight contrast, not color. Minimum 1.5× ratio between adjacent hierarchy steps. Flat type scales — where everything sits between 14px and 18px — are prohibited.

## 4. Elevation

Flat by default. No shadows or blurs at rest. Depth is expressed through tonal contrast (surface field switches between near-black and off-white sections) and type scale, not spatial elevation. Choreographed motion provides the sense of layering as content reveals during scroll.

**The Flat-By-Default Rule.** Shadows exist only as a response to interactive state, never as decoration. A resting element has no shadow. If hover introduces a lift, it is measured (0 4px 16px rgba(0,0,0,0.15) maximum) and purposeful.

## 5. Do's and Don'ts

### Do:
- **Do** let the tonal field own the full surface — near-black or off-white, committed, no gradient softening.
- **Do** use condensed display type at sizes where the condensed proportion reads (≥2.5rem).
- **Do** choreograph scroll entrances with purpose: each section arrives decisively, with `ease-out-quart` timing.
- **Do** include `prefers-reduced-motion` media query — all scroll animations must have a static fallback.
- **Do** tint every neutral toward the brand hue (chroma 0.005–0.01 minimum) — never pure `#000` or `#fff`.
- **Do** ensure WCAG 2.1 AA contrast at all text sizes.
- **Do** make information land fast: hours, location, what's on offer above the fold or one deliberate scroll.
- **Do** cap body line length at 65–75ch.

### Don't:
- **Don't** use dark neon, glowing borders, or backlit UI chrome — no crypto aesthetic, no neon-on-black spectacle.
- **Don't** use generic café warmth: no stock latte art, no amber Instagram filters, no soft earth-tone softness that makes every indie café look the same.
- **Don't** design like Starbucks: no corporate warmth, no seasonal palette logic, no committee-safe templates where everything is pleasant and forgettable.
- **Don't** use a startup template: no SaaS-cream gradients, no gradient blobs, no section-per-section scrollytelling with feature icons.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, callouts, or list items. Rewrite with full borders, background tints, or nothing.
- **Don't** use gradient text (`background-clip: text` + gradient background). Solid color only. Emphasis through weight and scale, not color tricks.
- **Don't** use glassmorphism or blurred-card effects decoratively.
- **Don't** animate CSS layout properties (width, height, padding, margin, top, left). Animate transform and opacity only.
- **Don't** add atmospheric copy that restates the headline or delays the point. Clarity is respect for a visitor's time.
- **Don't** use bounce or elastic easing. Ease out with exponential curves only (ease-out-quart / quint / expo).
