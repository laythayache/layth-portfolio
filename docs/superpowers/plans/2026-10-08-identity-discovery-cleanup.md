# Identity and Discovery Cleanup Execution Plan

**Goal:** Publish the existing evidence-bounded identity cleanup, add resilient favicon fallbacks, reconcile controlled public profiles where authenticated access permits, validate webmaster state, and establish a reproducible cross-engine answer baseline.

**Architecture:** Keep the static, no-client-JavaScript site and its current canonical/entity model. Treat `DISCOVERY_AUDIT.md` as the shared evidence, claim, action, and measurement ledger. Extend the existing build validator before adding PNG/ICO assets so favicon regressions become a tested contract. Publish only the scoped repository files through the existing GitHub-to-Cloudflare Pages workflow, then verify production independently.

**Constraints:** Preserve existing work; publish no unsupported metrics, legal-compliance claims, production claims, or manufactured authority; keep first-party, webmaster, answer-engine, and conversion outcomes separate. Do not change crawler access without a resolved policy choice and current official documentation.

---

## Task 1: Audit and normalize the prepared identity changes

**Files:**
- Modify: `DISCOVERY_AUDIT.md`
- Modify: `index.html`
- Modify: `about/index.html`
- Modify: `public/profile.json`
- Modify: `public/llms.txt`
- Modify: `public/sitemap.xml`

1. Compare every prepared claim to the canonical claim boundaries and Git history.
2. Keep stale DEV, Hashnode, and Bayt URLs out of endorsed `sameAs`, contact, and visible-profile sets.
3. Confirm the exact current Achour Holding title, Aligned Tech end date, OGERO internship status, project evidence limits, and consistent modification dates.
4. Update the audit ledger with verified, owner-confirmed, inferred, unsupported, and pending-correction statuses, including the October 7 RocketReach acknowledgement.

## Task 2: Add favicon fallbacks with a regression test

**Files:**
- Modify: `scripts/validate.mjs`
- Modify: every source HTML file under `/`, `/about/`, `/projects/`, `/writing/`, and `public/404.html`
- Add: `public/favicon.png`
- Add: `public/favicon.ico`

1. Extend validation to require SVG, PNG, and ICO build outputs and consistent HTML declarations.
2. Run `npm run validate` and confirm the new contract fails because the fallback assets/declarations are missing.
3. Render 64×64 PNG and ICO files from the existing 64×64 SVG without redesigning it.
4. Add the three icon declarations consistently to every HTML document.
5. Run validation again and confirm the favicon contract passes.

## Task 3: Complete local validation and scoped review

**Files:** all scoped files above.

1. Run `npm run validate`.
2. Run `git diff --check` and parse every JSON-LD block independently.
3. Recheck canonical/sitemap parity, internal links/assets, favicon signatures and MIME expectations, crawler policy, and the final staged diff.
4. Verify that no unrelated file is included.

## Task 4: Publish and verify production

1. Establish the repository's actual publication path from Git history, GitHub, and Cloudflare Pages state.
2. Commit only task-related files and push `main` without force.
3. Wait for the production deployment and record its commit/deployment identifier.
4. Verify all required routes, assets, MIME types, real 404 behavior, and HTTP/`www`/`pages.dev` canonical redirects against the live deployment.

## Task 5: Reconcile external profiles and webmaster tools

1. Inspect LinkedIn, Bayt, Hashnode, DEV, and GitHub in authenticated browser sessions where available.
2. Correct controlled content using the evidence ledger; do not delete DEV content without explicit approval.
3. Leave GitHub unchanged unless a new contradiction is observed.
4. Record RocketReach as pending; schedule or document the October 14–16 verification window and send no message now.
5. In Bing Webmaster Tools, verify/import the property, inspect the four requested URLs, review sitemap/index/crawl/AI Performance evidence, and submit only if justified.
6. In Google Search Console, inspect the deployment and request recrawl only for `/` and `/about/`; do not resubmit the healthy sitemap.

## Task 6: Record answer-engine baseline and follow-up

1. Run the seven exact prompts independently on each accessible product surface.
2. Record product, surface, date, language, context, prompt, appearance, position, site citation, cited URL, accuracy, omissions, and denominator.
3. Mark inaccessible products untested and provide a literal manual run sheet.
4. Schedule a repeat 2–4 weeks after verified deployment when scheduling is available; otherwise record the exact date window.
5. Preserve the current crawler policy because the placeholder choice is unresolved, while documenting the separation between model-development and search/user-retrieval bots.

## Task 7: Final verification and handoff

1. Re-run all local and live checks from fresh state.
2. Reconcile the audit ledger with actual external results—never planned results.
3. Report changed files, preserved work, commands and outcomes, deployment proof, external actions, webmaster actions, answer-engine denominators, crawler-policy disposition, remaining contradictions, RocketReach date, follow-up window, and authenticated manual actions.
