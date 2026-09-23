---
name: technical-seo
description: Audit and improve this portfolio's search discovery, crawling, indexing signals, rendering, metadata, canonicals, structured data, sitemaps, and internal links. Use for every repository task, proportionally, and especially for public routes or content changes.
---

# Technical SEO

Make the portfolio technically understandable and discoverable without
confusing eligibility with ranking or display guarantees.

## Establish the evidence

1. Read the request, repository instructions, relevant source files, and Git
   history before proposing a change.
2. Identify the affected public URL, route type, intended audience, language,
   canonical entity, and desired conversion.
3. Inspect both source behavior and the live page when the task concerns a
   deployed surface. Label local and live evidence separately.
4. Browse current primary documentation before relying on changing search
   product requirements. Prefer official Google, Bing, schema, framework, and
   standards documentation over secondary checklists.

## Audit in dependency order

Check only what is relevant, but diagnose earlier stages before later ones:

1. **Access and discovery:** HTTP status, redirects, robots directives,
   authentication, sitemap inclusion, internal links, and intentional preview
   exclusions.
2. **Canonicalization and rendering:** canonical URLs, duplicate routes,
   JavaScript-rendered content, response HTML, language alternates, and mobile
   accessibility of important information.
3. **Page meaning:** unique titles and descriptions, one clear page purpose,
   descriptive headings and links, visible authorship, dates, image alt text,
   and crawlable evidence.
4. **Entity markup:** validate only structured data that matches visible facts.
   Connect `Person`, `ProfilePage`, `Article`, `BreadcrumbList`, and
   `Organization` entities when their documented definitions fit. Do not
   invent a generic `Project` rich result or expect valid markup to force a
   search feature.
5. **Content consolidation:** give each important fact or query cluster one
   clearly authoritative page and remove contradictory or accidental duplicate
   statements.

## Implement and verify

- Prioritize observed defects and factual inconsistencies before speculative
  optimizations.
- Fit fixes into the existing architecture; do not migrate frameworks or add
  dependencies merely for SEO.
- Preserve intentional private, preview, locale, crawler-training, and
  canonicalization choices unless the user explicitly changes them.
- Run the smallest relevant build, lint, test, schema, and route checks.
- For deployed changes, verify the actual public response after deployment.
- Record the affected URL, observation, supporting evidence, change, and
  acceptance check.

## Guardrails

- Do not keyword-stuff, create doorway pages, or add unsupported location or
  capability claims.
- Do not produce a made-up SEO score or promise ranking, rich results,
  sitelinks, traffic, or indexing.
- Do not present `llms.txt`, schema markup, IndexNow, or a crawler visit as
  proof of indexing, ranking, or AI citation.
- Do not remove a crawl or indexing restriction until its intended purpose is
  established.

## Completion standard

Report what changed, the evidence behind it, local validation, live
validation, remaining unknowns, and the next platform-specific measurement.
