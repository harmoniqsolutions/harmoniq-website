# HarmoniQ website upgrade

## Project context

This engagement uses Intent's context → evaluate → prioritize → execute → verify workflow. The owner's brief establishes the business facts: HarmoniQ is a newer AV, IT, and security installation company; jobs include homes, churches, and small businesses; installations usually involve a two- or three-person team. The owner approved a full website upgrade and a push to the existing remote to trigger Vercel deployment.

Visitors should be able to recognize a service they need, see that their space and job size fit, understand who will do the work, and contact the team. Likely situations include improving home Wi-Fi, installing cameras, upgrading church sound, and setting up technology in a small business. These are design assumptions derived from the owner's brief, not findings from customer interviews.

Success means an accurate first impression, equal visibility for AV / IT / security, discoverable contact options, usable mobile and keyboard navigation, and honest confirmation of inquiry delivery. A futuristic visual identity should strengthen this clarity. No project photos, reviews, certifications, service territories, response-time promises, or partnerships should be invented.

Confirmed claim boundaries: **10+ completed projects**, **5+ years of experience**, and a usually **2–3-person team**. Experience refers to practical/team experience, not the age of the newer company. The existing phone and email remain the public contact channels. UniFi and Ruckus Wireless join the technology brands; inclusion means technologies used, not proof of a reseller or certification relationship.

## Baseline audit

Method: source-level review of the homepage sections, global styling, metadata, navigation, contact form, and contact endpoint. This is an expert heuristic review and simulated cognitive walkthrough, without analytics or recruited users. It cannot establish conversion performance, customer preferences, WCAG conformance, actual email-provider configuration, or production deployment linkage. Findings describe the baseline before implementation.

| Priority | Evidence | Visitor impact | Route / action |
| --- | --- | --- | --- |
| P1 | `Hero.js` says modern commercial spaces and large-scale deployments; `About.js` presents a full-service commercial AV integration firm; `Footer.js` repeats commercial positioning. | Homes and smaller jobs appear outside the company's scope; IT and security requests have no clear invitation. | Intent context + articulate: state all three disciplines and practical job types prominently. |
| P1 | `About.js` lists 20+ projects, 10+ years, 100% client satisfaction. `WhyChooseUs.js` claims manufacturer certifications, guaranteed reliability, and extensive support offerings. | Unsupported proof and broad promises create inaccurate expectations. | Articulate: use owner-approved counts; remove satisfaction and certification assertions and absolute guarantees. |
| P1 | `api/contact/route.js` does not inspect the Resend SDK's returned `error`; it reports success after awaiting both calls. | An inquiry can appear delivered when the provider rejected it. | Fortify / blueprint: check actual provider results; treat team notification as the delivery success boundary. |
| P1 | Contact endpoint initializes its provider before checking input; `trim()` assumes request fields are strings. | Missing configuration or malformed JSON values can crash instead of returning useful errors. | Fortify: validate shape, required fields, types, and length before provider work; return actionable failure statuses. |
| P1 | Shared entrance variants start content at zero opacity; there is no reduced-motion policy and several perpetual animations run. | Motion-sensitive visitors cannot suppress movement; content visibility depends heavily on client animation. | Include: prefer visible content, honor motion preferences, retain a static presentation. |
| P2 | `Navbar.js` has an accessible button label but no expanded state, controlled-panel relationship, or Escape dismissal; page has no skip link and wraps navigation/footer inside `main`. | Keyboard and screen reader orientation is incomplete. | Include / journey: skip link, distinct page landmarks, expanded state, controlled menu, Escape return focus. |
| P2 | Contact success/error messages have no live-region semantics. Company placeholders and AV-only invitation imply business projects. | Dynamic feedback can be missed; residential visitors may feel excluded. | Include / articulate: announce statuses, preserve failure data, label optional organization clearly, invite all job types. |
| P2 | `layout.js` titles and descriptions describe commercial AV alone; no explicit canonical, robots, or sitemap files exist. | Search and shared links repeat obsolete positioning. | Articulate / specify: align SEO with AV, IT, security and the real audiences; add supported metadata conventions. |
| P2 | Repeated symmetrical cards and generic enterprise language dominate the homepage; brand list is AV-heavy. | The company feels larger and less personal than its actual working model. | Organize / articulate: use recognizable jobs, small-team explanation, practical process, and broader technology coverage. |

There is no observed countdown, scarcity pressure, forced signup, marketing consent, or hidden purchase flow. The material trust issue is unsupported social proof and operational claims, rather than evidence of intentional manipulation. Contact data should stay limited to what the team needs to respond.

### Baseline heuristic scores

Scale: 0 = no issue observed, 1 = cosmetic, 2 = minor, 3 = major, 4 = blocks the core task. Scores are expert judgments from source evidence, not measured user outcomes. The source-review index is **45/100**, calculated as `100 − (22/40 × 100)` from the ten severity scores. It is a prioritization aid, not an objective usability grade.

| Heuristic | Severity | Basis |
| --- | ---: | --- |
| H1 Visibility of status | 3 | Provider failures can produce a false success; form announcements absent. |
| H2 Match to the real world | 3 | Enterprise commercial AV language contradicts owner-defined jobs. |
| H3 User control | 2 | Mobile panel lacks Escape dismissal; motion cannot be reduced. |
| H4 Consistency | 1 | Consistent visual vocabulary, but labels and scope need broadening together. |
| H5 Error prevention | 3 | Request type/configuration validation and provider-result checking missing. |
| H6 Recognition | 1 | Familiar named navigation and labeled inputs already present. |
| H7 Efficiency | 2 | No skip navigation; no autofill guidance; direct email/phone are helpful. |
| H8 Minimalist design | 2 | Many generic claims/cards compete with practical project recognition. |
| H9 Error recovery | 3 | Generic failure and false-delivery path undermine recovery confidence. |
| H10 Help | 2 | No simple installation process or handoff expectations explaining next steps. |

### Simulated task walkthrough

| Task / step | Baseline assessment | Reason |
| --- | --- | --- |
| Homeowner checks whether help is offered for Wi-Fi or cameras | Failure | Hero emphasizes commercial AV; services do not clearly identify either need. |
| Church volunteer finds a worship-space sound solution | Pass | Worship is an explicit audience with relevant examples. |
| Small-business owner determines whether a modest job fits | Hesitation | One SMB card exists, while large-scale and enterprise language dominate. |
| Visitor chooses an inquiry channel | Pass | Quote CTA, email link, and phone link are available. |
| Visitor completes form and confirms delivery | Failure under provider rejection | Visible loading/success exists, but success is not tied to accepted team email and is not announced. |

Protect these strengths: a single-page structure, stable section anchors, clear primary contact actions, public phone/email alternatives, explicit input labels, responsive grids, local brand assets, and the established dark identity.

## Execution plan and rationale

1. **Reframe the promise.** Introduce AV, IT, and security at the first screen, with homes, churches, and small businesses as recognizable contexts. Translate technology categories into job examples so a visitor can assess fit without specialist knowledge.
2. **Correct proof and expectations.** Use the owner-approved project/experience figures, describe the small crew positively and plainly, and replace universal guarantees with practical commitments such as clear scope, tidy work, testing, and a walkthrough.
3. **Build a stronger futuristic visual system.** Retain dark surfaces while introducing a more deliberate type hierarchy, cyan/gold highlights, technical grid details, and an abstract connected-system illustration. Use asymmetric composition and purposeful information panels so the homepage feels distinctive while text remains readable. Decorative status displays must not claim live monitoring or fabricated operational metrics.
4. **Align the complete visitor journey.** Services → spaces served → team/proof → working process → brands → contact. Keep service and space links stable. Invite small improvements as well as installs; explain what happens after contact without inventing an SLA.
5. **Broaden technology coverage.** Add UniFi and Ruckus Wireless beside the existing manufacturers. Present brands as technologies the team works with and avoid invented badges, authorized-partner language, or certification implications.
6. **Harden navigation and inquiry handling.** Support skip navigation, keyboard menu dismissal, visible focus, reduced motion, and clear live statuses. Validate server requests and surface delivery failures honestly. Verify provider failure/configuration cases without sending unsolicited real test emails.
7. **Align search/share presentation.** Update title, description, canonical, social preview, and crawler metadata using this project's Next 16.2.2 documentation. Keep location claims absent until a service area is confirmed.
8. **Validate and deploy.** Run lint/build and focused route tests, inspect desktop/mobile rendering and interaction, review the diff, commit only upgrade files, and push the existing branch/remote authorized by the owner. Check the production domain and deployment status when available; distinguish push completion from a verified live deployment.

## Acceptance checklist

- [x] The first screen names AV, IT, and security and includes homes, churches, and small businesses.
- [x] Services describe practical audio/video, network/Wi-Fi, and security installation work.
- [x] Small projects and the usual 2–3-person team are explicit.
- [x] Proof uses 10+ projects and 5+ years; no satisfaction percentage or invented certification remains.
- [x] Industries/spaces match the owner's current clients.
- [x] UniFi and Ruckus Wireless are visible without unsupported partner claims.
- [x] Futuristic graphics remain decorative; essential copy is readable and available with reduced motion.
- [x] Mobile layout has no horizontal overflow at 320, 375, 390, 768, 1024, and 1440px, including the restored manufacturer images.
- [x] Menu, skip link, anchors, form, and contact alternatives have keyboard support; mobile menu dismissal and return focus verified in the browser.
- [x] Invalid/malformed inquiries return controlled errors; provider rejection cannot show success.
- [x] Failure preserves the inquiry and exposes phone/email recovery; success receives focus.
- [x] Metadata, canonical URL, robots, sitemap, and share preview reflect the new scope.
- [x] Lint/build and focused interaction/server checks pass; test scope and limitations are recorded.
- [ ] Upgrade files are committed and pushed; production status is recorded separately.

## Technical and verification context

Baseline stack: Next 16.2.2, React 19.2.4, Tailwind 4, Framer Motion 12.38, Resend 6.10. The baseline provided `dev`, `build`, `start`, and `lint` scripts, with no test suite. The upgrade adds a persistent `npm test` suite for the inquiry endpoint and removes the unused Framer Motion dependency. Browser checks use temporary tooling rather than adding a browser-test dependency to the production project.

Existing remote: `https://github.com/harmoniqsolutions/harmoniq-website.git`. The baseline metadata used `https://harmoniqsolutions.com`; a live check observed that apex returning a 307 redirect to `https://www.harmoniqsolutions.com`, which is now the shared canonical site URL. No project-local `.vercel` connection file, `vercel.json`, or GitHub deployment workflow was present in the baseline. The implementation lead independently confirmed the existing hosting connection through live Vercel response headers and GitHub Production deployment `4301677474`, associated with baseline commit prefix `eadaeee`. That evidence confirms the existing connection, not deployment of the unpushed upgrade.

Documentation consulted: `.agents/skills/intent/SKILL.md`, `.agents/skills/evaluate/SKILL.md`, Intent accessibility foundations, and installed Next documentation for accessibility and metadata/OG conventions. Existing untracked skill directories are unrelated owner workspace content and must not be included in the website commit.

## Post-change verification

### Source review

The implemented content consistently describes a small AV / IT / security installation company serving homes, churches, small businesses, and community spaces. The hero welcomes smaller jobs; the about section uses 10+ projects, 5+ years of hands-on experience, and a typical 2–3-person crew. Unsupported satisfaction percentages, manufacturer certification claims, and enterprise-scale positioning have been removed. UniFi and RUCKUS Wireless are named as technologies used without partner implications.

Presentational sections are now Server Components. The connected-system graphic uses inline SVG, CSS, and the company's existing square logo image, marked decorative, with only a short reveal animation when reduced motion is not requested. Essential text has no entrance-animation dependency. The homepage separates header, main, and footer, provides a skip link, and has a consistent heading structure. All static section anchors resolve, including the three service targets. The owner's final steering preserves real manufacturer images in the brand section; this asset restoration needs its final rendered review before shipping.

Navigation now declares expanded state and its controlled panel, closes on Escape with focus restored to the trigger, and closes on outside clicks and transition to desktop. CSS aligns desktop navigation at 1024px with the JavaScript breakpoint; services become one column below 768px, industries use two columns below 1024px and one below 480px, and footer/content grids adapt at narrow widths. Browser checks verify menu opening, Escape dismissal/return focus, and closing after a section link is selected.

The contact form has explicit required/optional labels, input autocomplete and limits, project-type choices, a loading status, an error alert, and focused success feedback. It preserves the inquiry on failure and provides phone/email alternatives. The endpoint validates JSON object shape, string types, limits, required fields, email, unexpected characters, and service choice before checking provider configuration. It verifies acceptance of the team notification and does not treat a confirmation rejection as inquiry failure.

The team notification's provider acceptance is the success boundary. A best-effort confirmation now uses Next's `after()` callback, so the response can succeed without waiting for that email. Shared validation/delivery functions support persistent tests, including deferred confirmation behavior.

### Completed verification

The implementation lead reported the following completed checks against the production build served locally on port 3001:

- `npm run lint` and `npm run build` passed. The first sandboxed build could not fetch the Google font; the subsequent authorized build completed successfully.
- All **14 persistent inquiry tests** passed, including malformed/invalid input, provider failure, and deferred best-effort confirmation behavior.
- No horizontal overflow at viewport widths **320, 375, 390, 768, 1024, and 1440px**.
- Axe scans found **zero reported violations** for WCAG 2 A/AA, 2.1 AA, and 2.2 AA rule tags on the tested desktop and mobile pages.
- Mobile menu opening, Escape return focus, and section-link closing passed.
- Mocked contact rejection preserved entered details; mocked success moved focus to the success heading.
- Reduced-motion emulation changed smooth scrolling to `auto`.
- No browser errors were observed during these checks.
- Source anchor verification found no missing static targets; `git diff --check` passed during source review.

These checks do not send a real inquiry or establish mailbox deliverability. Automated accessibility results cover the tested pages and states and are not a declaration of WCAG conformance or accessibility certification. No recruited-customer usability research was conducted.

### Software refactor completed

The old animation helper and Framer Motion dependency were removed. The process section is now named `Process`, while its existing section anchor remains stable. `lib/site.js` centralizes public identity, navigation labels, and project-type options across page metadata, navigation, form, and server use. The contact route has explicit validation and delivery phases, covered by persistent tests with mocked dependencies so critical request/delivery states can be tested without contacting the real email provider. Robots and sitemap routes are implemented, with canonical URLs matching the observed live `www` host.

### Remaining delivery steps

- Finish the final rendered review after restoring real manufacturer images and the square company hero logo, then run checks appropriate to any resulting changes.
- Commit and push only the website upgrade files, preserving unrelated owner skill files.
- Record the pushed upgrade commit and independently confirm its Vercel deployment and live page content. Existing baseline hosting evidence does not mark this step complete.

### Final logo verification

The original manufacturer image assets are restored, with official UniFi SVG and RUCKUS PNG additions documented in `brand-assets.md`. All nine images load and retain their original colors/proportions on light panels inside the dark grid. The actual square HarmoniQ image replaces the temporary text mark in the hero. It reads `public/images/logo-square.png`; replacing that square PNG updates the hero mark.

The restored image grid initially revealed a 320px overflow caused by grid minimum content widths. Explicit zero-minimum grid tracks and shrinkable logo containers corrected it. The production build and rendered browser checks were repeated afterward: 320, 375, 390, 768, 1024, and 1440px viewports have no horizontal overflow; all logos load; desktop/mobile axe checks report zero violations for the tested WCAG A/AA tags; menu and mocked contact states pass; no page errors occur.

Deployment is the remaining operational step. The repository's existing Production deployment records and public Vercel headers confirm the integration.
