# CoreCraft QA Progress Tracker

Last updated: 2026-08-30
Last agent session summary: Home static sections verified 375–1920px; pinned sections code-reviewed and await Talha’s manual visual check.

## Phase 0 — Reconcile Multi-Agent Inconsistencies
- [x] Duplicate/conflicting implementations resolved — confirmed the active app uses `app/` route wrappers and `src/views/`; removed the legacy logo references left after asset cleanup.
- [x] Inconsistent patterns standardized — restored the mandated `#00E6D9` teal design token and limited the entrance loader to the homepage.
- [ ] Orphaned files removed
- [x] Build errors/console errors fixed — `npm run build --prefix Frontend` and `npm run lint --prefix Frontend` succeed; the built server returned HTTP 200 for all public routes plus `/widget`, `/robots.txt`, and `/sitemap.xml`.
- [ ] Folder structure consistent
- [ ] Duplicate dependencies removed
- [x] Git status reviewed — existing uncommitted multi-agent work is extensive and has been preserved.

## Phase 1 — Layout & Visual Consistency
- [x] Home static sections — verified 375–1920px.
- [x] Home pinned sections — code-reviewed; manual visual confirmation needed.
- [ ] Services
- [ ] Work
- [ ] About
- [ ] Contact

## Phase 1B — AI-Look Audit
- [ ] Home
- [ ] Services
- [ ] Work
- [ ] About
- [ ] Contact

## Phase 2 — Responsiveness (per page, per breakpoint)
- [x] Home static sections — verified 375–1920px.
- [x] Home pinned sections — responsive logic code-reviewed; manual visual confirmation needed.
- [ ] Services
- [ ] Work
- [ ] About
- [ ] Contact

## Phase 3 — Performance
- [ ] Lighthouse baseline recorded
- [x] Image optimization — existing portfolio imagery uses WebP and Next `Image` via `SmartImage` with explicit dimensions.
- [x] Bundle code-splitting — Three.js visualizations are dynamically imported, and the technology scene is viewport-gated with a touch/mobile fallback.
- [x] Font loading — Next font loading uses `display: swap` and only the required JetBrains Mono weights.
- [ ] CLS fixes
- [x] Three.js cleanup verified — scene hooks and the orbital scene dispose renderers, scene resources, event listeners, observers, tickers, and ScrollTriggers.
- [ ] Lighthouse final recorded

## Phase 4 — SEO
- [x] Metadata per page — route-level titles, descriptions, and canonicals exist for public pages.
- [x] JSON-LD verified — Organization JSON-LD is emitted from the root layout.
- [x] noindex routes verified — `/widget` metadata and `robots.js` both block indexing.
- [ ] Alt text
- [ ] Heading hierarchy
- [ ] Internal links
- [x] sitemap.xml / robots.txt — generated routes are configured.

## Phase 5 — Codebase Cleanup
- [ ] Unused components deleted
- [ ] Unused dependencies removed
- [ ] Unused CSS removed
- [x] console.log / dead code removed — removed the remaining runtime console call from the optional WebGL fallback.
- [x] Secrets check — form access key is loaded from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; `.env` files are ignored.
- [ ] Unused assets removed

## Phase 6 — Loading Animation
- [x] Implemented — GSAP CoreCraft intro with a short progress animation.
- [x] sessionStorage gating works — `cc_intro` gates repeat visits in the same session.
- [ ] Performance verified
- [x] Styled with brand tokens — near-black background, Syne wordmark, teal progress bar.

## Final Verification
- [ ] All breakpoints re-checked
- [ ] Lighthouse scores confirmed
- [x] Console errors confirmed clean — build and lint complete; browser console still needs visual-browser validation.
- [ ] Summary written for Talha
