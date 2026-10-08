# SEO, GEO, AEO, and online-presence audit

Audit date: 2026-09-25  
External-profile and publication follow-up: 2026-10-08
Google Search framework and Search Console follow-up: 2026-10-05
Canonical site: https://laythayache.com/  
Scope: discovery, indexing, entity consistency, answerability, public evidence, and measurement. Visual design is intentionally out of scope.

## Executive status

The site has a strong crawlable foundation: static HTML, one canonical URL per public page, a current sitemap, public robots access, descriptive headings, visible authorship and attribution, JSON-LD, direct-answer copy, `llms.txt`, and a machine-readable profile. The deployed site now also has a real noindex 404, a writing feed, self-contained authorship data, the intended legacy redirects, and edge-level canonical-host redirects; the repository has stronger regression checks.

The largest remaining risks are outside crawlability and indexing:

1. Search Console URL Inspection returned `PASS` for all 15 canonical URLs on 2026-10-05. Every inspected page was submitted and indexed, fetched successfully as mobile Googlebot, allowed by robots and indexing controls, and assigned the submitted canonical. Older snippets can still lag behind the live pages, but there is no observed site-wide indexing defect.
2. External identity consistency is improved but not fully closed. Bayt, Hashnode, DEV, GitHub, Medium, and Crunchbase were rechecked live and are materially aligned with the canonical record. LinkedIn could not be inspected or edited behind its authentication wall, and RocketReach remains in Data Curation after its 2026-10-07 acknowledgement.
3. Search visibility remains a small sample. For 2026-07-06 through 2026-10-05, ordinary Google Web performance reported 25 clicks, 649 impressions, 3.9% CTR, and average position 8.6. The separate Generative AI report recorded 56 impressions for the same period. These reports describe different outcomes and must not be combined.
4. The remaining opportunity is clearer evidence and natural authority around demonstrated projects, not more crawl directives, schema types, keyword variants, directory profiles, or manufactured employer coverage.
5. The current wildcard robots policy allows both search/retrieval crawlers and model-development crawlers. That is a policy choice, not an SEO requirement, and should remain unchanged until the owner decides whether training access is acceptable.

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
- On 2026-10-08, aligned the `Person.jobTitle` value with the verified Achour Holding title and limited first-party `sameAs`, visible profile links, and `profile.json` contacts to LinkedIn, GitHub, Medium, and the corrected Crunchbase profile. DEV, Hashnode, and Bayt remain public but are no longer endorsed from the canonical entity page while their material claims are stale.
- Added the Makers AI Summer Camp instructor role to the canonical About page, `ProfilePage.subjectOf`, `profile.json`, and `llms.txt` using the organizer's public LinkedIn recap. The wording preserves the evidence boundary: the post credits Layth as one of seven instructors but does not identify his individual module.
- Added 64×64 PNG and ICO fallbacks derived from the existing SVG favicon, declared all three formats on every HTML page, and made their presence, declarations, signatures, and minimum PNG dimensions part of `npm run validate`.

## Evidence and outcome boundaries

| Area | Observation | Status |
| --- | --- | --- |
| Public routes | All 15 canonical URLs returned `200` in a fresh HEAD check on 2026-10-05. | Live evidence |
| Unknown routes | An invented URL initially returned the homepage with `200`. After the audited build reached production, the same class of test returned the custom noindex page with HTTP `404`. | Live defect resolved and rechecked on 2026-09-25 |
| Canonical host | HTTP apex, `www`, `layth-portfolio.pages.dev`, and a sampled deployment subdomain each return `301` to the HTTPS apex while preserving the tested path and query string. | Live defect resolved and rechecked on 2026-09-25 |
| Cloudflare control plane | The zone and Pages custom domain are active; the authoritative nameservers are Cloudflare; the apex and `www` records are proxied; the edge certificate is active; SSL mode is Full; and the enabled Bulk Redirect rule contains the intended two entries with path and query preservation. | Read-only Cloudflare API and public DNS evidence, rechecked on 2026-09-25 |
| Cloudflare deployment | The identity cleanup and favicon fallbacks were published from `main` at commit `5ab17b188a1cb3e33011e2e06a621185824a97d9`. Production deployment `f4f86058-6a89-4a58-8668-f3ceae90fcfd` succeeded at 2026-10-08T08:40:12Z and is aliased to `https://laythayache.com`. | Cloudflare control-plane evidence and live HTTP verification on 2026-10-08 |
| Crawl access | Googlebot, Bingbot, OAI-SearchBot, and GPTBot user agents received `200` on a representative case study. | Eligibility only; not proof of indexing or citation |
| Google ownership | A Google site-verification TXT record is present in DNS, and the connected account has `siteOwner` permission for the domain property and both apex and `www` URL-prefix properties. | Verified in Search Console on 2026-10-05 |
| Search Console ownership and identity pages | The connected account is a site owner for the domain property. URL Inspection reports both `/` and `/about/` as indexed. After live deployment verification on 2026-10-08, exactly one indexing request was accepted for `/` and exactly one for `/about/`; both produced the `Indexing requested` confirmation. | Live Search Console evidence; no other URLs were requested |
| About-page structured data | The deployed HTML uses valid `dateModified` value `2026-10-08T11:38:00+03:00`. Search Console still reports one valid `Profile page` item for `/about/`, and the recrawl request was accepted. | Live source and Search Console evidence on 2026-10-08; allow normal processing time |
| Canonical URL indexing | Batch URL Inspection returned `PASS:15`. All 15 sitemap URLs are submitted and indexed, use the submitted canonical, allow Googlebot and indexing, and were fetched successfully as mobile Googlebot. | Live Search Console evidence on 2026-10-05 |
| Sitemap | Search Console reports one submitted sitemap, last downloaded on 2026-10-03, with 15 submitted URLs, no warnings, and no errors. Its summary field reports zero indexed URLs even though URL Inspection confirms all 15 individually; do not treat the summary field as an indexing count. | Sitemap healthy; no resubmission needed |
| Ordinary Google Search performance | For 2026-07-06 through 2026-10-05, the ordinary Web report showed 25 clicks, 649 impressions, 3.9% CTR, and average position 8.6. | Small three-month sample; not evidence of a durable trend or a specific cause |
| Google Generative AI performance | For 2026-07-06 through 2026-10-05, the separate beta report showed 56 impressions. Top pages were `/projects/omnisign/` (26), `/` (20), `/about/` (12), the slashless OmniSign URL (3), `/projects/` (2), and `/projects/privacy-guard/` (2). Top country was Lebanon (32); devices were desktop 40, mobile 14, and tablet 2. | Separate visibility report; impressions are not citations, rankings, clicks, or conversions |
| Visible query opportunities | `omnisign` produced 2 clicks from 28 impressions at position 7.4; `hader ai` produced 0 clicks from 19 impressions at position 7.6; `whatsapp coexistence` produced 0 clicks from 3 impressions at position 38.3. Only 11 query-page rows were exposed, so privacy-filtered queries are absent. | Monitor before changing copy; sample is too small for a reliable CTR rewrite decision |
| Achour Holding people pages | A 2026-10-05 review of the live homepage, careers page, indexed pages, and internal homepage links found no employee directory or individual employee profiles. The homepage gives Chairman Wissam Achour a named message section; news pages name people only when relevant to events. The owner confirmed that individual employee announcements are not an established company practice. | No employer-profile or announcement outreach is recommended. Use an Achour source only if the company publishes one organically for a genuine business reason. |
| Makers AI Summer Camp | A Makerspace Solutions LinkedIn recap states that the organization hosted an eight-week AI, engineering, and technology camp in July and August 2023 and explicitly names Layth Ayache among seven instructors. It lists the camp's workshop topics collectively but does not assign a particular module to any named instructor. | Organizer-published corroboration; publish the instructor role and dates, but do not claim a specific module from this source |
| Index freshness | Search snippets have surfaced older wording, while URL Inspection confirms that every canonical URL is indexed. Most inspected pages were last crawled between 2026-09-24 and 2026-10-03, so recently corrected copy still needs normal recrawl and processing time. | Freshness lag, not an indexing failure |
| RocketReach profile | The live profile was stale when checked on 2026-10-05. RocketReach acknowledged the owner's correction on 2026-10-07, passed it to its Data Curation Team, and stated a 5-7-business-day processing window. | Pending external correction; send no reply now and verify the live profile during 2026-10-14 through 2026-10-16 |
| HTML | All 15 built HTML documents passed the W3C Nu validator with no errors. | Local validation |
| Build integrity | `npm run validate` passes for 15 canonical pages, one noindex 404, 16 JSON-LD blocks, 15 sitemap URLs, 5 feed items, checked internal links/assets/fragments, and the SVG/PNG/ICO favicon contract. | Local validation on 2026-10-08 |
| Delivery | Representative live responses had roughly 50–75 ms time to first byte from the audit location. The homepage transferred about 3.2 KB compressed, CSS about 4.6 KB, and there is no client JavaScript bundle. | Point-in-time synthetic observation, not Core Web Vitals |
| Core Web Vitals | LCP, CLS, INP, FCP, TBT, and Speed Index were not measured because the required Chrome DevTools connector was unavailable. | Untested |
| Google AI Overview sample | In one incognito, English-language, Beirut-context observation on 2026-10-05, the bare-name query `layth ayache` returned the official site with sitelinks and LinkedIn but no AI Overview. The comparison query `abed al fattah amouneh` returned an AI Overview citing LinkedIn and GitHub. | One observation per query; result treatment is query-specific and is not a comparative quality score |
| Controlled answer-engine baseline | Exact-prompt samples were completed in ChatGPT Search, Google AI Mode, Bing Search, and partially in Perplexity. Standalone Copilot and Claude web search were blocked by sign-in; Perplexity reached its logged-out limit after two valid answers. | Point-in-time observations recorded below; products and denominators remain separate |

## 2026-10-08 execution record

### Repository publication and live verification

The six prepared files were reviewed before publication: `DISCOVERY_AUDIT.md`, `about/index.html`, `index.html`, `public/llms.txt`, `public/profile.json`, and `public/sitemap.xml`. Their existing work was preserved. The published state removes first-party endorsements of DEV, Hashnode, and Bayt while retaining controlled profiles, uses the exact Achour Holding role, and keeps visible copy, JSON-LD, `profile.json`, `llms.txt`, and sitemap dates aligned.

Commit `5ab17b188a1cb3e33011e2e06a621185824a97d9` was pushed to `main` without a force push. Cloudflare Pages production deployment `f4f86058-6a89-4a58-8668-f3ceae90fcfd` built that exact commit and completed successfully at 2026-10-08T08:40:12Z.

Local release checks:

- `npm run validate`: passed for 15 canonical pages, one noindex 404, 16 JSON-LD blocks, 15 sitemap URLs, five feed items, internal links, fragments, assets, profile data, redirects, and all three favicon formats.
- Independent JSON parsing: all 16 JSON-LD blocks parsed successfully.
- Canonical/sitemap parity, internal link, asset, fragment, and favicon declaration checks passed.
- All 16 HTML files declare SVG, 64x64 PNG, and ICO icons. The PNG signature and dimensions and the ICO header passed validation.
- `git diff --check`: clean.

Live release checks:

| Target | Result |
| --- | --- |
| `/`, `/about/`, `/projects/privacy-guard/`, `/projects/omnisign/` | `200 text/html` |
| `/robots.txt` | `200 text/plain` |
| `/sitemap.xml` | `200 application/xml` |
| `/profile.json` | `200 application/json` |
| `/llms.txt` | `200 text/plain` |
| `/favicon.svg` | `200 image/svg+xml` |
| `/favicon.png` | `200 image/png` |
| `/favicon.ico` | `200 image/vnd.microsoft.icon` |
| `/codex-verification-does-not-exist-20261008` | Genuine custom `404` with `noindex` |
| HTTP apex, HTTPS `www`, and production `pages.dev` alias | `301` to HTTPS apex with the tested path and query preserved |

### External profile state

| Surface | 2026-10-08 verified state | Action |
| --- | --- | --- |
| Bayt | Public profile shows Achour Holding as current from September 2026, closes Aligned Tech in August 2026, labels both OGERO roles as internships, and does not expose the withdrawn metrics in the reviewed body. | No edit needed; stale search snippets may take time to refresh. |
| Hashnode | Public bio names the current Achour role. The PrivacyGuard article uses the corrected title, points its canonical relationship to the portfolio article, bounds the historical benchmark, and does not claim anonymity or legal compliance. | No edit needed. |
| DEV | Public profile names Achour Holding. The PrivacyGuard article has the corrected title and canonical relationship, bounds the historical benchmark, rejects anonymity/compliance implications, and does not expose the unsupported package/install, Arabic-plate, or universal deployment claims in the reviewed copy. | No edit or deletion needed. |
| GitHub | Public profile and README remain materially aligned with the corrected identity and bounded project wording. | Deliberately unchanged; allow search caches to refresh. |
| LinkedIn | Direct public inspection and editing were blocked by the LinkedIn authentication wall. Current Bing and Google snippets show the Achour headline, but this does not verify the authenticated profile fields or the old PrivacyGuard post. | Owner-authenticated comparison and possible correction remain required. |
| RocketReach | Correction is with Data Curation following the 2026-10-07 acknowledgement. | Send no message now. Verify 2026-10-14 through 2026-10-16 and follow up only if material errors remain. |

If LinkedIn is still stale after sign-in, use:

- Headline: `Senior AI Systems & Web Engineer | Technical Lead at Achour Holding | AI Systems, Computer Vision, Data Engineering & Conversational AI`
- Current role: `Senior AI Systems & Web Engineer | Technical Lead`, Achour Holding, September 2026-present.
- Past role: `AI Systems Engineer | Technical Lead`, Aligned Tech, November 2025-August 2026.
- About:

> Senior AI Engineer and AI Systems Engineer based in Beirut. I turn data and models into usable systems and own the engineering around them, from pipelines and integrations to applications, deployment, and operational handoff.
>
> I currently work as Senior AI Systems & Web Engineer | Technical Lead at Achour Holding (September 2026-present). My work covers AI integration, internal operational systems, backend and application delivery, deployment, documentation, and technical leadership.
>
> Selected work includes Hader (team-built conversational and voice AI), Alinia (team-built multilingual real-estate AI), OmniSign (team R&D for bounded Lebanese Sign Language recognition), and PrivacyGuard (an independent public computer-vision component with explicit performance, privacy, and compliance limits).
>
> Evidence, attribution, and limitations: https://laythayache.com/

If the old PrivacyGuard post remains live, replace its unsupported copy with:

> Correction/update: PrivacyGuard is an independent public computer-vision component for normalizing compatible ONNX detections and applying configurable masking to bounded regions in images and video. A historical controlled internal run was described as approximately 25-30 FPS, but the retained record does not support a Raspberry Pi, $35-device, universal-performance, or production benchmark. The project does not prove anonymity, legal compliance, Arabic-plate performance, or the maturity of a complete deployment. Full evidence and limitations: https://laythayache.com/projects/privacy-guard/

### Google and Bing webmaster actions

- Google Search Console: exactly one recrawl was requested for `/` and exactly one for `/about/` after live verification. Both requests were accepted. No other URL was requested, and the healthy sitemap was not resubmitted.
- Google ordinary Web performance, 2026-07-06 through 2026-10-05: 25 clicks, 649 impressions, 3.9% CTR, average position 8.6.
- Google Generative AI performance, same period: 56 impressions. This beta report is recorded separately from ordinary Web performance.
- Bing Webmaster Tools: sign-in reached Google's passkey challenge and could not be completed without the account owner. No property import, sitemap action, URL inspection, AI Performance review, URL submission, or IndexNow submission was claimed or performed.

Owner-authenticated Bing checklist:

1. Sign in at Bing Webmaster Tools with the Google account that owns the Search Console domain property and complete the passkey challenge.
2. Import the verified `laythayache.com` domain property if it is absent. Avoid creating redundant URL-prefix properties.
3. Inspect the existing sitemap state before acting. If `/sitemap.xml` is already successful, do not resubmit it; if absent, submit it once.
4. Inspect exactly `/`, `/about/`, `/projects/privacy-guard/`, and `/projects/omnisign/`. Record discovery, crawl, indexability, selected canonical, and last crawl separately.
5. Open AI Performance and record the reporting period, citation count, cited pages, grounding queries, intents, topics, and citation share where the account exposes them. Do not call eligibility or citation share a ranking.
6. Use URL Submission for `/` and `/about/` only if Bing still shows the pre-deployment versions. Do not mass-submit. Leave IndexNow disabled unless a reliable deployment hook is established.

### Controlled answer-engine baseline

Context for every run was 2026-10-08, English, and the browser's Beirut/Asia-Beirut environment. ChatGPT Search, Bing, and Perplexity were logged out. Google AI Mode was signed in to the owner's Google account with `en-LB` locale. Position is recorded only where the interface presented an ordered list.

| Product and surface | Prompt coverage | Layth appeared | Portfolio citation/source | Key result |
| --- | ---: | ---: | ---: | --- |
| ChatGPT Search | 7/7 valid answers | 6/7 | 5/7 confirmed | Strong project retrieval, but stale employment and withdrawn metrics remain in some answers; PrivacyGuard resolved to the wrong entity. |
| Google AI Mode | 7/7 valid answers | 5/7 | 5/7 | Current role was correct and project pages were cited; PrivacyGuard resolved to the wrong entity and the ten-person prompt named no individuals. |
| Bing public Search | 7/7 queries | 5/7 in answer or organic results | 2/7 answer citations; portfolio organic result in 5/7 | Generated answer blocks appeared for prompts 1-2 only. Prompts 3-7 fell back to classic results. |
| Perplexity | 2/7 valid answers; prompt 3 blocked; 4-7 untested | 2/2 valid | 1/2 confirmed | Prompt 1 used current identity; prompt 2 repeated withdrawn metrics. Logged-out limit prevented the remaining run. |
| Microsoft Copilot app | 0/7 | Untested | Untested | Sign-in required. Bing Search was measured separately and is not treated as Copilot behavior. |
| Claude web search | 0/7 | Untested | Untested | Sign-in required. |

Prompt-level observations:

| ID | ChatGPT Search | Google AI Mode | Bing public Search | Perplexity |
| --- | --- | --- | --- | --- |
| 1 | Appeared; homepage cited. Incorrectly treated Aligned Tech as current and overstated PrivacyGuard. | Appeared; About, OmniSign, and writing URLs cited. Current Achour title correct; some secondary role wording was broader than the canonical record. | Generated answer cited `/about/` and `/`; current role accurate. | Appeared; homepage and About confirmed among sources. Current role correct; some responsibility wording was broader than the canonical record. |
| 2 | Appeared; exact portfolio URL was not captured. Revived withdrawn `95%` and other broad production claims. | Appeared; portfolio writing, Bridge, Lancaster, About, and OmniSign pages cited. OmniSign and Lancaster descriptions were broader than the bounded source language. | Generated answer cited `/about/` and `/` and listed the six principal systems without unsupported metrics. | Appeared; portfolio citation not confirmed. Revived withdrawn `95%` and `2M+` claims and broad production assertions. |
| 3 | Appeared; `/projects/omnisign/` cited. Correctly preserved team attribution, dataset distinctions, the narrow evaluation, and major limitations. | Appeared; OmniSign project and corrected article cited. Team role and research-MVP limits were mostly accurate; counts and the narrow 98% context were omitted. | No answer block. Layth and portfolio appeared in organic results, but Bing did not answer the role/limitations question. | Access limit: sign-up prompt, no answer. |
| 4 | Did not appear; no portfolio citation. Answered about an unrelated project with the same name. | Did not appear; no portfolio citation. Answered about unrelated PrivacyGuard products. | No answer block and no Layth result; consumer PrivacyGuard dominated. | Untested. |
| 5 | Appeared; homepage and About cited. Hader contribution and team attribution were materially accurate. | Appeared; About, Hader, and WhatsApp article cited. Contribution and team attribution were materially accurate. | No answer block. Portfolio homepage and About appeared organically, but the Hader page was not surfaced in the reviewed results. | Untested. |
| 6 | Appeared at position 1; homepage cited. Capability summary was materially aligned. | Appeared at position 1; About cited. Capability summary was materially aligned. | No answer block; portfolio ranked first organically. | Untested. |
| 7 | Appeared at position 1 of only two named people; homepage cited. The answer failed to provide ten candidates and did not establish availability. | Did not appear. The response offered hiring channels rather than ten named engineers. | No answer block and no Layth result; job boards dominated. | Untested. |

The follow-up measurement window is 2026-10-22 through 2026-11-05, using the same seven prompts, language, and recorded contexts. No general-purpose scheduler was available in this environment, so this remains an owner-triggered run rather than a scheduled task.

## Claim ledger

| Claim group | Canonical treatment | Evidence status | Publication note |
| --- | --- | --- | --- |
| Identity and current Achour Holding role | Homepage, `/about/`, `profile.json`, and `llms.txt` agree. | Canonical owner-published claim; external profiles conflict | Keep wording stable and reconcile profiles |
| Employment history | Achour Holding is current from September 2026; Aligned Tech ran from November 2025 through August 2026; both OGERO roles are internships. | Owner-confirmed and consistently published first-party | Correct controlled profiles; do not infer independent employer endorsement |
| OmniSign award and original team | Team attribution and award are stated consistently. | Verified by Rafik Hariri University | Publishable with team attribution |
| Makers AI Summer Camp instructor role | One of seven instructors for the eight-week camp in July-August 2023. | Verified by the organizer's public LinkedIn recap | Do not infer which workshop module Layth personally taught |
| OmniSign data and evaluation | Captured and augmented counts are separated; 98% remains bounded to a controlled internal evaluation. | Public code supports parts of the pipeline; retained evaluation record has explicit limits | Do not restore older broader claims from cached pages or profiles |
| PrivacyGuard | Public source and tests support the component boundary. Universal speed, anonymity, security, and legal-compliance claims are withdrawn. | Verified public artifacts plus explicit limitations | Reconcile external bios and old article titles |
| Withdrawn historical metrics | `2M+`, `95%`, `99.9%`, `100+ students`, universal `25–30 FPS`, legal compliance, guaranteed anonymity, and broad production-readiness claims are unsupported or undefined. | Unsupported claims | Do not republish; remove or qualify controlled copies |
| Hader and Alinia production status | The site distinguishes commercial/live status, team contribution, and confidential metrics. | Owner-published and official product URLs; client counts and operational metrics remain confidential | Do not add private proof or client identities |
| Lancaster fleet | Fourteen official domains and shared ownership with Tayseer Laz are stated consistently. | Public domains and repository history; no business-outcome metrics claimed | Keep the count tied to the listed official sites |
| Bridge | Two employer-owned implementations are kept separate with different ownership. | Repository/history evidence with confidentiality boundary | Do not imply a shared product, database, or sole ownership of both systems |
| BSHEEL co-founder wording | Owner-confirmed in the September 18 portfolio history: Layth is a co-founder whose primary role is business strategy and product direction; the public quest app is the earlier stage and a tourism-focused redesign is the later direction. The live app listings and Tayseer Laz's public case study corroborate the product but do not independently establish Layth's role or the unreleased direction. | Owner-confirmed; public product corroboration is partial | Current portfolio wording is publishable as an owner statement; do not present the tourism direction as launched or third-party-verified |
| HRFS leadership wording | Owner-confirmed in the portfolio history and retained source material: lead AI engineer and co-principal investigator; active research and development; no clinical-performance claim. No independent public source for the role was found in this audit. | Owner-confirmed; not independently corroborated | Current bounded wording is publishable; omit unsettled funder naming, cohort details, grant figures, clinical outcomes, and private research data |
| External profile reconciliation | Bayt, Hashnode, DEV, GitHub, Medium, and Crunchbase were materially aligned when checked live on 2026-10-08. LinkedIn's authenticated fields and old post remain unverified. RocketReach is in Data Curation. | Mixed: live-verified surfaces plus pending external checks | Prefer correction; do not delete DEV without approval; leave GitHub stable while caches refresh |

## Product-specific retrieval assessment

## Applying the How Search Works framework

The 2026-10-05 notes are useful as a dependency model, but Google-wide corpus sizes, spam volumes, experiment counts, and product-launch statistics are context rather than diagnostics for this portfolio. They do not support a score, forecast, or additional implementation by themselves.

1. **Crawling and discovery:** the site is public, internally linked, present in a clean sitemap, and accessible to Googlebot. Search Console confirms successful fetches. No discovery fix is currently justified.
2. **Indexing and canonicalization:** all 15 canonical URLs pass individual inspection, and Google-selected canonicals match the submitted URLs. Recently changed text may still appear stale until recrawled and reprocessed.
3. **Ranking and relevance:** project-specific queries already surface OmniSign, Hader, Alinia, and WhatsApp Coexistence pages. The useful next work is to preserve precise problem, contribution, status, evidence, and limitation copy on those canonical pages. Creating thin keyword variants would add duplication without evidence of user value.
4. **Quality and authority:** the portfolio provides strong first-party detail, and RHU supplies independent support for the OmniSign recognition and workshop. Additional authority should arise naturally from genuine public work, references, publications, event participation, or product documentation. Employer announcements, paid placements, fabricated profiles, and premature encyclopedia entries are excluded.
5. **Usability:** the delivered pages are static, compact, mobile-readable, and do not ship a client JavaScript bundle. This is favorable implementation evidence, but Core Web Vitals remain unmeasured and must not be inferred from transfer size or synthetic response time.
6. **Result presentation:** classic results, sitelinks, snippets, AI Overviews, AI Mode answers, and knowledge panels are separate outputs. The observed sitelinks show a strong navigational result. Google decides when AI Overviews are additive and creates knowledge panels automatically; neither can be forced with schema or submissions.
7. **Spam-policy boundary:** do not respond to low query volume by generating city pages, near-duplicate capability pages, mass AI articles, third-party host pages, or artificial mentions. The current small set of evidence-rich pages is aligned with Google's people-first and spam guidance.
8. **Measurement:** use Search Console for impressions, clicks, CTR, average position, and indexed status; use controlled answer-engine samples for generated-answer visibility and factual accuracy; use analytics only for referral and conversion outcomes. Keep those outcomes separate.

### Google Search, AI Overviews, and AI Mode

The site meets the observable technical eligibility basics, and Search Console now confirms indexing rather than merely eligibility. Google states that AI Overviews and AI Mode require normal Search eligibility and do not require special AI markup. Eligibility and indexing still do not guarantee ranking, an AI answer, a citation, or a knowledge panel.

The domain, apex URL-prefix, and `www` URL-prefix properties are accessible with owner permission. The sitemap is already submitted and healthy. All 15 canonical pages pass URL Inspection, so no sitemap resubmission, mass indexing request, or crawl change is warranted.

The 2026-10-08 entity changes are deployed. One indexing request for `/about/` and one for `/` were accepted because those pages contain the changed identity signals. Allow normal processing time. Continue measuring project queries and branded queries in Search Console; do not rewrite Hader or OmniSign snippets from the current small samples alone.

The observed bare-name result with the official domain and sitelinks is a valid navigational outcome. The absence of an AI Overview or knowledge panel in that single session is not a technical failure. Google says AI Overviews often do not trigger when they are not additive to classic Search, and knowledge panels are generated automatically from information across the web.

### ChatGPT Search

The wildcard robots rule permits OAI-SearchBot, and representative requests were not blocked by the live CDN. OpenAI states that OAI-SearchBot access supports discovery for ChatGPT search; it is separate from GPTBot model-development access. Track referrals containing `utm_source=chatgpt.com` once analytics is available.

### Microsoft Bing and Copilot

Bingbot can fetch the site. Bing Webmaster Tools sign-in was attempted on 2026-10-08 but stopped at Google's passkey challenge, so verification, index data, and AI Performance were not available. Complete the owner-authenticated checklist in the execution record. IndexNow remains optional; do not add it until there is a reliable post-deploy submission step.

### Claude and other answer engines

The wildcard policy currently permits Anthropic's documented bots as well as other conforming crawlers. Anthropic separates model-development, search, and user-directed retrieval agents. Claude web search could not be sampled without sign-in, and crawler access alone is not evidence of inclusion.

`llms.txt` and `profile.json` are supporting consistency artifacts. Neither is required by Google Search nor a guarantee that an answer engine will retrieve or cite the site.

## External identity cleanup backlog

Use the canonical site as the source of truth and do not copy unsupported historical metrics:

1. GitHub needs no further change based on the 2026-09-25 live recheck. Its bio, organization, README role, selected work, and Lancaster count align with the canonical site.
2. Medium needs no further profile, OmniSign-article, PrivacyGuard-framing, or article-canonical change based on the 2026-09-25 live browser recheck. Older search snippets are stale and should be monitored after recrawling rather than used as instructions to rewrite the corrected live articles.
3. LinkedIn redirected the unauthenticated browser to a sign-in wall. Current Google and Bing snippets show the Achour title, but they do not verify the authenticated About, experience dates, or PrivacyGuard post. Sign in and compare those fields with the exact replacement copy in the 2026-10-08 execution record.
4. Hashnode was rechecked live on 2026-10-08. Its bio and PrivacyGuard article are materially aligned; no change is currently requested.
5. DEV was rechecked live on 2026-10-08. Its profile, corrected PrivacyGuard title/canonical, benchmark boundaries, and compliance language are materially aligned; no edit or deletion is currently requested.
6. Bayt was rechecked live on 2026-10-08. The current employer, Aligned end date, OGERO internship labels, and reviewed claim boundaries are materially aligned; no edit is currently requested.
7. Crunchbase's live profile was rechecked on 2026-10-05. The inaccurate Aligned-Tech founder relationship is no longer shown; Achour Holding is current and Aligned-Tech is past. No further correction is requested unless a new material error appears.
8. RocketReach is materially stale. The owner sent a manual correction request to `privacy@rocketreach.co` on 2026-10-05 covering the facts established by the canonical site: current role at Achour Holding since September 2026; Aligned Tech as a past role from November 2025 through August 2026; COG Developers from September through October 2025; ORGANIZER | MEA from March through August 2025; both OGERO roles identified as internships with their canonical dates; the RHU degree named Bachelor of Engineering in Computer and Communications Engineering; and removal of the obsolete Aligned Tech email. RocketReach acknowledged the request on 2026-10-07, passed it to Data Curation, and stated that the changes should appear within 5–7 business days. Send no reply now; verify the live profile during 2026-10-14–16 and follow up only if material errors remain. Leave the Conservatoire, Sela Sport, RHU work-study, ZAKA, and student-club entries unchanged unless the owner confirms that a specific entry is false or supplies a stronger date record.

Use this canonical short description unless a platform needs a shorter variant:

> Layth Ayache is a Senior AI Engineer and AI Systems Engineer in Beirut. He turns data and models into usable systems and owns the engineering around them.

Do not automatically copy project metrics into profile bios. Link to the canonical case study where the evaluation conditions, attribution, status, and limitations are visible.

## Repeatable answer-engine measurement set

Run the same prompts in the same language and account/location context after deployment, then again after 2–4 weeks:

1. Who is Layth Ayache, and what does he work on now?
2. What AI systems has Layth Ayache built or helped build?
3. What was Layth Ayache’s role in OmniSign, and what are the system’s limitations?
4. Who built PrivacyGuard, and what does it actually prove?
5. What is Hader, and what did Layth Ayache contribute?
6. Which AI engineers in Lebanon have demonstrated conversational AI, computer vision, and systems-integration work?
7. I need 10 senior AI systems engineers in Lebanon for a production AI project.

For every product and prompt, record the date, product/surface, language, account and location context when known, whether Layth appeared, whether a portfolio URL was cited, the cited URL, factual accuracy, material omissions, and the total sample count. Do not generalize from one answer.

## Corrected action list

### Remaining high-priority external actions

The audited build is live, and the custom noindex 404, feed, legacy redirects, canonical-host redirects, DNS, Pages deployment, and edge certificate were rechecked successfully on 2026-09-25. The previous `www` `522` and directly accessible `pages.dev` duplicate are resolved. No additional Cloudflare or deployment action is requested now.

1. The first-party identity cleanup is deployed and verified. Exactly one Google recrawl request was accepted for `/` and one for `/about/`; the healthy sitemap was not resubmitted.
2. Search Console access, sitemap health, canonical indexing, ordinary Web performance, and separate Generative AI performance are confirmed. Repeat the controlled prompt sample during 2026-10-22 through 2026-11-05.
3. GitHub, Medium, Crunchbase, Hashnode, DEV, and Bayt pass their current live consistency checks. Sign in to LinkedIn and compare the authenticated fields and old PrivacyGuard post with the prepared replacement copy. RocketReach acknowledged the focused correction on 2026-10-07; recheck its live headline, summary, employment timeline, education, and contact domain during 2026-10-14 through 2026-10-16.
4. Do not request an Achour Holding employee page or LinkedIn announcement. The company has no established employee-profile pattern, and manufactured employer coverage would not be a legitimate authority signal.

### Resolved owner-confirmed boundaries

1. BSHEEL does not require another owner confirmation. Preserve the co-founder attribution, primary business-strategy and product-direction role, earlier quest-app stage, and later tourism direction. Keep the later direction clearly unlaunched unless new public evidence establishes otherwise.
2. HRFS does not require another owner confirmation for the current portfolio wording. Preserve lead AI engineer, co-principal investigator, and active R&D status, with no clinical-performance claim. Funder naming, grant details, study cohort details, and institutional publication language remain outside the current claim.
3. Owner confirmation and independent corroboration are separate evidence categories. The absence of a third-party page does not erase an owner-confirmed fact; it limits how the evidence may be characterized.

### Optional decisions and measurement

1. The 2026-10-08 request left the crawler-policy choice as an unresolved placeholder. The live wildcard policy is therefore intentionally unchanged: model-development crawling remains allowed for now, and search/user-directed retrieval also remains available. This is a preservation decision, not an endorsement of training access; change it only after the owner explicitly chooses the blocking option.
2. Cloudflare currently reports SSL mode `Full`. This encrypts the connection to the origin but does not validate the origin certificate; Cloudflare recommends `Full (strict)` whenever the origin supports it. Treat a tested move to `Full (strict)` as optional security hardening, not an SEO or indexing blocker.
3. Complete Bing Webmaster Tools sign-in, import the verified Search Console property if absent, inspect the four specified URLs, and record AI Performance using the exact manual checklist above. General referral/conversion analytics are optional and should be added only if that measurement is wanted and implemented with an appropriate privacy policy.
4. Run a real-browser Core Web Vitals lab trace when the necessary browser tooling is available. The current static delivery checks do not show a release blocker, but they are not field or lab CWV evidence.
5. Repeat the controlled answer-engine prompt set during 2026-10-22 through 2026-11-05. Do not interpret crawler access as citation evidence.

### Not required now

- Do not add more schema types, AI-specific files, or keyword pages without a content and evidence reason.
- Do not mass-request indexing or repeatedly resubmit an already successful sitemap.
- Do not add IndexNow until there is a reliable deployment hook and an actual freshness need.
- Do not create or claim third-party profiles solely for SEO.

## Current primary guidance used

- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central: [Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) and [generative AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Google Search: [How Search works](https://www.google.com/search/howsearchworks/how-search-works/), [organizing information](https://www.google.com/search/howsearchworks/how-search-works/organizing-information/), and [ranking results](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)
- Google Search Central: [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Google Knowledge Panel Help: [about knowledge panels](https://support.google.com/knowledgepanel/answer/9163198) and [how the Knowledge Graph works](https://support.google.com/knowledgepanel/answer/9787176)
- Google Search Central: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- Google Search Central: [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- Google Search Console: [URL Inspection](https://support.google.com/webmasters/answer/9012289) and [Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- OpenAI: [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- OpenAI: [crawler user agents](https://developers.openai.com/api/docs/bots)
- Microsoft Bing: [Sitemaps](https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed) and [URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305)
- Microsoft Bing: [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- Anthropic: [web crawler controls](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- RocketReach: [updating personal information](https://knowledgebase.rocketreach.co/hc/en-us/articles/33964124586139-How-do-I-Update-my-Information-on-RocketReach) and [profile removal](https://rocketreach.co/remove-profile/)
- Cloudflare Pages: [serving pages and custom 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- Cloudflare Pages: [redirecting a `pages.dev` hostname to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- Cloudflare: [Bulk Redirect evaluation](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/) and [custom-domain behavior](https://developers.cloudflare.com/pages/configuration/custom-domains/)
