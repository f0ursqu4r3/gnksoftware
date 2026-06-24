# Development Shop Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build six static service routes and update the homepage so G&K Software reads as a direct, technical, dependable development shop.

**Architecture:** Put all service content in one typed data module, then render both the homepage service summaries and dynamic Astro service pages from that data. Keep the current Astro/Tailwind setup, avoid new runtime dependencies, and use `bun run build` as the production verification.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 4, Bun.

---

## File Structure

- Create `src/data/services.ts`: canonical service-route data, helper lookup functions, related-service references, and reusable contact email helpers.
- Create `src/pages/[service].astro`: static dynamic route constrained to the six service slugs with route-specific metadata.
- Create `src/data/services.test.ts`: lightweight Bun test coverage for route completeness, unique slugs, and valid related links.
- Modify `src/pages/index.astro`: update homepage positioning, service navigation, founder proof, approach, capabilities, and footer links using the shared service data.
- Modify `package.json`: add a `test` script that runs the Bun test file.

## Task 1: Service Data Module

**Files:**
- Create: `src/data/services.ts`

- [ ] **Step 1: Create the data module**

Use `apply_patch` to add `src/data/services.ts` with:

```ts
export type ServiceSlug =
	| 'product-engineering'
	| 'backend-systems'
	| 'data-automation'
	| 'internal-platforms'
	| 'modernization'
	| 'technical-rescue';

export type Service = {
	slug: ServiceSlug;
	title: string;
	shortTitle: string;
	navLabel: string;
	promise: string;
	description: string;
	summary: string;
	homepageBullets: string[];
	goodFit: string[];
	builds: string[];
	howWeWork: string[];
	typicalProjects: string[];
	related: ServiceSlug[];
	ctaSubject: string;
	metaDescription: string;
};

export const contactEmail = 'hello@gnk.software';

export const services: Service[] = [
	{
		slug: 'product-engineering',
		title: 'Product Engineering',
		shortTitle: 'Products',
		navLabel: 'Product',
		promise: 'Build the product, not just the ticket list.',
		description:
			'We design and build production software for teams that need senior implementation, practical product judgment, and a maintainable path from first release to ongoing iteration.',
		summary: 'New products, MVPs, workflow apps, and production features built with senior engineering judgment.',
		homepageBullets: ['MVP and v1 builds', 'Feature delivery', 'Product architecture'],
		goodFit: [
			'You have a clear market or workflow need, but need a senior team to turn it into working software.',
			'Your internal engineers are focused elsewhere and need a partner who can own a product slice.',
			'Your prototype needs to become a reliable production application.',
			'You need product judgment and implementation in the same engagement.',
		],
		builds: [
			'Customer-facing web applications',
			'Workflow applications for specialized teams',
			'MVPs and first production releases',
			'Feature sets inside existing products',
			'Product architecture, data models, and release paths',
		],
		howWeWork: [
			'Map the product surface, users, constraints, and first useful release.',
			'Build in thin vertical slices so real behavior is visible early.',
			'Keep architecture simple enough to ship and strong enough to extend.',
			'Hand off code, decisions, and operating notes without hiding work in agency process.',
		],
		typicalProjects: [
			'Turn a spreadsheet-backed service into a real web product.',
			'Build a customer portal around existing operational data.',
			'Add a complex workflow to an existing SaaS product.',
			'Move a prototype into production with authentication, permissions, and deployment.',
		],
		related: ['backend-systems', 'internal-platforms', 'data-automation'],
		ctaSubject: 'Product engineering project',
		metaDescription:
			'Product engineering by G&K Software: MVPs, workflow apps, customer portals, and production features built by senior engineers.',
	},
	{
		slug: 'backend-systems',
		title: 'Backend Systems',
		shortTitle: 'Backends',
		navLabel: 'Backend',
		promise: 'Reliable services for the parts users never see.',
		description:
			'We build APIs, workers, integrations, and service layers for teams that need correctness, observability, and operational maintainability.',
		summary: 'APIs, services, integrations, workers, and data contracts for software that has to keep running.',
		homepageBullets: ['API design', 'Service architecture', 'Workers and queues'],
		goodFit: [
			'Your system depends on integrations, background jobs, or data flows that are hard to reason about.',
			'Your frontend or product team is blocked by missing backend capacity.',
			'You need a clean service boundary around messy operational logic.',
			'Reliability, auditability, and maintainability matter more than novelty.',
		],
		builds: [
			'REST and internal APIs',
			'Background workers and job orchestration',
			'Integration services between third-party and internal systems',
			'Data contracts, validation layers, and operational dashboards',
			'Observability, logging, and failure handling around critical flows',
		],
		howWeWork: [
			'Identify the real system boundaries and the data contracts that need to hold.',
			'Design for failure cases before they become production incidents.',
			'Build small, testable services with explicit operating behavior.',
			'Document the interfaces and handoff points your team will own after delivery.',
		],
		typicalProjects: [
			'Build a service layer between a product UI and legacy operational systems.',
			'Replace manual imports with reliable queued processing.',
			'Create partner or internal APIs with clear contracts and monitoring.',
			'Stabilize background jobs that currently fail silently.',
		],
		related: ['data-automation', 'modernization', 'technical-rescue'],
		ctaSubject: 'Backend systems project',
		metaDescription:
			'Backend systems by G&K Software: APIs, services, workers, integrations, and operationally reliable software foundations.',
	},
	{
		slug: 'data-automation',
		title: 'Data Automation',
		shortTitle: 'Automation',
		navLabel: 'Automation',
		promise: 'Replace recurring manual work with trusted data flows.',
		description:
			'We automate data movement, reporting, validation, and operational handoffs so teams can stop relying on brittle spreadsheets and repeated manual checks.',
		summary: 'Pipelines, reporting workflows, validations, and operational automations that reduce manual work.',
		homepageBullets: ['Data pipelines', 'Report automation', 'Validation workflows'],
		goodFit: [
			'People are copying data between tools every week because no reliable workflow exists.',
			'Reports or operational updates depend on fragile spreadsheets and undocumented steps.',
			'Your team needs validation, audit trails, and repeatability around important data movement.',
			'You have useful data locked across systems and need it to move cleanly.',
		],
		builds: [
			'ETL and ELT workflows',
			'Automated reporting and export pipelines',
			'Data validation and reconciliation jobs',
			'Operational notifications and handoff automation',
			'Lightweight admin screens for data review and correction',
		],
		howWeWork: [
			'Trace the current manual process and identify the decisions humans still need to own.',
			'Define source-of-truth rules, validation failures, and retry behavior.',
			'Automate the repeatable path while keeping exceptions visible.',
			'Leave behind clear operating notes for monitoring, corrections, and ownership.',
		],
		typicalProjects: [
			'Automate weekly reporting from internal systems and vendor exports.',
			'Build a data reconciliation workflow for finance or operations.',
			'Move recurring spreadsheet work into a repeatable pipeline.',
			'Create validation checks before data enters a downstream system.',
		],
		related: ['internal-platforms', 'backend-systems', 'modernization'],
		ctaSubject: 'Data automation project',
		metaDescription:
			'Data automation by G&K Software: pipelines, report automation, validation workflows, and operational data movement.',
	},
	{
		slug: 'internal-platforms',
		title: 'Internal Platforms',
		shortTitle: 'Platforms',
		navLabel: 'Platforms',
		promise: 'Tools for the teams running the business.',
		description:
			'We build internal tools, portals, and operational platforms that make daily work clearer, faster, and less dependent on tribal knowledge.',
		summary: 'Internal tools, admin systems, portals, and operational platforms for teams that need better workflows.',
		homepageBullets: ['Admin systems', 'Internal portals', 'Workflow tools'],
		goodFit: [
			'Your team runs important workflows through email, spreadsheets, and one-off scripts.',
			'Existing tools do not match how the business actually operates.',
			'You need permissions, audit trails, and usability without buying a bloated platform.',
			'Operations teams need software that removes friction rather than adding another system to babysit.',
		],
		builds: [
			'Internal admin applications',
			'Role-based portals and workflow tools',
			'Approval, review, and exception-handling systems',
			'Dashboards tied to real operational actions',
			'Integrations across CRMs, ERPs, payment systems, and internal databases',
		],
		howWeWork: [
			'Start with the operators and the decisions they make every day.',
			'Design workflows around real permissions, handoffs, and exception states.',
			'Integrate with the systems already in place instead of forcing a clean-room rewrite.',
			'Build tools your team can understand, operate, and extend.',
		],
		typicalProjects: [
			'Create an internal portal for onboarding, review, and approvals.',
			'Build a custom admin system around existing backend data.',
			'Replace a patchwork of spreadsheets with a controlled workflow app.',
			'Give operations teams a reliable way to manage exceptions and handoffs.',
		],
		related: ['product-engineering', 'data-automation', 'backend-systems'],
		ctaSubject: 'Internal platform project',
		metaDescription:
			'Internal platform development by G&K Software: admin tools, portals, workflow apps, and operational systems.',
	},
	{
		slug: 'modernization',
		title: 'Modernization',
		shortTitle: 'Modernize',
		navLabel: 'Modernize',
		promise: 'Upgrade critical systems without losing the business logic.',
		description:
			'We modernize legacy software incrementally, reducing risk while preserving the workflows, rules, and operational knowledge the business still depends on.',
		summary: 'Incremental upgrades, migrations, and refactors for systems that cannot simply be replaced.',
		homepageBullets: ['Legacy upgrades', 'Migration planning', 'Incremental refactors'],
		goodFit: [
			'Your system is aging, but it still runs important business processes.',
			'Rewrites feel risky because the real rules live in code, data, and long-time operators.',
			'You need a modernization path that can run alongside current operations.',
			'The architecture needs clearer boundaries before future product work can move quickly.',
		],
		builds: [
			'Modernization assessments and migration plans',
			'Service extraction and modularization',
			'API layers around legacy systems',
			'Data migration and compatibility workflows',
			'Incremental refactors with production guardrails',
		],
		howWeWork: [
			'Map the system behavior before recommending changes.',
			'Identify low-risk migration paths and pilot flows.',
			'Preserve business rules while improving interfaces, deployment, and observability.',
			'Modernize in increments your team and users can absorb.',
		],
		typicalProjects: [
			'Wrap a legacy application with modern APIs.',
			'Migrate critical workflows out of an aging codebase in phases.',
			'Split a monolithic backend along real operational boundaries.',
			'Prepare an old system for new product or platform work.',
		],
		related: ['backend-systems', 'technical-rescue', 'data-automation'],
		ctaSubject: 'Modernization project',
		metaDescription:
			'Software modernization by G&K Software: legacy upgrades, migrations, refactors, and incremental paths away from brittle systems.',
	},
	{
		slug: 'technical-rescue',
		title: 'Technical Rescue',
		shortTitle: 'Rescue',
		navLabel: 'Rescue',
		promise: 'Stabilize the project, then make the next move clear.',
		description:
			'We help teams recover troubled software projects, production problems, stalled builds, and systems where the path forward has become unclear.',
		summary: 'Assessment, triage, stabilization, and focused repair for software projects under pressure.',
		homepageBullets: ['Codebase assessment', 'Production triage', 'Stabilization plans'],
		goodFit: [
			'A launch, migration, or integration is stuck and the current path is not working.',
			'Production issues keep returning and nobody has a confident explanation.',
			'You inherited a codebase and need to understand risk quickly.',
			'The project needs senior technical judgment before more money or time is spent.',
		],
		builds: [
			'Rapid codebase and architecture assessments',
			'Production issue triage and remediation plans',
			'Stabilization fixes for brittle workflows',
			'Observability and debugging improvements',
			'Recovery plans for stalled builds, migrations, or integrations',
		],
		howWeWork: [
			'Start with symptoms, timelines, and the system areas under pressure.',
			'Inspect the code, data, deployment, and operating signals before prescribing fixes.',
			'Separate urgent stabilization from longer-term architecture work.',
			'Leave you with a clear decision record: what is fixed, what remains risky, and what to do next.',
		],
		typicalProjects: [
			'Assess a troubled vendor-built application before taking ownership.',
			'Stabilize an integration that fails during critical operations.',
			'Debug recurring production failures with poor observability.',
			'Create a practical recovery plan for a stalled rewrite or migration.',
		],
		related: ['modernization', 'backend-systems', 'product-engineering'],
		ctaSubject: 'Technical rescue request',
		metaDescription:
			'Technical rescue by G&K Software: codebase assessment, production triage, stabilization, and recovery planning for troubled software projects.',
	},
];

export const serviceSlugs = services.map((service) => service.slug);

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
	return service.related
		.map((slug) => getServiceBySlug(slug))
		.filter((relatedService): relatedService is Service => Boolean(relatedService));
}

export function getServiceMailto(service: Pick<Service, 'ctaSubject'>): string {
	return `mailto:${contactEmail}?subject=${encodeURIComponent(service.ctaSubject)}`;
}
```

- [ ] **Step 2: Run a TypeScript parse check through the build later**

No standalone TypeScript check exists in this project. This file will be validated by `bun run build` after route and homepage imports are added.

## Task 2: Service Data Test

**Files:**
- Create: `src/data/services.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add the failing test**

Use `apply_patch` to add `src/data/services.test.ts`:

```ts
import { describe, expect, test } from 'bun:test';
import { getRelatedServices, getServiceBySlug, serviceSlugs, services } from './services';

const expectedSlugs = [
	'product-engineering',
	'backend-systems',
	'data-automation',
	'internal-platforms',
	'modernization',
	'technical-rescue',
];

describe('services data', () => {
	test('defines exactly the approved service routes', () => {
		expect(serviceSlugs).toEqual(expectedSlugs);
	});

	test('keeps slugs unique and lookupable', () => {
		expect(new Set(serviceSlugs).size).toBe(serviceSlugs.length);

		for (const service of services) {
			expect(getServiceBySlug(service.slug)).toBe(service);
			expect(service.homepageBullets).toHaveLength(3);
			expect(service.related.length).toBeGreaterThanOrEqual(2);
		}
	});

	test('uses valid related service references', () => {
		for (const service of services) {
			const related = getRelatedServices(service);

			expect(related.map((item) => item.slug)).toEqual(service.related);
			expect(related).not.toContain(service);
		}
	});
});
```

- [ ] **Step 2: Add the test script**

Modify `package.json` scripts to include:

```json
"test": "bun test"
```

- [ ] **Step 3: Run the test to verify the data contract**

Run:

```sh
bun run test
```

Expected: PASS with `3 pass`.

## Task 3: Dynamic Service Route

**Files:**
- Create: `src/pages/[service].astro`

- [ ] **Step 1: Add the dynamic route template**

Use `apply_patch` to create `src/pages/[service].astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import { getRelatedServices, getServiceMailto, services, type Service } from '../data/services';

export function getStaticPaths() {
	return services.map((service) => ({
		params: { service: service.slug },
		props: { service },
	}));
}

const { service } = Astro.props as { service: Service };
const relatedServices = getRelatedServices(service);
---

<Layout
	title={`${service.title} | G&K Software`}
	description={service.metaDescription}
>
	<main class="flex w-full flex-col pb-16">
		<header class="sticky top-0 z-10 w-full border-b border-(--color-line) bg-(--color-panel)/95 py-4 shadow-(--shadow-soft) backdrop-blur">
			<div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5">
				<a class="flex items-center gap-3" href="/" aria-label="G&K Software home">
					<span class="flex h-11 w-11 items-center justify-center border border-(--color-ink) bg-(--color-ink) text-sm font-black text-(--color-cream)">
						G&K
					</span>
					<span>
						<span class="block text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink-muted)">G&K Software</span>
						<span class="block text-sm text-(--color-ink-soft)">Development shop</span>
					</span>
				</a>
				<nav class="flex flex-wrap items-center gap-3" aria-label="Service page navigation">
					<a class="text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-ink)" href="/#services">Services</a>
					<a class="text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-ink)" href="/#founders">Founders</a>
					<a class="text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-ink)" href="/#contact">Contact</a>
					<a
						class="inline-flex items-center justify-center border border-(--color-ink) bg-(--color-ink) px-4 py-2 text-sm font-semibold text-(--color-cream) transition hover:brightness-110"
						href={getServiceMailto(service)}
					>
						Start a conversation
					</a>
				</nav>
			</div>
		</header>

		<section class="border-b border-(--color-line) bg-(--color-panel) py-12">
			<div class="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[1.25fr,0.75fr]">
				<div class="space-y-5">
					<a class="text-sm font-semibold text-(--color-ink-muted) underline underline-offset-4" href="/">Back to G&K Software</a>
					<h1 class="font-['DM_Serif_Display'] text-4xl leading-tight text-(--color-ink) md:text-6xl">{service.title}</h1>
					<p class="max-w-3xl text-2xl leading-tight text-(--color-ink)">{service.promise}</p>
					<p class="max-w-3xl text-base leading-7 text-(--color-ink-soft)">{service.description}</p>
					<a
						class="inline-flex items-center justify-center border border-(--color-ink) bg-(--color-ink) px-5 py-3 text-sm font-semibold text-(--color-cream) transition hover:brightness-110"
						href={getServiceMailto(service)}
					>
						Discuss this work
					</a>
				</div>
				<aside class="border-t border-(--color-line) pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink-muted)">Typical work</p>
					<ul class="mt-4 space-y-3 text-sm leading-6 text-(--color-ink-soft)">
						{service.homepageBullets.map((bullet) => <li class="border-t border-(--color-line) pt-3">{bullet}</li>)}
					</ul>
				</aside>
			</div>
		</section>

		<section class="border-b border-(--color-line) bg-(--color-panel-strong) py-10">
			<div class="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[0.75fr,1.25fr]">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink-muted)">Good fit when</p>
					<h2 class="mt-2 font-['DM_Serif_Display'] text-3xl text-(--color-ink)">This is the right lane.</h2>
				</div>
				<ul class="grid gap-3 text-sm leading-6 text-(--color-ink-soft) md:grid-cols-2">
					{service.goodFit.map((item) => <li class="border-t border-(--color-line) pt-3">{item}</li>)}
				</ul>
			</div>
		</section>

		<section class="border-b border-(--color-line) bg-(--color-ink) py-10 text-(--color-cream)">
			<div class="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-2">
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-cream)/75">What we build</p>
					<h2 class="font-['DM_Serif_Display'] text-3xl">Concrete deliverables, not vague capacity.</h2>
					<ul class="space-y-3 text-sm leading-6 text-(--color-cream)/90">
						{service.builds.map((item) => <li class="border-t border-(--color-cream)/30 pt-3">{item}</li>)}
					</ul>
				</div>
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-cream)/75">How we work</p>
					<h2 class="font-['DM_Serif_Display'] text-3xl">Small-team execution with visible decisions.</h2>
					<ul class="space-y-3 text-sm leading-6 text-(--color-cream)/90">
						{service.howWeWork.map((item) => <li class="border-t border-(--color-cream)/30 pt-3">{item}</li>)}
					</ul>
				</div>
			</div>
		</section>

		<section class="border-b border-(--color-line) bg-(--color-panel) py-10">
			<div class="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[0.75fr,1.25fr]">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink-muted)">Typical projects</p>
					<h2 class="mt-2 font-['DM_Serif_Display'] text-3xl text-(--color-ink)">Work we can step into.</h2>
				</div>
				<ul class="grid gap-3 text-sm leading-6 text-(--color-ink-soft) md:grid-cols-2">
					{service.typicalProjects.map((item) => <li class="border-t border-(--color-line) pt-3">{item}</li>)}
				</ul>
			</div>
		</section>

		<section class="bg-(--color-panel-strong) py-10">
			<div class="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[1fr,1fr]">
				<div class="space-y-3">
					<p class="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-ink-muted)">Related practices</p>
					<h2 class="font-['DM_Serif_Display'] text-3xl text-(--color-ink)">Adjacent work often matters.</h2>
					<div class="flex flex-wrap gap-3">
						{relatedServices.map((related) => (
							<a class="border border-(--color-line) bg-(--color-panel) px-3 py-2 text-sm font-semibold text-(--color-ink) hover:border-(--color-ink-muted)" href={`/${related.slug}`}>
								{related.title}
							</a>
						))}
					</div>
				</div>
				<div class="space-y-3 border-t border-(--color-line) pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
					<h2 class="font-['DM_Serif_Display'] text-3xl text-(--color-ink)">Have a project in this lane?</h2>
					<p class="text-sm leading-7 text-(--color-ink-soft)">
						Send the current state, what is blocked, and what a useful first milestone would look like. We will respond with a practical next step.
					</p>
					<a
						class="inline-flex items-center justify-center border border-(--color-ink) bg-(--color-ink) px-5 py-3 text-sm font-semibold text-(--color-cream) transition hover:brightness-110"
						href={getServiceMailto(service)}
					>
						Email G&K about {service.shortTitle.toLowerCase()}
					</a>
				</div>
			</div>
		</section>
	</main>
</Layout>
```

- [ ] **Step 2: Run the production build**

Run:

```sh
bun run build
```

Expected: PASS and generated pages for all six slugs.

## Task 4: Homepage Development-Shop Rewrite

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace page data and imports**

Update the frontmatter so it imports shared service data and removes old modernization-only arrays:

```astro
---
import Layout from '../layouts/Layout.astro';
import gibson from '../assets/gibson.png';
import kyle from '../assets/kyle.png';
import { contactEmail, getServiceMailto, services } from '../data/services';

const proofPoints = [
	'Founder-led engineering, not account management theater.',
	'Product, platform, automation, backend, modernization, and recovery work.',
	'Small-team delivery with visible technical decisions.',
];

const industries = [
	'Startups and founder-led product teams',
	'Operations-heavy service businesses',
	'Finance, logistics, and healthcare workflows',
	'Teams maintaining older business-critical systems',
	'Organizations with internal tools that need real ownership',
	'Product teams that need senior backend and platform depth',
];

const approach = [
	{
		title: 'Map the actual system',
		body: 'We start with the users, workflows, data, code, and operational constraints that define the real project.',
	},
	{
		title: 'Ship in useful slices',
		body: 'We prefer visible milestones, working software, and clear tradeoffs over long discovery phases with little evidence.',
	},
	{
		title: 'Keep the work ownable',
		body: 'We leave behind code, notes, decisions, and handoff paths your team can understand after the engagement.',
	},
	{
		title: 'Stay close to the builders',
		body: 'You work directly with the founders doing the technical work, not a layer of coordinators translating the work.',
	},
];

const capabilities = [
	'Product architecture and implementation',
	'API and backend service design',
	'Data automation and validation',
	'Internal tool and portal development',
	'Legacy system modernization',
	'Technical assessment and rescue',
	'Workflow and integration design',
	'Observability and operational handoff',
	'Deployment and release paths',
];

const serviceLinks = services.map((service) => ({
	...service,
	href: `/${service.slug}`,
}));
---
```

- [ ] **Step 2: Replace the page markup**

Replace the existing `<main>` content with a development-shop homepage that:

- Uses `serviceLinks` for nav, service cards, and footer practice links.
- Uses hero copy: `Senior software development for products, platforms, automation, and hard systems work.`
- Uses `#services`, `#approach`, `#founders`, and `#contact` anchors.
- Links founder GitHub profiles:
  - Gibson Martin: `https://github.com/wegfawefgawefg`
  - Kyle Dougan: `https://github.com/f0ursqu4r3`
- Uses `mailto:${contactEmail}` for direct email links and `getServiceMailto(services[0])` only where a specific service CTA is needed.

- [ ] **Step 3: Run the production build**

Run:

```sh
bun run build
```

Expected: PASS with homepage and six service pages generated.

## Task 5: Visual and Link Verification

**Files:**
- No expected source changes unless verification finds a defect.

- [ ] **Step 1: Run all tests**

Run:

```sh
bun run test
bun run build
```

Expected: both commands pass.

- [ ] **Step 2: Start the dev server**

Run:

```sh
bun run dev
```

Expected: Astro starts on `http://localhost:4321/` or the next available port.

- [ ] **Step 3: Verify pages in a browser**

Check desktop and mobile widths for:

- `/`
- `/product-engineering`
- `/backend-systems`
- `/data-automation`
- `/internal-platforms`
- `/modernization`
- `/technical-rescue`

Expected:

- No blank pages.
- No text overflow in buttons, headers, or service links.
- Header and footer links navigate correctly.
- Service pages show the correct title and related practices.
- The site reads as a development shop, not a generic SaaS landing page.

- [ ] **Step 4: Stop the dev server**

Stop the running dev server before ending the task.

