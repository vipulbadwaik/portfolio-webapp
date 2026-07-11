# Project instructions for Claude

This is a static Next.js portfolio site. Two reference docs describe how it's built and how it should look:

- [ARCHITECTURE.md](ARCHITECTURE.md) — stack, directory layout, component map, data flow, build/deploy.
- [DESIGN-FLOW.md](DESIGN-FLOW.md) — visual language, layout/spacing rules, reusable CSS effect classes, animation conventions, section anatomy.

## Rule: keep these docs in sync

Before making a change that touches structure or visual design, read the relevant doc(s) first and follow the existing conventions described there rather than inventing new patterns.

After making a change that alters architecture or design, update the corresponding doc(s) in the same turn — don't leave them stale. This includes:

- **Architecture changes** → update [ARCHITECTURE.md](ARCHITECTURE.md): new/removed components, new data sources, new API routes, new libraries/dependencies that change the stack, changes to build/deploy config, changes to how data flows between files.
- **Design changes** → update [DESIGN-FLOW.md](DESIGN-FLOW.md): new colors/themes, new reusable CSS effects, new animation patterns, new section layouts, changes to spacing/typography conventions, new reusable UI patterns (e.g. new floating widgets).

Keep updates concise — edit only the sections affected, don't rewrite the whole file. If a change is purely content (e.g. editing `portfolioData.js` values) or a bug fix with no structural/visual impact, no doc update is needed.
