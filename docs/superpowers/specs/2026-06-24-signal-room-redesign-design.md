# Signal Room Redesign Design

## Summary

Redesign the G&K Software site around the approved Signal Room direction: near-black, dense, operational, precise, and clearly positioned as a senior development house for software systems with real consequences.

The redesign keeps the existing routes, service data, founder proof, and direct development-shop positioning. It changes the brand system and page hierarchy so the site no longer reads as a warm consultancy page or generic SaaS landing page.

## Direction

Signal Room should feel like a senior engineering control room: measured, technical, high-contrast, and focused on decisions. The page should not use fake dashboard art, stock software screenshots, soft agency cards, gradient text, or decorative metrics.

The core homepage headline becomes:

> Software work for systems with consequences.

Supporting copy should stay direct:

> G&K Software is a small development house for teams that need senior builders close to the code. We build products, backends, automations, internal platforms, modernizations, and recoveries where failure has a real cost.

## Visual System

- Palette: near-black base, off-white type, muted green-gray surfaces, ruled borders, one signal accent.
- Typography: sans-led system with strong weight contrast. The current serif display role should be removed from the main UI because it pushes the brand toward editorial consultancy.
- Layout: dense but readable bands, compact service lanes, ruled rows, and operational grouping.
- Components: no soft cards, no large rounded corners, no metric strip template. Use panels, rails, tables, chips, and lists.
- Motion: optional minimal transitions only. Content must be visible without JavaScript and respect reduced motion.

## Homepage

The homepage should be restructured as:

1. Header
   - Compact G&K mark.
   - Homepage anchor links.
   - Mobile-safe practices disclosure listing all six service routes.
2. Hero
   - Primary Signal Room headline.
   - Direct supporting copy.
   - Primary CTA to services and secondary CTA to email.
   - A signal panel showing the six work lanes and three proof points.
3. Practice Lanes
   - Six services rendered from `services`.
   - Compact, ruled, scannable, with summary, bullets, route link, and service-specific mail link.
4. When Teams Call Us
   - Concrete buyer situations.
5. Operating Model
   - Four-step working model from the existing approach content.
6. Capabilities
   - Dense capability matrix.
7. Founders
   - Keep Gibson and Kyle images and GitHub links.
   - Keep public engineering breadth restrained and factual.
8. Contact
   - Clear prompt for sending project context.
9. Footer
   - Homepage and all practice links.

## Service Pages

Each service page should share the Signal Room system:

- Dark header and hero.
- Service title, promise, description, and email CTA.
- A compact lane panel with the service bullets.
- Good Fit, What We Build, How We Work, Typical Projects, Related Practices, and footer.
- Header and footer should expose all six practice routes.

## Technical Scope

Modify:

- `src/styles/global.css`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/[service].astro`

Keep:

- `src/data/services.ts` route/content structure.
- `src/data/services.test.ts`.
- Existing Astro/Tailwind stack.

## Verification

Run:

```sh
bun run test
bun run build
./node_modules/.bin/tsc --noEmit
```

If a dev server can bind locally, verify `/` and all six service routes return `200` and include expected content.

