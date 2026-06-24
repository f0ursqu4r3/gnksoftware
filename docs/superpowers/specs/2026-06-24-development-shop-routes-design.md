# Development Shop Routes Design

## Summary

Reposition the G&K Software website from a narrow modernization consultancy into a founder-led development shop with six service routes:

- `/product-engineering`
- `/backend-systems`
- `/data-automation`
- `/internal-platforms`
- `/modernization`
- `/technical-rescue`

The homepage should introduce G&K as a direct, technical, dependable development partner, then route visitors into the practice that matches their need. Each service page should share a consistent structure so the site feels coherent and maintainable.

## Goals

- Present G&K as a development shop with multiple concrete practices.
- Keep the site direct and technical rather than generic or SaaS-like.
- Use Enroute Systems as a structural reference: practice pages, clear service positioning, and solution-oriented navigation.
- Keep the current Astro/Tailwind stack and reuse the existing visual foundation unless implementation reveals a clear reason to change it.
- Add enough content depth that each route can stand on its own for buyers, referrals, and procurement conversations.

## Non-goals

- Do not create a fake product dashboard or SaaS-style hero.
- Do not redesign the site into a flashy agency portfolio.
- Do not make founder GitHub profiles the main sales proof.
- Do not add a CMS, backend, or new dependency for these static pages.

## Information Architecture

The homepage should include primary navigation to the six practice routes and should retain anchor navigation for approach, founders, and contact. The footer should also expose the practice links.

The six routes should be generated from shared service data to avoid duplicated page structure. Service pages should cross-link to related practices so visitors can move between adjacent needs, for example:

- Product engineering links to backend systems and internal platforms.
- Backend systems links to data automation and modernization.
- Data automation links to internal platforms and backend systems.
- Internal platforms links to product engineering and data automation.
- Modernization links to backend systems and technical rescue.
- Technical rescue links to modernization and backend systems.

## Homepage Design

The homepage should shift its lead message from modernization-only to development-shop positioning. Proposed hero promise:

> Senior software development for products, platforms, automation, and hard systems work.

The hero should explain that G&K designs, builds, stabilizes, and modernizes software systems for teams that need experienced builders with low process overhead.

The services section should become the primary scanning area. Each service summary should include:

- Service title
- One direct sentence about the buyer problem
- Three capability bullets
- Link to the route

The founder section should stay, but the language should emphasize hands-on builders and public engineering breadth. The supplied GitHub profiles can be linked as supporting proof:

- `https://github.com/wegfawefgawefg`
- `https://github.com/f0ursqu4r3`

Use only conservative claims from public information, such as public repositories and visible areas of work. Do not quote informal profile copy.

## Service Page Template

Each route should follow this structure:

1. Hero
   - Service title
   - Specific promise
   - Short description
   - Primary CTA: email with service-specific subject
2. Good Fit
   - Situations where this service is relevant
3. What We Build
   - Concrete deliverables and system types
4. How We Work
   - Discovery, delivery, integration, and handoff patterns
5. Typical Projects
   - Example engagements that help buyers self-identify
6. Related Practices
   - Two or three service links
7. Contact CTA
   - Service-specific email link

## Route Content Direction

### Product Engineering

Build new software products, MVPs, workflow apps, and production features with a senior engineering team. Emphasize product judgment, implementation depth, and maintainable launch paths.

### Backend Systems

Design and build APIs, services, integrations, job workers, and high-reliability backend components. Emphasize data contracts, reliability, observability, and operational maintainability.

### Data Automation

Automate data movement, reporting workflows, operational handoffs, and recurring manual processes. Emphasize clean pipelines, validation, auditability, and reducing brittle spreadsheet/manual work.

### Internal Platforms

Build internal tools, portals, admin systems, and operational platforms for teams that run the business. Emphasize usable workflows, permissions, audit trails, and pragmatic integration with existing systems.

### Modernization

Upgrade legacy systems incrementally without disrupting critical operations. Emphasize risk reduction, migration planning, modularization, and preserving business logic while improving the architecture.

### Technical Rescue

Stabilize troubled software projects, production issues, stalled builds, or systems with unclear ownership. Emphasize fast assessment, triage, remediation plans, and hands-on fixes.

## Visual Direction

Preserve the existing restrained identity: serif display headings, sans body text, warm neutral surfaces, hard-edged panels, and direct typographic hierarchy. Tighten the site so it feels more like a technical development shop and less like a narrow enterprise modernization landing page.

Avoid common SaaS patterns: fake UI screenshots, gradient text, over-polished metric strips, generic icon cards, and vague CTA language.

## Technical Design

Create a shared service data module, likely `src/data/services.ts`, with route slugs, titles, descriptions, bullets, related links, and CTA subjects.

Add a dynamic Astro route at `src/pages/[service].astro` with `getStaticPaths()` constrained to the six approved slugs. The route should render the shared service template and return no other dynamic pages.

Update `src/pages/index.astro` to import the service data and render the homepage service section from it. Existing arrays that only describe the old modernization focus should be removed or revised.

Keep `src/layouts/Layout.astro` as the metadata wrapper. Pass route-specific title and description values from service pages.

## Testing

Run the production build with the existing package manager command:

```sh
bun run build
```

If a dev server is needed for visual checks, run:

```sh
bun run dev
```

Then verify at least:

- `/`
- `/product-engineering`
- `/backend-systems`
- `/data-automation`
- `/internal-platforms`
- `/modernization`
- `/technical-rescue`

Check mobile and desktop layouts for text overflow, broken links, inaccessible contrast, and confusing navigation.

## Open Decisions

No open blocking decisions. The approved direction is practice pages with shared structure, direct technical positioning, and no generic SaaS landing-page treatment.
