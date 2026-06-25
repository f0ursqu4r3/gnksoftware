# Modern Dark Studio Design Spec

## Purpose

Modernize the G&K Software site so it feels like a contemporary development shop, not a terminal interface. The site should keep the dark technical identity, the direct copy, the synapse field, and the service-route structure, while replacing the TUI read with a calmer studio-grade presentation.

## Approved Direction

Use the **Modern Dark Studio** direction selected in the visual companion.

The page should feel:

- Direct: clear claims, visible services, no vague startup language.
- Technical: concrete work lanes, senior implementation posture, system-oriented copy.
- Dependable: quiet hierarchy, legible contrast, restrained motion, no decorative excess.
- Modern: more spacing, softer hierarchy, better rhythm, less hard-edged interface scaffolding.

## Anti-Trope Guardrails

Avoid the patterns that would make the page read as a generic AI-generated SaaS landing page:

- No glassmorphism or decorative blur cards.
- No gradient text.
- No hero metric block.
- No repeated icon-card grid.
- No giant rounded cards.
- No purple, blue, or one-note gradient identity.
- No repeated tiny uppercase section labels as default grammar.
- No generic claims such as empower, seamless, supercharge, leverage, transform, enterprise-grade, next-generation, or cutting-edge.
- No decorative UI chrome that implies a terminal, dashboard, editor, or app surface unless it is necessary content.

## Visual System

### Color

Keep the dark palette, but move the surfaces away from terminal green-on-black.

- Use the current softened dark palette as the base.
- Keep green as the primary signal color, but use it less often and more intentionally.
- Add subtle warm support through the existing danger/coral token only for small emphasis, never as a full new theme.
- Use section-to-section depth through surface tone and spacing, not many hard borders.

### Shape

The current site relies on sharp rectangles and one-pixel boxes. Replace that with a more modern system:

- Buttons: rounded, confident, compact, with clear hover states.
- Panels: 10px to 12px radius when a container is useful.
- Repeated service items: softer row/list treatment instead of boxed terminal cells.
- Founder images: larger, calmer presentation with soft radius and better alignment.
- Do not exceed 16px radius on content cards or sections.

### Borders And Shadows

Reduce visible grid framing.

- Use borders only where they clarify grouping.
- Replace many full boxes with selective dividers, surface changes, and spacing.
- Avoid pairing a decorative border with a large soft shadow.
- Use minimal shadows only for elevated navigation/dropdown affordances.

### Typography

Keep Sora unless a later typography pass is explicitly requested. The current font supports the technical/dependable tone and avoids adding a new dependency.

Adjust usage:

- Reduce terminal-like small labels.
- Make headings slightly less cramped where needed.
- Use body copy width and spacing to create polish.
- Keep section language direct, not promotional.

### Motion

Keep the synapse effect but make it a quieter ambient layer.

- It should support the hero rather than dominate it.
- Respect `prefers-reduced-motion`.
- Keep pointer interaction subtle.
- Avoid adding scroll reveal choreography in this pass.

## Homepage Structure

### Header

Modernize the sticky header without making it glossy.

- Reduce the boxed logo treatment.
- Use a compact wordmark lockup.
- Keep nav simple and text-first.
- Make the services dropdown feel like a small menu, not a terminal panel.
- Keep the primary email CTA, but soften shape and hover behavior.

### Hero

Keep the synapse field and core message, but remove the interface-panel feeling.

- Hero should be spacious and layered.
- The main copy remains about senior software work for systems with consequences.
- The side lane list should become a polished work index or compact practice preview, not a bordered console panel.
- Use one primary CTA and one secondary CTA.

### Services

Convert the boxed two-column service grid into a modern work index.

- Each service should have a clear title, one concise summary, and a small set of concrete bullets.
- Layout can still use a responsive grid, but items should not look like identical terminal windows.
- Links should be clear without relying on underlined terminal styling everywhere.

### Situations

Keep this section, but make it read as applied judgment rather than a list output.

- Use a stronger heading and a softer two-column text layout.
- Prefer open spacing and selective dividers.

### Approach

The steps are a real sequence, so numbering is appropriate here.

- Replace heavy bordered list rows with a cleaner timeline or stepped list.
- Keep the step titles and bodies.
- Make the numbering useful and understated.

### Capability Matrix

Rename or reframe if needed to reduce spreadsheet/TUI feeling.

- Present capabilities as grouped compact tags or a flowing list.
- Avoid a boxed matrix grid.

### Founders

Make the founder section more human and modern while staying direct.

- Use the existing founder images.
- Increase image size.
- Remove the single-letter green name accents.
- Keep GitHub links visible and specific.
- Avoid turning the section into social proof marketing.

### Contact

Keep the practical project-context framing.

- Use one clear contact panel.
- Reduce nested list-box feel.
- Keep the email CTA prominent.

### Footer

Simplify the footer.

- Keep service links and primary navigation.
- Reduce boxiness and tracked logo styling.

## Service Routes

Bring service pages into the same modern dark studio system.

- Header and footer should match the homepage.
- Hero should use softer surface treatment and less terminal labeling.
- Fit, build, process, and project sections should use modern panels or lists, not hard console grids.
- Related services should feel like navigational recommendations, not boxed command options.

## Technical Scope

Expected files:

- `src/styles/global.css`: token additions, reusable utility classes, synapse surface tuning.
- `src/pages/index.astro`: homepage structure and classes.
- `src/pages/[service].astro`: service-route structure and classes.
- `src/scripts/synapse-field.ts`: only if the visual balance requires minor alpha/color tuning.
- `src/data/services.ts`: only if copy labels need small changes to reduce TUI language.

Do not add a UI library, animation library, icon library, or new font dependency in this pass.

## Testing And Verification

Required verification:

- `bun run build`
- `bun run test`
- `./node_modules/.bin/tsc --noEmit`
- Live route probe for `/` and all six service routes.
- Scan for banned copy and obvious old TUI terms if copy changes.
- Visual review at desktop and mobile widths using available local tooling.

## Acceptance Criteria

The pass is complete when:

- The site still reads as G&K Software, a direct technical development shop.
- The current hard-bordered TUI styling is materially reduced.
- The homepage and service pages share one coherent modern dark studio system.
- The synapse effect remains, but feels ambient and not interface-like.
- Service navigation remains easy to find.
- All approved service routes still build and return `200`.
- The implementation avoids the listed AI-generated SaaS tropes.
