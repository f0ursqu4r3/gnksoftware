# Signal Room Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the G&K Software homepage and service pages around the approved Signal Room brand direction.

**Architecture:** Keep the existing Astro routes and shared service data. Replace the warm serif-led visual system with dark operational tokens, sans-led typography, compact service lanes, and consistent header/footer/navigation patterns across homepage and service pages.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 4, Bun.

---

## Task 1: Design Tokens And Layout

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

- [ ] Replace warm neutral variables with Signal Room tokens: near-black base, off-white text, muted surfaces, green-gray borders, and one accent.
- [ ] Replace Google Fonts import with a sans-led family pair suitable for the operational brand direction.
- [ ] Keep body classes compatible with Tailwind and the existing layout slot.

## Task 2: Homepage Redesign

**Files:**
- Modify: `src/pages/index.astro`

- [ ] Replace the homepage markup with Signal Room structure: compact header, hero with signal panel, practice lanes, buyer situations, operating model, capabilities, founders, contact, and footer.
- [ ] Use `services` and `getServiceMailto` for service lanes and practice navigation.
- [ ] Preserve `#services`, `#approach`, `#founders`, and `#contact` anchors with scroll offsets.
- [ ] Keep founder images and GitHub profile links.

## Task 3: Service Page Redesign

**Files:**
- Modify: `src/pages/[service].astro`

- [ ] Apply the same dark operational header, hero, sections, related-practice links, contact CTA, and footer to every generated service page.
- [ ] Keep `getStaticPaths()`, route-specific metadata, and all existing service-data-driven sections.
- [ ] Keep mobile-safe practice navigation.

## Task 4: Verification

**Files:**
- No expected source changes.

- [ ] Run `bun run test`.
- [ ] Run `bun run build`.
- [ ] Run `./node_modules/.bin/tsc --noEmit`.
- [ ] If localhost binding is available, run the dev server and verify `/` plus all six service routes return `200` with expected content.
