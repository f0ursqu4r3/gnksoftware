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
		navLabel: 'Product Engineering',
		promise: 'Ship focused software products with production discipline from the first release.',
		description:
			'We design and build new software products, MVPs, workflow applications, and production features that have to survive real operators, real data, and real support pressure.',
		summary:
			'Product engineering for teams that need working software, not throwaway prototypes.',
		homepageBullets: [
			'MVPs that prove the workflow without painting the architecture into a corner.',
			'Production features built with testable logic, clear interfaces, and deployment paths.',
			'Workflow applications that replace fragile handoffs with reliable software.',
		],
		goodFit: [
			'You need a first version that can become the long-term product.',
			'Your team has domain knowledge but needs engineering execution.',
			'The product depends on real business rules, permissions, and integrations.',
			'You want a small team that can move from specification to shipped code.',
		],
		builds: [
			'Customer-facing web applications',
			'Workflow and approval systems',
			'MVPs and pilot products',
			'Production feature sets',
			'Integration-backed product surfaces',
		],
		howWeWork: [
			'Define the workflow, roles, and critical paths before implementation.',
			'Build thin vertical slices that prove the riskiest behavior first.',
			'Keep domain logic explicit and covered by focused tests.',
			'Release in increments that operators can validate against real cases.',
		],
		typicalProjects: [
			'New portal for a service-heavy business process',
			'MVP for a data-backed operational product',
			'Role-based workflow app for internal and external users',
			'Feature expansion for an existing product under active use',
		],
		related: ['backend-systems', 'internal-platforms', 'data-automation'],
		ctaSubject: 'Product engineering project',
		metaDescription:
			'Product engineering for MVPs, workflow applications, and production software features built with durable technical foundations.',
	},
	{
		slug: 'backend-systems',
		title: 'Backend Systems',
		shortTitle: 'Backends',
		navLabel: 'Backend Systems',
		promise: 'Build the services, integrations, and data contracts that keep software reliable.',
		description:
			'We build APIs, services, integrations, workers, data contracts, and observability paths for systems where correctness and operability matter.',
		summary:
			'Backend systems for products and operations that need dependable interfaces and clear behavior.',
		homepageBullets: [
			'APIs and services with explicit contracts and failure handling.',
			'Workers and integrations built for retries, monitoring, and auditability.',
			'Backend foundations that make product features easier to ship safely.',
		],
		goodFit: [
			'Your product needs stable APIs or service boundaries.',
			'Existing integrations are brittle, opaque, or difficult to operate.',
			'Background jobs and data movement need better reliability.',
			'You need observability before the next scaling or support problem.',
		],
		builds: [
			'HTTP APIs and service layers',
			'Integration services',
			'Background workers and queues',
			'Data contracts and validation layers',
			'Logging, metrics, and operational dashboards',
		],
		howWeWork: [
			'Document contracts before coupling clients to new behavior.',
			'Design failure modes, retries, and idempotency into the first implementation.',
			'Add observability where support and operations will actually use it.',
			'Keep service boundaries aligned with business capabilities.',
		],
		typicalProjects: [
			'API layer for a new product surface',
			'Integration service between operational systems',
			'Queue-backed worker system for slow or unreliable dependencies',
			'Backend refactor to isolate unstable responsibilities',
		],
		related: ['data-automation', 'modernization', 'technical-rescue'],
		ctaSubject: 'Backend systems project',
		metaDescription:
			'Backend engineering for APIs, services, integrations, workers, data contracts, and observability in operational software.',
	},
	{
		slug: 'data-automation',
		title: 'Data Automation',
		shortTitle: 'Automation',
		navLabel: 'Data Automation',
		promise: 'Turn brittle manual data work into traceable, repeatable software workflows.',
		description:
			'We automate data movement, reporting, validation, and operational handoffs where spreadsheets, copy-paste, and manual checks are slowing the business down.',
		summary:
			'Data automation that reduces manual handling while keeping validation and ownership visible.',
		homepageBullets: [
			'Automated data movement with validation at each boundary.',
			'Reporting pipelines that reduce spreadsheet maintenance and manual cleanup.',
			'Operational handoffs that are tracked, repeatable, and easier to audit.',
		],
		goodFit: [
			'Critical reports depend on manual spreadsheet work.',
			'Teams copy data between systems because no reliable handoff exists.',
			'Data quality problems are discovered too late in the process.',
			'You need automation that operators can understand and trust.',
		],
		builds: [
			'Data import and export workflows',
			'Validation and reconciliation tools',
			'Operational reporting pipelines',
			'Scheduled data jobs',
			'System-to-system handoff automation',
		],
		howWeWork: [
			'Map the current manual process before replacing it.',
			'Identify the checks that prevent bad data from moving downstream.',
			'Build audit trails for data changes, approvals, and exceptions.',
			'Keep operators in control where judgment is still required.',
		],
		typicalProjects: [
			'Spreadsheet replacement for recurring operational reports',
			'Validated import flow for customer or vendor data',
			'Reconciliation workflow between finance and operations systems',
			'Scheduled reporting pipeline with exception handling',
		],
		related: ['internal-platforms', 'backend-systems', 'modernization'],
		ctaSubject: 'Data automation project',
		metaDescription:
			'Data automation for reporting, validation, operational handoffs, and reducing brittle spreadsheet-driven manual work.',
	},
	{
		slug: 'internal-platforms',
		title: 'Internal Platforms',
		shortTitle: 'Platforms',
		navLabel: 'Internal Platforms',
		promise: 'Give operators the internal tools they need to run complex work with less friction.',
		description:
			'We build internal tools, portals, admin systems, and operational platforms that make high-value business processes easier to manage, inspect, and improve.',
		summary:
			'Internal platforms for operational teams that need better control over complex workflows.',
		homepageBullets: [
			'Admin systems that expose the right controls without exposing implementation details.',
			'Operational portals built around roles, status, exceptions, and throughput.',
			'Internal tools that connect data, decisions, and handoffs in one place.',
		],
		goodFit: [
			'Your team runs core work across too many disconnected tools.',
			'Operators need clearer status, ownership, and exception handling.',
			'Admin work requires engineering help for routine changes.',
			'You want software shaped around the way the business actually runs.',
		],
		builds: [
			'Internal portals',
			'Admin and back-office systems',
			'Operational dashboards',
			'Role-based workflow tools',
			'Case management and review interfaces',
		],
		howWeWork: [
			'Start with the operating model, not the screen list.',
			'Design permissions, audit history, and exceptions as core behavior.',
			'Build interfaces that make repeated work fast and reviewable.',
			'Use existing systems where they are useful and replace only the brittle parts.',
		],
		typicalProjects: [
			'Operations portal for tracking cases and exceptions',
			'Admin system for support and account management teams',
			'Internal review workflow with role-based approvals',
			'Tooling layer over existing backend or data systems',
		],
		related: ['product-engineering', 'data-automation', 'backend-systems'],
		ctaSubject: 'Internal platform project',
		metaDescription:
			'Internal platform engineering for portals, admin systems, internal tools, and operational software that supports real business workflows.',
	},
	{
		slug: 'modernization',
		title: 'Modernization',
		shortTitle: 'Modernization',
		navLabel: 'Modernization',
		promise: 'Upgrade legacy systems incrementally while preserving the business logic that still works.',
		description:
			'We modernize legacy software through focused migrations, refactors, replacements, and extraction work that reduces risk without stopping the business.',
		summary:
			'Incremental modernization for systems that need technical change without operational disruption.',
		homepageBullets: [
			'Legacy upgrades that protect the rules the business still depends on.',
			'Incremental migrations with clear checkpoints and rollback paths.',
			'Refactors that reduce change risk instead of creating a second fragile system.',
		],
		goodFit: [
			'The current system works, but every change is slow or risky.',
			'Business logic is trapped in old code, spreadsheets, or one-off scripts.',
			'You need to migrate without a long rewrite freeze.',
			'Support costs are rising because the architecture is hard to reason about.',
		],
		builds: [
			'Incremental replacement layers',
			'Legacy API wrappers',
			'Data migration and reconciliation tooling',
			'Refactored domain modules',
			'Operational safety checks for migration paths',
		],
		howWeWork: [
			'Inventory critical behavior before changing implementation details.',
			'Choose migration slices that can be verified independently.',
			'Preserve data integrity with reconciliation and comparison checks.',
			'Leave the system easier to operate after each phase.',
		],
		typicalProjects: [
			'Migration from a fragile legacy backend to a maintained service layer',
			'Extraction of business logic from scripts into tested modules',
			'Database or schema transition with reconciliation tooling',
			'Refactor of a high-change subsystem blocking product work',
		],
		related: ['backend-systems', 'technical-rescue', 'data-automation'],
		ctaSubject: 'Modernization project',
		metaDescription:
			'Incremental software modernization for legacy upgrades, migrations, refactors, and preserving critical business logic.',
	},
	{
		slug: 'technical-rescue',
		title: 'Technical Rescue',
		shortTitle: 'Rescue',
		navLabel: 'Technical Rescue',
		promise: 'Assess, stabilize, and recover software projects that are stuck or at risk.',
		description:
			'We help teams triage troubled software projects, stabilize critical paths, identify failure points, and build a recovery plan grounded in the real code and operating constraints.',
		summary:
			'Technical rescue for software projects that need clear assessment and practical stabilization.',
		homepageBullets: [
			'Fast assessment of architecture, delivery risk, and operational failure points.',
			'Triage plans that separate urgent stabilization from longer-term repair.',
			'Recovery work focused on the code paths and workflows that matter most.',
		],
		goodFit: [
			'A project is late, unstable, or difficult to finish with the current approach.',
			'You need an independent technical read before making a major decision.',
			'Production issues are consuming the team and blocking planned work.',
			'The codebase needs stabilization before new features can continue.',
		],
		builds: [
			'Technical assessments',
			'Stabilization plans',
			'Production issue triage',
			'Recovery roadmaps',
			'Critical-path fixes and hardening work',
		],
		howWeWork: [
			'Inspect the running system, codebase, deployment path, and support history.',
			'Identify the smallest set of fixes that reduces immediate risk.',
			'Separate symptoms from structural problems before recommending larger changes.',
			'Document the recovery path in terms leadership and engineers can both use.',
		],
		typicalProjects: [
			'Independent review of a stalled product build',
			'Stabilization of a fragile production workflow',
			'Recovery plan after failed handoff or vendor transition',
			'Triage of recurring incidents in a business-critical system',
		],
		related: ['modernization', 'backend-systems', 'product-engineering'],
		ctaSubject: 'Technical rescue project',
		metaDescription:
			'Technical rescue for troubled software projects, including assessment, triage, stabilization, and recovery planning.',
	},
];

export const serviceSlugs = services.map((service) => service.slug);

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
	return service.related
		.map((slug) => getServiceBySlug(slug))
		.filter((relatedService): relatedService is Service => relatedService !== undefined);
}

export function getServiceMailto(service: Pick<Service, 'ctaSubject'>): string {
	return `mailto:${contactEmail}?subject=${encodeURIComponent(service.ctaSubject)}`;
}
