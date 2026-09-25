# SEO, GEO, AEO, and online-presence audit

Audit date: 2026-09-25  
Canonical site: https://laythayache.com/  
Scope: discovery, indexing, entity consistency, answerability, public evidence, and measurement. Visual design is intentionally out of scope.

## Executive status

The site has a strong crawlable foundation: static HTML, one canonical URL per public page, a current sitemap, public robots access, descriptive headings, visible authorship and attribution, JSON-LD, direct-answer copy, `llms.txt`, and a machine-readable profile. The local build now also has a real noindex 404, a writing feed, self-contained authorship data, and stronger regression checks.

The largest remaining risks are outside the page templates:

1. `www.laythayache.com` returns Cloudflare `522` instead of redirecting to the canonical apex domain.
2. `https://layth-portfolio.pages.dev/` serves the same site with `200`. Its apex canonical limits duplication, but Cloudflare's generated hostname should redirect to the custom domain.
3. Search results still show older copies of portfolio pages, including superseded role wording and older project claims.
4. Public profiles are inconsistent with the canonical site. GitHub, LinkedIn, Medium-adjacent publishing profiles, Bayt, and Crunchbase should be reconciled before creating more content.
5. Search Console is verifiable through the live DNS token, but performance and index reports were not accessible in this repository audit. Bing Webmaster Tools ownership and data are also unverified.
6. The current wildcard robots policy allows both search/retrieval crawlers and model-development crawlers. That is a policy choice, not an SEO requirement, and should remain unchanged until the owner decides whether training access is acceptable.

## Changes made in this audit

- Added a top-level `404.html` with `noindex, follow`. Cloudflare Pages otherwise treats a project without a top-level 404 as a single-page app and returns the homepage for unknown paths.
- Added permanent redirects for the retired Lancaster route and the renamed PrivacyGuard and WhatsApp articles.
- Consolidated `ProfilePage` markup on `/about/`; the homepage is now a `WebPage` about the same stable `Person` entity.
- Made author name and canonical profile URL explicit in project and article JSON-LD instead of relying only on a cross-page `@id` reference.
- Added `CollectionPage` and `ItemList` markup to `/writing/`.
- Added `feed.xml` and RSS autodiscovery from the homepage and writing pages.
- Removed an incorrect `$schema` declaration that described `profile.json` instance data as if it were a JSON Schema document.
- Added intrinsic image dimensions and repaired invalid `time` and ARIA markup without changing the visual direction.
- Expanded `npm run validate` to check canonical and sitemap parity, unique titles and descriptions, Open Graph parity, author links, JSON-LD syntax, internal links and fragments, image dimensions and alt attributes, robots, redirects, feed integrity, the profile record, and the noindex 404.

## Evidence and outcome boundaries

| Area | Observation | Status |
| --- | --- | --- |
| Public routes | All 14 canonical URLs returned `200` during the live check. | Live evidence |
| Unknown routes | An invented URL returned the homepage with `200`. | Live defect; fixed locally pending deployment |
| Canonical host | HTTP apex redirects to HTTPS apex. `www` returns `522`. The `layth-portfolio.pages.dev` deployment remains directly accessible with an apex-domain canonical. | Apex healthy; both alternate hosts require Cloudflare redirects |
| Crawl access | Googlebot, Bingbot, OAI-SearchBot, and GPTBot user agents received `200` on a representative case study. | Eligibility only; not proof of indexing or citation |
| Google ownership | A Google site-verification TXT record is present in DNS. | Ownership signal present; Search Console reports not inspected |
| Index freshness | Search results surfaced stale versions of `/about/`, `/projects/omnisign/`, and retired project URLs. | Recrawl and reprocessing required after deployment |
| HTML | All 15 built HTML documents passed the W3C Nu validator with no errors. | Local validation |
| Build integrity | `npm run validate` passes for 14 canonical pages, one 404, 15 JSON-LD blocks, 14 sitemap URLs, and 4 feed items. | Local validation |
| Delivery | Representative live responses had roughly 50–75 ms time to first byte from the audit location. The homepage transferred about 3.2 KB compressed, CSS about 4.6 KB, and there is no client JavaScript bundle. | Point-in-time synthetic observation, not Core Web Vitals |
| Core Web Vitals | LCP, CLS, INP, FCP, TBT, and Speed Index were not measured because the required Chrome DevTools connector was unavailable. | Untested |
| AI citations | No controlled end-user sample was run in Google AI Mode/AI Overviews, ChatGPT Search, Microsoft Copilot, Claude web search, or Perplexity. | Untested; denominator is zero |

## Claim ledger

| Claim group | Canonical treatment | Evidence status | Publication note |
| --- | --- | --- | --- |
| Identity and current Achour Holding role | Homepage, `/about/`, `profile.json`, and `llms.txt` agree. | Canonical owner-published claim; external profiles conflict | Keep wording stable and reconcile profiles |
| OmniSign award and original team | Team attribution and award are stated consistently. | Verified by Rafik Hariri University | Publishable with team attribution |
| OmniSign data and evaluation | Captured and augmented counts are separated; 98% remains bounded to a controlled internal evaluation. | Public code supports parts of the pipeline; retained evaluation record has explicit limits | Do not restore older broader claims from cached pages or profiles |
| PrivacyGuard | Public source and tests support the component boundary. Universal speed, anonymity, security, and legal-compliance claims are withdrawn. | Verified public artifacts plus explicit limitations | Reconcile external bios and old article titles |
| Hader and Alinia production status | The site distinguishes commercial/live status, team contribution, and confidential metrics. | Owner-published and official product URLs; client counts and operational metrics remain confidential | Do not add private proof or client identities |
| Lancaster fleet | Fourteen official domains and shared ownership with Tayseer Laz are stated consistently. | Public domains and repository history; no business-outcome metrics claimed | Keep the count tied to the listed official sites |
| Bridge | Two employer-owned implementations are kept separate with different ownership. | Repository/history evidence with confidentiality boundary | Do not imply a shared product, database, or sole ownership of both systems |
| BSHEEL co-founder wording and HRFS leadership wording | Present on the site but not corroborated in the sources checked during this audit. | Needs owner confirmation | Confirm before expanding these into dedicated pages or external bios |

## Product-specific retrieval assessment

### Google Search, AI Overviews, and AI Mode

The site meets the observable technical eligibility basics: public crawl access, indexable HTML, stable canonicals, a sitemap, visible text, internal links, and structured data that matches visible claims. Google states that AI Overviews and AI Mode require normal Search eligibility and do not require special AI markup. Eligibility does not guarantee crawling, indexing, ranking, an AI answer, or a citation.

After deployment, use Search Console to:

1. Resubmit `https://laythayache.com/sitemap.xml`.
2. Inspect and request recrawling for `/`, `/about/`, `/projects/omnisign/`, `/projects/privacy-guard/`, and the two fact-checked writing pages.
3. Review Page Indexing for soft 404s and duplicate/canonical issues.
4. Review Enhancements and manual actions.
5. Compare branded and capability queries in the Web performance report after reprocessing.

### ChatGPT Search

The wildcard robots rule permits OAI-SearchBot, and representative requests were not blocked by the live CDN. OpenAI states that OAI-SearchBot access supports discovery for ChatGPT search; it is separate from GPTBot model-development access. Track referrals containing `utm_source=chatgpt.com` once analytics is available.

### Microsoft Bing and Copilot

Bingbot can fetch the site, but Bing Webmaster Tools verification and index data were not available. Verify or import the site, submit the sitemap, inspect important URLs, and use Bing's AI Performance report to distinguish citations from rankings or page importance. IndexNow is optional; do not add it until there is a reliable post-deploy submission step.

### Claude and other answer engines

The wildcard policy currently permits Anthropic's documented bots as well as other conforming crawlers. Anthropic separates model-development, search, and user-directed retrieval agents. Per-product citation behavior was not sampled, and crawler access alone is not evidence of inclusion.

`llms.txt` and `profile.json` are supporting consistency artifacts. Neither is required by Google Search nor a guarantee that an answer engine will retrieve or cite the site.

## External identity cleanup backlog

Update these surfaces from the canonical site, without copying unsupported historical metrics:

1. GitHub profile README and organization line.
2. LinkedIn headline, current employer, About text, and featured links.
3. Crunchbase role and biography, or remove/claim the profile if it is not owner-maintained.
4. Bayt current role and historical metrics.
5. Hashnode and DEV profile bios and the PrivacyGuard article framing.
6. Medium biography and canonical links on duplicated articles.

Use this canonical short description unless a platform needs a shorter variant:

> Layth Ayache is a Senior AI Engineer and AI Systems Engineer in Beirut. He turns data and models into usable systems and owns the engineering around them.

Do not automatically copy project metrics into profile bios. Link to the canonical case study where the evaluation conditions, attribution, status, and limitations are visible.

## Repeatable answer-engine measurement set

Run the same prompts in the same language and account/location context after deployment, then again after 2–4 weeks:

1. Who is Layth Ayache, and what does he work on now?
2. What AI systems has Layth Ayache built or helped build?
3. What was Layth Ayache's role in OmniSign, and what are the system's limitations?
4. Who built PrivacyGuard, and what does it actually prove?
5. What is Hader, and what did Layth Ayache contribute?
6. Which AI engineers in Lebanon have demonstrated conversational AI, computer vision, and systems integration work?

For every product and prompt, record the date, product/surface, language, account and location context when known, whether Layth appeared, whether a portfolio URL was cited, the cited URL, factual accuracy, material omissions, and the total sample count. Do not generalize from one answer.

## Required owner decisions and external actions

1. Deploy the repository changes and verify an invented URL returns HTTP `404`, not the homepage.
2. In Cloudflare, attach or correct the `www` custom domain and create an apex-preserving permanent redirect to `https://laythayache.com`; `_redirects` cannot fix a hostname that currently fails before reaching Pages.
3. Add a Cloudflare Bulk Redirect from `layth-portfolio.pages.dev` to the apex domain with subpath and query-string preservation.
4. Decide whether model-development crawlers should remain allowed. Keep search/retrieval access separate from training access in that decision.
5. Reconcile external profiles before publishing more capability pages.
6. Confirm the BSHEEL and HRFS role wording or reduce it to wording supported by public evidence.
7. Add measurement access: Search Console, Bing Webmaster Tools, and privacy-appropriate referral/conversion analytics. Treat deployment, indexing, citations, visits, and qualified contact as separate outcomes.

## Current primary guidance used

- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- Google Search Central: [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- OpenAI: [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- Microsoft Bing: [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- Anthropic: [web crawler controls](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Cloudflare Pages: [serving pages and custom 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- Cloudflare Pages: [redirecting a `pages.dev` hostname to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
