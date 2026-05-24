# Grindfather Coffee — Session Handoff

> Machine-readable context for next Claude instance. Read this fully before touching any file.
> Generated: 2026-05-24 | Last commit: `7e02649`

---

## Project Identity

| Field | Value |
|---|---|
| Name | GRINDFATHER Coffee Co. |
| Type | Static landing site (Astro 4.x) |
| Deployed | GitHub Pages |
| Base URL | `https://sedaryildirim.github.io/grindfather-coffee-dark-mode/` |
| Repo | `grindfather-coffee-dark-mode` (main branch) |
| Local dev | `npm run dev -- --port 4330` |
| Dev URL | `http://localhost:4330/grindfather-coffee-dark-mode/` |
| Build | `npm run build` |
| Deploy | Auto via `.github/workflows/deploy.yml` on push to `main` |

**CRITICAL**: Port 4321 runs a different project ("kaif" restaurant). Always use `--port 4330` for this project. `openwolf designqc` must use `--url http://localhost:4330/grindfather-coffee-dark-mode/`.

---

## Tech Stack

- **Framework**: Astro 4.x, static output, `base: '/grindfather-coffee-dark-mode'`
- **Styling**: Scoped CSS per component, OKLCH color tokens in `global.css`
- **Fonts**: Big Shoulders Display Black (display), Barlow Regular/Medium/Light (body) — self-hosted `.woff2`
- **Animations**: CSS Scroll-Driven Animations (SDA) inside `@supports (animation-timeline: scroll())` guard; IntersectionObserver fallback for Firefox/reduced-motion
- **No JS framework** — vanilla TypeScript in `<script>` blocks
- **Context management**: OpenWolf (`.wolf/` directory)

---

## File Map

```
src/
  components/
    Nav.astro         — sticky header, mobile drawer, focus trap, active nav IO
    Hero.astro        — full-viewport hero, ticker, SDA scroll exit
    About.astro       — brand story, facts grid, parallax img
    Menu.astro        — coffee/tea/hot drinks/shakes, dietary tags, allergen notice
    Location.astro    — two venue cards, live open/closed status, hours table
    Contact.astro     — events section (standalone #events), contact info, reviews, closing strip
    Footer.astro      — wordmark, social links, legal accordion (details/summary)
  pages/
    index.astro       — layout, structured data, scroll progress bar, scroll-to-top
  styles/
    global.css        — @font-face, CSS custom properties (full token scale), reveal system
```

---

## Design System

**Creative North Star**: "The Urban Broadsheet" — editorial confidence, mid-century condensed type poster energy.

### Color Tokens (global.css :root)

```css
--ink: #000f08                           /* primary dark surface */
--ink-border: oklch(18% 0.008 155)       /* subtle borders on dark */
--ink-muted: oklch(52% 0.008 155)        /* secondary text on dark */
--ink-body: oklch(18% 0.008 155)         /* body text on light sections */
--ink-address: oklch(22% 0.008 155)
--ink-soft: oklch(28% 0.008 155)
--ink-subtle: oklch(38% 0.008 155)       /* use for secondary text on LIGHT sections */
--ink-dim: oklch(64% 0.008 155)

--paper: oklch(96% 0.006 85)             /* primary light surface */
--paper-muted: oklch(40% 0.006 85)       /* WARNING: dark-section scale — do NOT use on light bg */
--paper-faint: oklch(58% 0.006 85)       /* secondary text on dark */
--paper-muted-dark: oklch(65% 0.006 85)
--paper-dim: oklch(70% 0.006 85)
--paper-dim-hover: oklch(80% 0.006 85)

--brick: oklch(60% 0.25 25)              /* interactive accent */
--brick-deep: oklch(44% 0.24 25)         /* editorial accent (ONE, TWO, BAR words) */
--brick-light: oklch(70% 0.22 25)        /* hover states */
--brick-hover: oklch(78% 0.20 25)
--brick-word: var(--brick-deep)          /* semantic alias for editorial words only */

--status-open: oklch(42% 0.14 142)       /* green — "OPEN NOW" */
```

**Token semantic rules** (CRITICAL — has caused bugs before):
- `--paper-*` = text/elements on DARK (`--ink`) backgrounds only
- `--ink-*` = text/elements on LIGHT (`--paper`) backgrounds only
- Never cross-use. `--paper-muted` on a light section = wrong, even if it looks OK.

### Typography

- **Display**: `'Big Shoulders Display', 'Arial Narrow', Arial, sans-serif` — condensed, weight 900 only, minimum 2.5rem usage size
- **Body**: `'Barlow', system-ui, sans-serif` — weights 300/400/500
- **Scale**: `clamp()` for responsive display sizes; label text 0.6875rem–0.75rem; body 0.875rem–1rem

### Anti-references (do NOT use)

- Dark neon / crypto aesthetic (glowing borders, backlit chrome)
- Generic café warmth (stock latte art, earth tones, amber filter)
- Startup template (SaaS-cream, gradient blobs, icon-grid sections, gradient text)
- `border-left/right > 1px` colored accent stripes
- `background-clip: text` gradient text
- Glassmorphism decoratively
- Bounce/elastic easing — exponential ease-out only (`--ease-out-quart`, `--ease-out-expo`)

---

## Architecture Patterns

### Reveal System

```
SDA browsers (Chrome/Edge/Safari):  @supports(animation-timeline:scroll()) owns all reveals
Firefox / reduced-motion:           IntersectionObserver fallback via [data-reveal] + is-revealed class
global.css:                         @supports block resets [data-reveal] to visible (opacity:1, transform:none)
                                    so SDA keyframes can take over cleanly
```

**Rule**: Every new section's reveal goes inside `@supports (animation-timeline: scroll())`. Always add `prefers-reduced-motion` fallback.

### Nav Active State

IO with `rootMargin: '-20% 0px -60% 0px'` watches sections. Active link uses `setAttribute('aria-current', 'location')` (not `toggleAttribute` — that was a bug, fixed 2026-05-24).

### Scroll-to-Top Button

- Appears at `y >= window.innerHeight * 0.8`
- Background detection: `elementFromPoint` throttled in `requestAnimationFrame` (was causing synchronous reflow on every scroll tick — fixed 2026-05-24)
- `data-bg="light"` on About/Location sections triggers `scroll-top--on-light` class (dark button on light background)

---

## Section-by-Section State

### Hero (`Hero.astro`)

HTML structure:
```html
<section class="hero">
  <div class="hero__bg">
    <img src="grindfather-hero-img-main.webp" />  <!-- GymVision interior — WRONG PHOTO, blocked -->
    <div class="hero__overlay"></div>
  </div>
  <div class="hero__content">
    <p class="hero__location">Cardiff · GymVision & Riverside Market</p>
    <h1 class="hero__headline">ROASTED / BY EAR.</h1>
    <div class="hero__ctas">
      <a href="#menu" class="hero__cta">EXPLORE THE MENU ↓(svg)</a>
      <a href="#visit" class="hero__cta-secondary">FIND US <span aria-hidden="true">↓</span></a>
    </div>
    <p class="hero__rating">★★★★★ <span>5.0 · Google</span></p>
  </div>
  <div class="ticker">...</div>
</section>
```

**KNOWN ISSUE (P0, blocked)**: Hero image is a GymVision gym interior showing supplement shelves. CSS mitigation: `brightness(0.3)` + heavy overlay gradient. Real fix requires new coffee-facing photography. Do NOT attempt CSS fixes — all have been exhausted.

### About (`About.astro`)

- Grayscale portrait photo of Stefan (owner), `object-position: center 10%`
- Facts grid: 4 items with `01/02/03/04` counter prefixes (`.about__fact-num`, `aria-hidden`)
- `border-bottom: 2px solid var(--ink)` acts as hard delimiter to Menu (dark section follows)
- `data-bg="light"` attribute for scroll-top button detection

### Menu (`Menu.astro`)

- 4 groups: COFFEE (10 items), TEA (2), HOT DRINKS (3 + syrups modifier), SHAKES (builder)
- **Dietary tags**: `D` (dairy) and `V` (vegan/dairy-free) as `<abbr>` badges, 0.625rem, on each item
- Allergen notice at top: "D = dairy · V = dairy-free"
- `.menu__category` is `position: sticky; top: 4rem` — sticks below nav
- Mobile scroll spotlight: IO highlights one item at a time (`.menu__item--scroll-active`)

### Location (`Location.astro`)

- `data-bg="light"` — ink tokens only
- Two venue cards: GymVision (Mon-Fri 06:30-15:00) and Riverside Market (Sun 10:00-14:00)
- Live status via JS `getStatuses()` — sets `data-open="true/false"` and text
- GymVision area hint: "Inside the gym · Pentwyn, NE Cardiff · approx. 15 min from city centre"
- `hours-table th` and `location__status[data-open="false"]` use `--ink-subtle` (NOT `--paper-muted`)

### Contact (`Contact.astro`)

Two sections in one file:

**`#events`** (standalone section for nav IO):
- Headline: "WE BRING THE BAR TO YOU."
- Events logistics: 3-col grid (CAPACITY/INCLUDED/LEAD TIME)
- CTA: `SEND ENQUIRY ↗` (mailto pre-filled) + note with email + Instagram DM link
- Social proof quote (Henry, Local Guide)

**`#contact`** section:
- Contact details: EMAIL / PHONE / INSTAGRAM / FACEBOOK (2-col grid)
- Reviews: featured (Robyn McDowall) + 4 secondary + rating
- Closing strip: "GRINDFATHER." + right-side div with "Cardiff · Since 2015" + "FOLLOW ON INSTAGRAM ↗" CTA (min-height: 44px, inline-flex)

### Footer (`Footer.astro`)

- Wordmark, social links (Instagram/Facebook), location meta
- Legal accordion: Terms & Conditions, Privacy Policy (native `<details>/<summary>`)

---

## Audit History

### `/impeccable audit` — Run 1 (2026-05-24): **16/20 Good**

All findings resolved in commit `7e02649`:

| Dim | Score | Fixed |
|---|---|---|
| Accessibility | 3/4 | aria-current value, menu__tag size, hero arrow aria-hidden |
| Performance | 3/4 | scroll handler rAF throttle |
| Responsive | 3/4 | contact__close-cta touch target |
| Theming | 3/4 | hard-coded oklch → var(--ink-body), --paper-muted → --ink-subtle |
| Anti-Patterns | 4/4 | No issues |

Expected score after fixes: **18–19/20**.

### `/impeccable critique` Run 2 (2026-05-24): **24/40**

All P0/P1/P2 findings resolved in commit `e06e20c`:

| Pri | Issue | Fixed |
|---|---|---|
| P0 | No dietary indicators on menu | D/V tags added to all items |
| P0 | Single mailto contact path | Instagram DM added to events CTA note |
| P1 | GymVision needs landmark sentence | "Inside the gym" added to area hint |
| P2 | Closing strip cold | "Follow on Instagram" CTA added |

**Outstanding (hero image blocked)**:
- P0: Hero image shows gym interior — needs coffee van exterior / barista photo. CSS cannot fix this.

---

## Outstanding Work

### Blocked (hero photo)
- Hero image replacement — new photo needed (coffee van exterior, latte art, or barista at Faema E61). Until then brightness(0.3) + heavy overlay is the mitigation.

### Next logical tasks
1. Re-run `/impeccable audit` to confirm score improvement after `7e02649` fixes
2. Re-run `/impeccable critique` (Run 3) to check heuristic improvement
3. Consider `/impeccable polish` for final pre-ship pass
4. Consider adding a contact form (Netlify Forms or Formspree) to replace mailto-only events path — still a latent P1

---

## OpenWolf Protocol

Read `.wolf/OPENWOLF.md` at session start. Key rules:

1. Check `.wolf/anatomy.md` before reading any file
2. Check `.wolf/cerebrum.md` Do-Not-Repeat before generating code
3. After writing/editing files: update `.wolf/anatomy.md`, append to `.wolf/memory.md`
4. After user correction: update `.wolf/cerebrum.md`
5. After fixing bugs: log to `.wolf/buglog.json`

### cerebrum.md Do-Not-Repeat

- **Hero image `object-position`** cannot fix wrong source photo. Supplement shelves span full frame. CSS mitigation only: `brightness(0.3)` + heavier overlay. Real fix = new photo.
- **`<script>` inside `<style>` block** is invalid HTML in Astro. Script must be sibling of style, never nested.
- **`--paper-*` tokens on light sections** = semantic mismatch. Use `--ink-*` scale for text on `--paper` backgrounds.
- **`aria-current` via `toggleAttribute`** sets empty-value attribute. Use `setAttribute('aria-current', 'location')` + `removeAttribute` pair instead.
- **`elementFromPoint` in scroll listener** causes synchronous reflow. Always wrap in `requestAnimationFrame`.

---

## Key Commands

```bash
# Dev server (MUST use 4330 — 4321 is a different project)
npm run dev -- --port 4330

# Build
npm run build

# Design QC screenshots
openwolf designqc --url http://localhost:4330/grindfather-coffee-dark-mode/

# Commit and push pattern
git add <files> && git commit -m "..." && git push origin main
# Pages deploys automatically on push to main
```

---

## Session Commit Log (this session)

```
7e02649  fix(audit): apply all P1/P2/P3 audit findings
92779a2  chore: update wolf memory log
e06e20c  fix(critique): apply Run 2 P0/P1/P2 issues
9f0f967  fix: apply critique P1/P2 fixes — closing strip, location context, contrast, affordance
9ee5ee4  feat: apply design/UX improvements from audit
d92ff1e  fix: add cursor pointer to all interactive link elements
5a7b676  UX/design improvements: events section, hero, contrast, menu, location
```
