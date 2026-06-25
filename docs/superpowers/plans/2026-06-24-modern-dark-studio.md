# Modern Dark Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing G&K Software Astro site so it feels like a modern dark development studio instead of a terminal-style interface.

**Architecture:** Keep the current Astro page structure and service data model. Add a small set of reusable CSS utilities in `src/styles/global.css`, then apply them to the homepage and service-route markup so both surfaces share one visual system without adding dependencies or new components.

**Tech Stack:** Astro 5, Tailwind CSS 4 utility classes, Bun test runner, TypeScript, existing canvas synapse script.

---

## File Structure

- `src/styles/global.css`: Add modern dark studio tokens and reusable classes for page shells, buttons, panels, menus, chips, section spacing, links, and list dividers. Tune synapse overlays to be quieter.
- `src/pages/index.astro`: Replace the boxy homepage treatments with a modern header, spacious hero, work index, softer situations/approach/capability/founder/contact sections, and simplified footer.
- `src/pages/[service].astro`: Apply the same header, footer, hero, panel, list, and CTA patterns to every service page.
- `src/scripts/synapse-field.ts`: Lower canvas alpha values only if the hero still reads too interface-like after the CSS pass.
- `src/data/services.ts`: Leave service data unchanged unless implementation reveals a concrete TUI label that needs copy cleanup.

## Task 1: Add Modern Studio CSS Primitives

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add shape, spacing, and action tokens**

Add these tokens inside the existing `:root` block:

```css
  --color-surface: #171d16;
  --color-surface-soft: #1c241a;
  --color-surface-raised: #222a1f;
  --color-warm: #e58b70;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --section-y: clamp(4.5rem, 8vw, 7.5rem);
  --container: 72rem;
```

Keep the existing color tokens. These additions support modernized surfaces without changing the brand palette.

- [ ] **Step 2: Add reusable utility classes**

Inside `@layer utilities`, add these classes:

```css
  .site-container {
    width: min(100% - 2rem, var(--container));
    margin-inline: auto;
  }

  .section-pad {
    padding-block: var(--section-y);
  }

  .studio-nav {
    border-bottom: 1px solid rgba(196, 206, 183, 0.1);
    background: rgba(16, 20, 15, 0.88);
    backdrop-filter: blur(18px);
  }

  .wordmark-mark {
    border-radius: var(--radius-sm);
    background: var(--color-ink);
    color: var(--color-base);
  }

  .studio-button {
    border-radius: 999px;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.75rem 1.15rem;
    font-size: 0.875rem;
    font-weight: 800;
    transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .studio-button:hover {
    transform: translateY(-1px);
  }

  .studio-button-primary {
    background: var(--color-signal);
    color: var(--color-base);
  }

  .studio-button-primary:hover {
    background: var(--color-ink);
  }

  .studio-button-secondary {
    border-color: rgba(196, 206, 183, 0.2);
    background: rgba(232, 238, 223, 0.04);
    color: var(--color-ink);
  }

  .studio-button-secondary:hover {
    border-color: rgba(184, 217, 106, 0.55);
    color: var(--color-signal);
  }

  .studio-panel {
    border: 1px solid rgba(196, 206, 183, 0.12);
    border-radius: var(--radius-md);
    background: linear-gradient(180deg, rgba(232, 238, 223, 0.055), rgba(232, 238, 223, 0.025));
  }

  .studio-panel-solid {
    border: 1px solid rgba(196, 206, 183, 0.1);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .studio-link {
    color: var(--color-signal);
    font-weight: 800;
    text-decoration: none;
  }

  .studio-link:hover {
    color: var(--color-ink);
  }

  .studio-chip {
    border: 1px solid rgba(196, 206, 183, 0.14);
    border-radius: 999px;
    background: rgba(232, 238, 223, 0.04);
    color: var(--color-ink-soft);
  }

  .studio-divider-list > * + * {
    border-top: 1px solid rgba(196, 206, 183, 0.1);
  }
```

These classes reduce inline class duplication and make the Astro edits smaller.

- [ ] **Step 3: Quiet the synapse overlay**

Update `.synapse-field::before` opacity from `0.62` to `0.5`, and reduce the green radial alpha values:

```css
      radial-gradient(circle at 78% 24%, rgba(184, 217, 106, 0.034), transparent 25rem),
      radial-gradient(circle at 18% 72%, rgba(184, 217, 106, 0.02), transparent 22rem),
      linear-gradient(110deg, rgba(184, 217, 106, 0.016), transparent 34%, transparent 68%, rgba(184, 217, 106, 0.01));
    opacity: 0.5;
```

Keep `.synapse-field::after` in place so the hero remains readable.

- [ ] **Step 4: Add reduced-motion protection for button transform**

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
    .studio-button {
      transition: none;
    }

    .studio-button:hover {
      transform: none;
    }
```

- [ ] **Step 5: Run CSS smoke checks**

Run:

```bash
bun run build
```

Expected: build exits `0` and still generates 7 pages.

- [ ] **Step 6: Commit CSS primitives**

Run:

```bash
git add src/styles/global.css
git commit -m "Add modern dark studio CSS primitives"
```

## Task 2: Modernize Homepage Header And Hero

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace the header classes**

Replace the homepage `<header>` opening and inner container with:

```astro
<header class="studio-nav sticky top-0 z-20">
  <div class="site-container flex flex-wrap items-center justify-between gap-4 py-4">
```

Replace the logo mark span with:

```astro
<span class="wordmark-mark flex h-9 w-9 items-center justify-center text-sm font-extrabold">
  G&K
</span>
```

Replace the uppercase company label with sentence-case text:

```astro
<span class="block text-sm font-extrabold text-(--color-ink)">G&K Software</span>
<span class="block text-xs font-medium text-(--color-ink-muted)">Engineering studio</span>
```

- [ ] **Step 2: Modernize header navigation**

Use `gap-4` for nav spacing. Replace the email CTA classes with:

```astro
class="studio-button studio-button-primary"
```

Replace the dropdown panel classes with:

```astro
class="studio-panel-solid mt-3 grid w-full gap-1 p-3 md:absolute md:right-0 md:w-72"
```

Keep existing links and hrefs unchanged.

- [ ] **Step 3: Replace the hero section shell**

Change the hero section from:

```astro
<section class="synapse-field relative overflow-hidden border-b border-(--color-line) bg-(--color-base) px-5 py-14 md:py-20" data-synapse-field>
```

to:

```astro
<section class="synapse-field relative overflow-hidden bg-(--color-base) px-5 py-20 md:py-28" data-synapse-field>
```

Change the hero grid container to:

```astro
<div class="site-container relative z-10 grid min-h-[34rem] items-end gap-10 md:grid-cols-[1.15fr,0.85fr]">
```

- [ ] **Step 4: Remove the terminal label**

Delete this paragraph from the hero:

```astro
<p class="max-w-max border border-(--color-line) bg-(--color-panel-muted) px-3 py-2 text-xs font-bold tracking-[0.04em] text-(--color-signal)">
  Signal Room / Engineering studio
</p>
```

Replace it with:

```astro
<p class="max-w-2xl text-sm font-semibold leading-7 text-(--color-signal)">
  Founder-led development for products, platforms, automations, and systems that need careful technical judgment.
</p>
```

- [ ] **Step 5: Adjust hero type and CTAs**

Set the hero heading classes to:

```astro
class="text-balance max-w-5xl text-5xl font-extrabold leading-[0.98] tracking-[-0.025em] text-(--color-ink) md:text-7xl"
```

Set the primary CTA class to:

```astro
class="studio-button studio-button-primary"
```

Set the secondary CTA class to:

```astro
class="studio-button studio-button-secondary"
```

- [ ] **Step 6: Replace the hero aside with a work index**

Replace the `<aside>` in the hero with:

```astro
<aside class="studio-panel p-5 md:p-6">
  <div class="flex items-start justify-between gap-6">
    <div>
      <p class="text-sm font-extrabold text-(--color-ink)">Work index</p>
      <p class="mt-2 text-sm leading-6 text-(--color-ink-muted)">Six entry points into the same operating model.</p>
    </div>
    <p class="text-sm font-extrabold text-(--color-signal)">06</p>
  </div>
  <div class="studio-divider-list mt-5">
    {serviceLinks.map((service) => (
      <a class="group flex items-center justify-between gap-4 py-3 text-sm font-bold text-(--color-ink-soft)" href={service.href}>
        <span class="group-hover:text-(--color-ink)">{service.title}</span>
        <span class="text-(--color-ink-muted) group-hover:text-(--color-signal)">View</span>
      </a>
    ))}
  </div>
  <ul class="studio-divider-list mt-5 text-sm leading-6 text-(--color-ink-soft)">
    {signalPoints.map((point) => <li class="py-3">{point}</li>)}
  </ul>
</aside>
```

This keeps the content but removes terminal-cell styling.

- [ ] **Step 7: Run homepage build check**

Run:

```bash
bun run build
```

Expected: build exits `0` and generates `/index.html`.

- [ ] **Step 8: Commit homepage header and hero**

Run:

```bash
git add src/pages/index.astro
git commit -m "Modernize homepage header and hero"
```

## Task 3: Modernize Homepage Content Sections

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Convert service grid into a work index**

Replace the services section wrapper classes with:

```astro
<section id="services" class="scroll-mt-32 bg-(--color-surface) px-5 section-pad md:scroll-mt-24">
```

Replace the service list container:

```astro
<div class="grid gap-4 md:grid-cols-2">
```

Replace each service article classes with:

```astro
<article class="studio-panel-solid flex min-h-72 flex-col gap-5 p-5 md:p-6">
```

Replace the short title badge classes with:

```astro
class="studio-chip shrink-0 px-3 py-1 text-xs font-bold"
```

Replace the service links with `studio-link` classes:

```astro
<a class="studio-link text-sm" href={service.href}>
  View {service.shortTitle.toLowerCase()} work
</a>
<a class="text-sm font-bold text-(--color-ink-muted) no-underline hover:text-(--color-signal)" href={getServiceMailto(service)}>
  Email about {service.shortTitle.toLowerCase()}
</a>
```

- [ ] **Step 2: Remove repeated section labels where headings carry the meaning**

Delete these repeated label paragraphs from the homepage unless they are necessary for orientation:

```astro
When teams call us
Operating model
Capability matrix
Founders
Contact
```

For the services intro, keep the heading `Work lanes` and supporting paragraph.

- [ ] **Step 3: Soften situations section**

Change the situations section shell to:

```astro
<section class="bg-(--color-base) px-5 section-pad">
```

Change each situation item class to:

```astro
class="border-t border-[rgba(196,206,183,0.1)] pt-4 text-sm leading-7 text-(--color-ink-soft)"
```

- [ ] **Step 4: Convert approach to a stepped timeline**

Set the approach section shell to:

```astro
<section id="approach" class="scroll-mt-32 bg-(--color-surface-soft) px-5 section-pad md:scroll-mt-24">
```

Replace the ordered list classes with:

```astro
<ol class="grid gap-4">
```

Replace each step item classes with:

```astro
<li class="studio-panel-solid grid gap-4 p-5 md:grid-cols-[5rem,1fr] md:p-6">
```

Replace `Step {index + 1}` text with:

```astro
{String(index + 1).padStart(2, '0')}
```

and classes:

```astro
class="text-sm font-extrabold text-(--color-signal)"
```

- [ ] **Step 5: Replace capability matrix with capability tags**

Rename the heading from `The work around the work.` to:

```astro
The technical surface area we cover.
```

Replace the matrix container with:

```astro
<div class="flex flex-wrap gap-3">
  {capabilities.map((capability) => (
    <p class="studio-chip px-4 py-2 text-sm font-semibold">
      {capability}
    </p>
  ))}
</div>
```

- [ ] **Step 6: Modernize founder cards**

Replace each founder article classes with:

```astro
<article class="studio-panel-solid grid gap-5 p-5 md:p-6">
```

Replace image classes with:

```astro
class="h-28 w-28 rounded-[12px] object-cover"
```

Remove the green single-letter spans from both founder names so names render as plain text:

```astro
<h3 class="text-2xl font-extrabold text-(--color-ink)">Gibson Martin</h3>
<h3 class="text-2xl font-extrabold text-(--color-ink)">Kyle Dougan</h3>
```

Set GitHub link classes to:

```astro
class="studio-link mt-4 inline-flex text-sm"
```

- [ ] **Step 7: Simplify contact and footer**

Set the contact panel class to:

```astro
class="studio-panel-solid grid gap-5 p-5 md:p-6"
```

Set the contact CTA class to:

```astro
class="studio-button studio-button-primary w-fit"
```

Set footer shell to:

```astro
<footer class="border-t border-[rgba(196,206,183,0.1)] bg-(--color-base) px-5 py-10">
```

Change footer brand label from tracked uppercase to:

```astro
<p class="font-extrabold text-(--color-ink)">G&K Software, LLC</p>
```

- [ ] **Step 8: Run homepage checks**

Run:

```bash
bun run build
bun run test
```

Expected: build exits `0`, test output reports `3 pass, 0 fail`.

- [ ] **Step 9: Commit homepage content modernization**

Run:

```bash
git add src/pages/index.astro
git commit -m "Modernize homepage content sections"
```

## Task 4: Modernize Service Route Pages

**Files:**
- Modify: `src/pages/[service].astro`

- [ ] **Step 1: Apply the shared header treatment**

Make the service page header match the homepage header from Task 2:

```astro
<header class="studio-nav sticky top-0 z-20">
  <div class="site-container flex flex-wrap items-center justify-between gap-4 py-4">
```

Use `wordmark-mark`, sentence-case `G&K Software`, the same dropdown panel classes, and `studio-button studio-button-primary` for the service email CTA.

- [ ] **Step 2: Replace the service hero shell**

Replace the service hero section shell with:

```astro
<section class="bg-(--color-base) px-5 py-18 md:py-24">
  <div class="site-container grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
```

Delete the `Practice lane` bordered label. Keep the back link but set its class to:

```astro
class="studio-link inline-flex text-sm"
```

Set the hero CTA class to:

```astro
class="studio-button studio-button-primary"
```

- [ ] **Step 3: Replace the service hero aside**

Replace the aside with:

```astro
<aside class="studio-panel p-5 md:p-6">
  <div class="flex items-start justify-between gap-6">
    <div>
      <p class="text-sm font-extrabold text-(--color-ink)">What this usually includes</p>
      <p class="mt-2 text-sm leading-6 text-(--color-ink-muted)">{service.shortTitle}</p>
    </div>
  </div>
  <ul class="studio-divider-list mt-5 text-sm leading-7 text-(--color-ink-soft)">
    {service.homepageBullets.map((bullet) => <li class="py-3">{bullet}</li>)}
  </ul>
</aside>
```

- [ ] **Step 4: Modernize fit and project list sections**

For `goodFit` and `typicalProjects` list sections:

Use shell:

```astro
<section class="bg-(--color-surface) px-5 section-pad">
```

Use list item class:

```astro
class="border-t border-[rgba(196,206,183,0.1)] pt-4 text-sm leading-7 text-(--color-ink-soft)"
```

Remove the small label paragraphs before the headings.

- [ ] **Step 5: Modernize build and process panels**

Change both deliverable/process panels to:

```astro
<div class="studio-panel-solid p-5 md:p-6">
```

Remove the small label paragraphs `What we build` and `How we work`; keep the headings `Concrete deliverables.` and `Visible decisions.`

Change list item classes to:

```astro
class="border-t border-[rgba(196,206,183,0.1)] pt-3"
```

- [ ] **Step 6: Modernize related services and service CTA**

Change related service link classes to:

```astro
class="studio-chip px-4 py-2 text-sm font-bold hover:border-(--color-signal) hover:text-(--color-signal)"
```

Change CTA panel class to:

```astro
class="studio-panel-solid p-5 md:p-6"
```

Change CTA button class to:

```astro
class="studio-button studio-button-primary mt-6"
```

- [ ] **Step 7: Apply simplified footer**

Mirror the homepage footer treatment from Task 3. Keep service page hrefs as absolute hash links:

```astro
href="/#services"
href="/#approach"
href="/#founders"
href="/#contact"
```

- [ ] **Step 8: Run service route checks**

Run:

```bash
bun run build
bun run test
./node_modules/.bin/tsc --noEmit
```

Expected: build exits `0`, 7 pages generate, tests report `3 pass, 0 fail`, typecheck exits `0`.

- [ ] **Step 9: Commit service route modernization**

Run:

```bash
git add 'src/pages/[service].astro'
git commit -m "Modernize service route pages"
```

## Task 5: Visual Balance And Final Verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/scripts/synapse-field.ts` only if needed after visual review

- [ ] **Step 1: Start the dev server**

Run:

```bash
bun run dev -- --host 127.0.0.1 --port 4321
```

Expected: Astro reports a local URL at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Probe all routes**

In a second shell, run:

```bash
node -e "const routes=['/','/product-engineering','/backend-systems','/data-automation','/internal-platforms','/modernization','/technical-rescue']; const base='http://127.0.0.1:4321'; for (const route of routes) { const res = await fetch(base+route); const text = await res.text(); console.log(route, res.status, text.includes('G&K Software') ? 'brand:yes' : 'brand:no', text.length); if (!res.ok) process.exitCode = 1; }"
```

Expected: every route prints `200 brand:yes`.

- [ ] **Step 3: Review desktop and mobile**

Open these URLs:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/product-engineering
```

Check at desktop width and mobile width:

- Header wraps without overlapping.
- Hero heading fits without horizontal scroll.
- Synapse effect is visible but not dominant.
- Service work index does not look like a terminal panel.
- Founder cards show larger images and plain names.
- Service route sections match the homepage system.

- [ ] **Step 4: Tune synapse alpha only if needed**

If the synapse still looks too bright or interface-like, change these values in `src/scripts/synapse-field.ts`:

```ts
const alpha =
  (1 - separation / threshold) * 0.09 * pulse +
  0.025 +
  cursorBoost * 0.2;
```

Change the halo stops to:

```ts
halo.addColorStop(0, 'rgba(184, 217, 106, 0.045)');
halo.addColorStop(0.46, 'rgba(184, 217, 106, 0.016)');
halo.addColorStop(1, 'rgba(184, 217, 106, 0)');
```

Change point fills to:

```ts
context.fillStyle = `rgba(196, 206, 183, ${0.14 + point.glow * 0.28})`;
context.fillStyle = `rgba(184, 217, 106, ${0.048 + point.glow * 0.34})`;
```

If the synapse already reads quiet enough, leave `src/scripts/synapse-field.ts` unchanged.

- [ ] **Step 5: Scan for banned AI-trope copy and old TUI labels**

Run:

```bash
rg -n "empower|seamless|supercharge|leverage|transform|enterprise-grade|next-generation|cutting-edge|Signal Room|Active lanes|Active signals|Capability matrix|Practice lane" src
```

Expected: no matches in `src`. If matches appear, rewrite or remove them before continuing.

- [ ] **Step 6: Run final verification**

Stop the dev server, then run:

```bash
bun run build
bun run test
./node_modules/.bin/tsc --noEmit
git diff --check
```

Expected:

- `bun run build` exits `0` and generates 7 pages.
- `bun run test` reports `3 pass, 0 fail`.
- `tsc --noEmit` exits `0`.
- `git diff --check` exits `0`.

- [ ] **Step 7: Commit final visual tuning**

If Task 5 changed files, run:

```bash
git add src/styles/global.css src/scripts/synapse-field.ts src/pages/index.astro 'src/pages/[service].astro'
git commit -m "Tune modern dark studio visual balance"
```

If Task 5 made no file changes, skip this commit.

## Self-Review Checklist

- Spec coverage: Tasks cover CSS primitives, homepage header/hero, homepage sections, service route pages, synapse tuning, route verification, and anti-trope scanning.
- Completeness scan: This plan contains fully specified implementation steps and expected verification commands.
- Type consistency: The only data structures referenced are existing `services`, `serviceLinks`, `signalPoints`, `situations`, `approach`, and `capabilities`.
- Dependency check: No new packages, fonts, UI libraries, or icon libraries are introduced.
