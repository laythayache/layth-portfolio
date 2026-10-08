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
2. External identity consistency remains incomplete. GitHub and Medium are current; Crunchbase's live profile now treats Achour Holding as current and Aligned Tech as past; RocketReach acknowledged the correction on 2026-10-07 and passed it to Data Curation; and LinkedIn, Hashnode, DEV, and Bayt still require the platform-specific checks described below.
3. Search visibility is real but still a small sample. For 2026-09-08 through 2026-10-05, Search Console reported 15 clicks, 253 impressions, 5.93% CTR, and average position 5.9. Project queries appear in the visible rows, while visible branded-query volume is limited and privacy filtering hides some query data.
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
| Cloudflare deployment | The production Pages deployment for repository commit `8cd01b9` completed successfully from `main`, and the custom domain is attached to that deployment. | Cloudflare API evidence, rechecked on 2026-09-25 |
| Crawl access | Googlebot, Bingbot, OAI-SearchBot, and GPTBot user agents received `200` on a representative case study. | Eligibility only; not proof of indexing or citation |
| Google ownership | A Google site-verification TXT record is present in DNS, and the connected account has `siteOwner` permission for the domain property and both apex and `www` URL-prefix properties. | Verified in Search Console on 2026-10-05 |
| Search Console ownership and identity pages | The connected account is a site owner for the domain property. URL Inspection on 2026-10-05 reported both `/` and `/about/` as submitted and indexed, crawlable, fetched successfully, and using the submitted canonical. The homepage was last crawled on 2026-09-30; `/about/` was last crawled on 2026-09-24. | Live Search Console evidence; request one recrawl of `/about/` after the 2026-10-05 deployment |
| About-page structured data | Search Console's 2026-09-24 indexed copy reports an invalid `dateModified` warning. The live HTML fetched on 2026-10-05 contains the valid ISO 8601 value `2026-10-01T16:11:12+03:00`; the prepared local update uses `2026-10-08T11:38:00+03:00`. The warning therefore predates both valid versions. | Live source valid; indexed validation pending recrawl after the prepared update is deployed |
| Canonical URL indexing | Batch URL Inspection returned `PASS:15`. All 15 sitemap URLs are submitted and indexed, use the submitted canonical, allow Googlebot and indexing, and were fetched successfully as mobile Googlebot. | Live Search Console evidence on 2026-10-05 |
| Sitemap | Search Console reports one submitted sitemap, last downloaded on 2026-10-03, with 15 submitted URLs, no warnings, and no errors. Its summary field reports zero indexed URLs even though URL Inspection confirms all 15 individually; do not treat the summary field as an indexing count. | Sitemap healthy; no resubmission needed |
| Search performance | For the final-data period 2026-09-08 through 2026-10-05, Google Web Search reported 15 clicks, 253 impressions, 5.93% CTR, and average position 5.9. The preceding equal period reported 3 clicks, 147 impressions, 2.04% CTR, and position 11.6. | Measured improvement on a small sample; not evidence of a durable trend or a specific cause |
| Visible query opportunities | `omnisign` produced 2 clicks from 28 impressions at position 7.4; `hader ai` produced 0 clicks from 19 impressions at position 7.6; `whatsapp coexistence` produced 0 clicks from 3 impressions at position 38.3. Only 11 query-page rows were exposed, so privacy-filtered queries are absent. | Monitor before changing copy; sample is too small for a reliable CTR rewrite decision |
| Achour Holding people pages | A 2026-10-05 review of the live homepage, careers page, indexed pages, and internal homepage links found no employee directory or individual employee profiles. The homepage gives Chairman Wissam Achour a named message section; news pages name people only when relevant to events. The owner confirmed that individual employee announcements are not an established company practice. | No employer-profile or announcement outreach is recommended. Use an Achour source only if the company publishes one organically for a genuine business reason. |
| Makers AI Summer Camp | A Makerspace Solutions LinkedIn recap states that the organization hosted an eight-week AI, engineering, and technology camp in July and August 2023 and explicitly names Layth Ayache among seven instructors. It lists the camp's workshop topics collectively but does not assign a particular module to any named instructor. | Organizer-published corroboration; publish the instructor role and dates, but do not claim a specific module from this source |
| Index freshness | Search snippets have surfaced older wording, while URL Inspection confirms that every canonical URL is indexed. Most inspected pages were last crawled between 2026-09-24 and 2026-10-03, so recently corrected copy still needs normal recrawl and processing time. | Freshness lag, not an indexing failure |
| RocketReach profile | The live profile at `https://rocketreach.co/layth-ayache-email_795003765` returned `200` on 2026-10-05 but still identifies Aligned Tech as the current employer, lists `2025-now`, exposes an `@aligned-tech.com` contact, omits the internship status from both OGERO entries, and uses an imprecise RHU degree name. RocketReach acknowledged the owner's correction on 2026-10-07, passed it to its Data Curation Team, and stated a 5–7-business-day processing window. | Pending external correction; send no reply now and verify the live profile during 2026-10-14–16 |
| HTML | All 15 built HTML documents passed the W3C Nu validator with no errors. | Local validation |
| Build integrity | `npm run validate` passes for 15 canonical pages, one noindex 404, 16 JSON-LD blocks, 15 sitemap URLs, 5 feed items, checked internal links/assets/fragments, and the SVG/PNG/ICO favicon contract. | Local validation on 2026-10-08 |
| Delivery | Representative live responses had roughly 50–75 ms time to first byte from the audit location. The homepage transferred about 3.2 KB compressed, CSS about 4.6 KB, and there is no client JavaScript bundle. | Point-in-time synthetic observation, not Core Web Vitals |
| Core Web Vitals | LCP, CLS, INP, FCP, TBT, and Speed Index were not measured because the required Chrome DevTools connector was unavailable. | Untested |
| Google AI Overview sample | In one incognito, English-language, Beirut-context observation on 2026-10-05, the bare-name query `layth ayache` returned the official site with sitelinks and LinkedIn but no AI Overview. The comparison query `abed al fattah amouneh` returned an AI Overview citing LinkedIn and GitHub. | One observation per query; result treatment is query-specific and is not a comparative quality score |
| Other AI citations | No controlled end-user sample was run in Google AI Mode, ChatGPT Search, Microsoft Copilot, Claude web search, or Perplexity. | Untested; denominator is zero |

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
| External profile reconciliation | LinkedIn, Bayt, Hashnode, and DEV need controlled-account corrections; RocketReach is in Data Curation; GitHub is already corrected. | Pending external corrections | Prefer correction; do not delete DEV without approval; leave GitHub stable while caches refresh |

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

After the prepared 2026-10-08 entity changes are deployed, request indexing once for `/about/` and `/` because those pages contain the changed `Person` identity signals. Then allow normal processing time. Continue measuring project queries and branded queries in Search Console; do not rewrite Hader or OmniSign snippets from the current small samples alone.

The observed bare-name result with the official domain and sitelinks is a valid navigational outcome. The absence of an AI Overview or knowledge panel in that single session is not a technical failure. Google says AI Overviews often do not trigger when they are not additive to classic Search, and knowledge panels are generated automatically from information across the web.

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
2. Medium needs no further profile, OmniSign-article, PrivacyGuard-framing, or article-canonical change based on the 2026-09-25 live browser recheck. Older search snippets are stale and should be monitored after recrawling rather than used as instructions to rewrite the corrected live articles.
3. LinkedIn's current profile redirected the unauthenticated browser to a sign-in wall. However, a search copy crawled two weeks before this audit still identifies Aligned Tech as the current employer, uses the older positioning, and exposes an unsupported PrivacyGuard post. Sign in, compare the current profile and post with the canonical site, and correct them if that recent indexed copy still reflects the account.
4. Hashnode still describes an outdated Aligned Tech role and exposes unsupported metrics and compliance claims. Correct or remove it if the profile is controlled and intended to remain public.
5. DEV still exposes the older PrivacyGuard title and claims about price, frame rate, legal compliance, Arabic plate tuning, and deployment context that are not supported by the current public case study. Correct or remove that article if it is controlled.
6. Bayt is conditional: update it only if the profile is controlled and still used professionally.
7. Crunchbase's live profile was rechecked on 2026-10-05. The inaccurate Aligned-Tech founder relationship is no longer shown; Achour Holding is current and Aligned-Tech is past. No further correction is requested unless a new material error appears.
8. RocketReach is materially stale. The owner sent a manual correction request to `privacy@rocketreach.co` on 2026-10-05 covering the facts established by the canonical site: current role at Achour Holding since September 2026; Aligned Tech as a past role from November 2025 through August 2026; COG Developers from September through October 2025; ORGANIZER | MEA from March through August 2025; both OGERO roles identified as internships with their canonical dates; the RHU degree named Bachelor of Engineering in Computer and Communications Engineering; and removal of the obsolete Aligned Tech email. RocketReach acknowledged the request on 2026-10-07, passed it to Data Curation, and stated that the changes should appear within 5–7 business days. Send no reply now; verify the live profile during 2026-10-14–16 and follow up only if material errors remain. Leave the Conservatoire, Sela Sport, RHU work-study, ZAKA, and student-club entries unchanged unless the owner confirms that a specific entry is false or supplies a stronger date record.

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
6. Which AI engineers in Lebanon have demonstrated conversational AI, computer vision, and systems-integration work?
7. I need 10 senior AI systems engineers in Lebanon for a production AI project.

For every product and prompt, record the date, product/surface, language, account and location context when known, whether Layth appeared, whether a portfolio URL was cited, the cited URL, factual accuracy, material omissions, and the total sample count. Do not generalize from one answer.

## Corrected action list

### Remaining high-priority external actions

The audited build is live, and the custom noindex 404, feed, legacy redirects, canonical-host redirects, DNS, Pages deployment, and edge certificate were rechecked successfully on 2026-09-25. The previous `www` `522` and directly accessible `pages.dev` duplicate are resolved. No additional Cloudflare or deployment action is requested now.

1. Deploy the prepared first-party entity cleanup through the repository's established publication flow when authorized. After the deployment is live, request indexing once for `/about/` and optionally `/`; do not resubmit the healthy sitemap or mass-request all 15 already indexed URLs.
2. Search Console access, sitemap health, and canonical indexing are confirmed. Review performance again after a comparable final-data window rather than treating the current 28-day increase as a durable trend.
3. GitHub, Medium, and the live Crunchbase profile pass their current consistency checks. Sign in to LinkedIn and correct the old employer/positioning and unsupported PrivacyGuard post if the recent indexed copy still reflects the account. Correct or remove the stale Hashnode profile and DEV PrivacyGuard article if those surfaces are controlled and meant to remain public. RocketReach acknowledged the focused correction on 2026-10-07; recheck its live headline, summary, employment timeline, education, and contact domain during 2026-10-14–16.
4. Do not request an Achour Holding employee page or LinkedIn announcement. The company has no established employee-profile pattern, and manufactured employer coverage would not be a legitimate authority signal.

### Resolved owner-confirmed boundaries

1. BSHEEL does not require another owner confirmation. Preserve the co-founder attribution, primary business-strategy and product-direction role, earlier quest-app stage, and later tourism direction. Keep the later direction clearly unlaunched unless new public evidence establishes otherwise.
2. HRFS does not require another owner confirmation for the current portfolio wording. Preserve lead AI engineer, co-principal investigator, and active R&D status, with no clinical-performance claim. Funder naming, grant details, study cohort details, and institutional publication language remain outside the current claim.
3. Owner confirmation and independent corroboration are separate evidence categories. The absence of a third-party page does not erase an owner-confirmed fact; it limits how the evidence may be characterized.

### Optional decisions and measurement

1. The 2026-10-08 request left the crawler-policy choice as an unresolved placeholder. The live wildcard policy is therefore intentionally unchanged: model-development crawling remains allowed for now, and search/user-directed retrieval also remains available. This is a preservation decision, not an endorsement of training access; change it only after the owner explicitly chooses the blocking option.
2. Cloudflare currently reports SSL mode `Full`. This encrypts the connection to the origin but does not validate the origin certificate; Cloudflare recommends `Full (strict)` whenever the origin supports it. Treat a tested move to `Full (strict)` as optional security hardening, not an SEO or indexing blocker.
3. Add or import Bing Webmaster Tools if it is not already configured. General referral/conversion analytics are optional and should be added only if that measurement is wanted and implemented with an appropriate privacy policy.
4. Run a real-browser Core Web Vitals lab trace when the necessary browser tooling is available. The current static delivery checks do not show a release blocker, but they are not field or lab CWV evidence.
5. Run the controlled answer-engine prompt set after the corrected site has been indexed. Do not interpret crawler access as citation evidence.

### Not required now

- Do not add more schema types, AI-specific files, or keyword pages without a content and evidence reason.
- Do not mass-request indexing or repeatedly resubmit an already successful sitemap.
- Do not add IndexNow until there is a reliable deployment hook and an actual freshness need.
- Do not create or claim third-party profiles solely for SEO.

## Current primary guidance used

- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search: [How Search works](https://www.google.com/search/howsearchworks/how-search-works/), [organizing information](https://www.google.com/search/howsearchworks/how-search-works/organizing-information/), and [ranking results](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)
- Google Search Central: [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Google Knowledge Panel Help: [about knowledge panels](https://support.google.com/knowledgepanel/answer/9163198) and [how the Knowledge Graph works](https://support.google.com/knowledgepanel/answer/9787176)
- Google Search Central: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- Google Search Central: [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- Google Search Console: [URL Inspection](https://support.google.com/webmasters/answer/9012289) and [Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- OpenAI: [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- Microsoft Bing: [Sitemaps](https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed) and [URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305)
- Microsoft Bing: [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- Anthropic: [web crawler controls](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- RocketReach: [updating personal information](https://knowledgebase.rocketreach.co/hc/en-us/articles/33964124586139-How-do-I-Update-my-Information-on-RocketReach) and [profile removal](https://rocketreach.co/remove-profile/)
- Cloudflare Pages: [serving pages and custom 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- Cloudflare Pages: [redirecting a `pages.dev` hostname to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- Cloudflare: [Bulk Redirect evaluation](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/) and [custom-domain behavior](https://developers.cloudflare.com/pages/configuration/custom-domains/)
