# SEO, GEO, AEO, and online-presence audit

Audit date: 2026-09-25  
Canonical site: https://laythayache.com/  
Scope: discovery, indexing, entity consistency, answerability, public evidence, and measurement. Visual design is intentionally out of scope.

## Executive status

The site has a strong crawlable foundation: static HTML, one canonical URL per public page, a current sitemap, public robots access, descriptive headings, visible authorship and attribution, JSON-LD, direct-answer copy, `llms.txt`, and a machine-readable profile. The deployed site now also has a real noindex 404, a writing feed, self-contained authorship data, and the intended legacy redirects; the repository has stronger regression checks.

The largest remaining risks are outside the page templates:

1. `www.laythayache.com` returns Cloudflare `522` instead of redirecting to the canonical apex domain.
2. `https://layth-portfolio.pages.dev/` serves the same site with `200`. Its apex canonical limits duplication, but Cloudflare's generated hostname should redirect to the custom domain.
3. A search-backed spot check surfaced older copies of portfolio pages, including superseded role wording and older project claims. Confirm the actual Google and Bing index state in their webmaster tools rather than treating that spot check as a complete index report.
4. GitHub and Medium matched the canonical site in a live recheck on 2026-09-25. LinkedIn blocked automated retrieval and therefore remains unverified. Hashnode and DEV still expose outdated employment wording and unsupported PrivacyGuard framing; treat Bayt and Crunchbase as conditional cleanup only when they are controlled or correctable.
5. A `google-site-verification` TXT value exists in public DNS. That proves only that a verification token is published; it does not prove that the current owner account has Search Console access or that the property is presently verified. Search Console and Bing Webmaster Tools reports were not accessible in this repository audit.
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
| Unknown routes | An invented URL initially returned the homepage with `200`. After the audited build reached production, the same class of test returned the custom noindex page with HTTP `404`. | Live defect resolved and rechecked on 2026-09-25 |
| Canonical host | HTTP apex redirects to HTTPS apex. `www` returns `522`. The `layth-portfolio.pages.dev` deployment remains directly accessible with an apex-domain canonical. | Apex healthy; both alternate hosts require Cloudflare redirects |
| Crawl access | Googlebot, Bingbot, OAI-SearchBot, and GPTBot user agents received `200` on a representative case study. | Eligibility only; not proof of indexing or citation |
| Google ownership | A Google site-verification TXT record is present in DNS. | Verification token present; account access and current property status unknown |
| Index freshness | A search-backed spot check surfaced stale versions of `/about/`, `/projects/omnisign/`, and retired project URLs. | Inspect in Search Console and Bing Webmaster Tools after deployment; do not infer complete index state from the sample |
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
| BSHEEL co-founder wording | Owner-confirmed in the September 18 portfolio history: Layth is a co-founder whose primary role is business strategy and product direction; the public quest app is the earlier stage and a tourism-focused redesign is the later direction. The live app listings and Tayseer Laz's public case study corroborate the product but do not independently establish Layth's role or the unreleased direction. | Owner-confirmed; public product corroboration is partial | Current portfolio wording is publishable as an owner statement; do not present the tourism direction as launched or third-party-verified |
| HRFS leadership wording | Owner-confirmed in the portfolio history and retained source material: lead AI engineer and co-principal investigator; active research and development; no clinical-performance claim. No independent public source for the role was found in this audit. | Owner-confirmed; not independently corroborated | Current bounded wording is publishable; omit unsettled funder naming, cohort details, grant figures, clinical outcomes, and private research data |

## Product-specific retrieval assessment

### Google Search, AI Overviews, and AI Mode

The site meets the observable technical eligibility basics: public crawl access, indexable HTML, stable canonicals, a sitemap, visible text, internal links, and structured data that matches visible claims. Google states that AI Overviews and AI Mode require normal Search eligibility and do not require special AI markup. Eligibility does not guarantee crawling, indexing, ranking, an AI answer, or a citation.

Now that the audited build is live, use Search Console to:

1. Confirm that the Domain property is verified in the account being used. The DNS token alone does not establish account access.
2. Check the Sitemaps report. Submit `https://laythayache.com/sitemap.xml` only if it is absent or failing; if it is already successful, do not resubmit it merely because the site changed.
3. Use URL Inspection on a small representative set: `/`, `/about/`, `/projects/omnisign/`, `/projects/privacy-guard/`, and the materially revised writing pages. Compare the live test, indexed version, and Google-selected canonical. Request indexing for these changed URLs when appropriate; do not mass-submit every URL.
4. Review Page Indexing for soft-404, duplicate, redirect, and canonical states, and review Manual Actions and any applicable enhancement reports.
5. Compare branded and capability queries in the Search performance report after Google has had time to recrawl and reprocess the changes.

A sitemap submission or indexing request is a discovery signal, not a guarantee or a way to force immediate indexing.

### ChatGPT Search

The wildcard robots rule permits OAI-SearchBot, and representative requests were not blocked by the live CDN. OpenAI states that OAI-SearchBot access supports discovery for ChatGPT search; it is separate from GPTBot model-development access. Track referrals containing `utm_source=chatgpt.com` once analytics is available.

### Microsoft Bing and Copilot

Bingbot can fetch the site, but Bing Webmaster Tools verification and index data were not available. If the site is not already present, add and verify it or import the verified Google Search Console property. Check whether Bing already discovered or imported the sitemap before submitting it again, inspect a small representative URL set, and use Bing's AI Performance report if it is available in the account. IndexNow is optional; do not add it until there is a reliable post-deploy submission step.

### Claude and other answer engines

The wildcard policy currently permits Anthropic's documented bots as well as other conforming crawlers. Anthropic separates model-development, search, and user-directed retrieval agents. Per-product citation behavior was not sampled, and crawler access alone is not evidence of inclusion.

`llms.txt` and `profile.json` are supporting consistency artifacts. Neither is required by Google Search nor a guarantee that an answer engine will retrieve or cite the site.

## External identity cleanup backlog

Use the canonical site as the source of truth and do not copy unsupported historical metrics:

1. GitHub needs no further change based on the 2026-09-25 live recheck. Its bio, organization, README role, selected work, and Lancaster count align with the canonical site.
2. Medium needs no further profile or PrivacyGuard-framing change based on the 2026-09-25 live recheck. Revisit article canonical links only when intentionally cross-posting future work.
3. LinkedIn could not be fetched because the platform rejected automated retrieval. Manually compare its headline, current employer, About text, and featured link with the canonical site; do not assume either consistency or inconsistency from the failed fetch.
4. Hashnode still describes an outdated Aligned Tech role and exposes unsupported metrics and compliance claims. Correct or remove it if the profile is controlled and intended to remain public.
5. DEV still exposes the older PrivacyGuard title and claims about price, frame rate, legal compliance, Arabic plate tuning, and deployment context that are not supported by the current public case study. Correct or remove that article if it is controlled.
6. Bayt is conditional: update it only if the profile is controlled and still used professionally.
7. Crunchbase is conditional: claim it, request a correction, or request removal only if there is a legitimate control path. Do not create a new profile merely to satisfy this audit.

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

## Corrected action list

### Remaining high-priority external actions

The audited build is now live: the custom noindex 404, feed, and representative legacy redirects were rechecked successfully on 2026-09-25. No additional deployment action is requested for those items.

1. Fix the live `www` error at Cloudflare's edge. Create a `301` Bulk Redirect or equivalent Single Redirect from `https://www.laythayache.com` to `https://laythayache.com`, with subpath and query-string preservation, and keep the `www` DNS record proxied. Do **not** attach `www` to the Pages project merely to perform this redirect; attaching it is necessary only if `www` should serve the site rather than redirect.
2. Follow Cloudflare's Pages procedure for the generated hostname: create a `301` Bulk Redirect from `https://layth-portfolio.pages.dev` to `https://laythayache.com`, preserving query strings and path suffixes and enabling subpath matching. Cloudflare's guide also enables subdomain matching; omit that option only if preview-deployment subdomains must remain directly accessible.
3. Check Search Console property access, sitemap status, Page Indexing, and a small representative set in URL Inspection as described above. Submit only what is absent, failing, or materially changed.
4. GitHub and Medium already pass the live consistency recheck. Manually verify LinkedIn because automated access was blocked. Correct or remove the stale Hashnode profile and DEV PrivacyGuard article if those surfaces are controlled and meant to remain public.

### Resolved owner-confirmed boundaries

1. BSHEEL does not require another owner confirmation. Preserve the co-founder attribution, primary business-strategy and product-direction role, earlier quest-app stage, and later tourism direction. Keep the later direction clearly unlaunched unless new public evidence establishes otherwise.
2. HRFS does not require another owner confirmation for the current portfolio wording. Preserve lead AI engineer, co-principal investigator, and active R&D status, with no clinical-performance claim. Funder naming, grant details, study cohort details, and institutional publication language remain outside the current claim.
3. Owner confirmation and independent corroboration are separate evidence categories. The absence of a third-party page does not erase an owner-confirmed fact; it limits how the evidence may be characterized.

### Optional decisions and measurement

1. Decide whether model-development crawlers should remain allowed. This is a content-use policy choice, not a requirement for SEO, search retrieval, or launch.
2. Add or import Bing Webmaster Tools if it is not already configured. General referral/conversion analytics are optional and should be added only if that measurement is wanted and implemented with an appropriate privacy policy.
3. Run a real-browser Core Web Vitals lab trace when the necessary browser tooling is available. The current static delivery checks do not show a release blocker, but they are not field or lab CWV evidence.
4. Run the controlled answer-engine prompt set after the corrected site has been indexed. Do not interpret crawler access as citation evidence.

### Not required now

- Do not add more schema types, AI-specific files, or keyword pages without a content and evidence reason.
- Do not mass-request indexing or repeatedly resubmit an already successful sitemap.
- Do not add IndexNow until there is a reliable deployment hook and an actual freshness need.
- Do not create or claim third-party profiles solely for SEO.

## Current primary guidance used

- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- Google Search Central: [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- Google Search Console: [URL Inspection](https://support.google.com/webmasters/answer/9012289) and [Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- OpenAI: [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- Microsoft Bing: [Sitemaps](https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed) and [URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305)
- Microsoft Bing: [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- Anthropic: [web crawler controls](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Cloudflare Pages: [serving pages and custom 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- Cloudflare Pages: [redirecting a `pages.dev` hostname to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- Cloudflare: [Bulk Redirect evaluation](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/) and [custom-domain behavior](https://developers.cloudflare.com/pages/configuration/custom-domains/)
