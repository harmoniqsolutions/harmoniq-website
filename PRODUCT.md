# HarmoniQ Solutions

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Homeowners, people responsible for church technology, and small-business owners seeking AV, IT/network/Wi-Fi, or security installation help. Smaller jobs are welcome.

Visitors need to recognize whether their project fits, understand the team’s approach, and start a conversation without needing a technical specification. The existing website also includes community spaces; their priority as a separate audience remains unconfirmed.

## Product Purpose

HarmoniQ Solutions is a small, hands-on installation team. The website helps prospective customers understand its services and submit a project inquiry or contact the team directly.

Success means visitors can identify relevant help, recognize that their space and job size fit, and reach the team with accurate expectations.

## Positioning

One small team handles audio/video, IT and networks, and security systems, including projects combining disciplines. The offer welcomes practical upgrades and smaller jobs for homes, churches, and small businesses.

Approved claim limits are **10+ completed projects**, **5+ years of hands-on team experience**, and a typical **2–3-person crew**. Experience describes the team’s practical experience, not the age of the company. Do not inflate these figures or imply enterprise scale.

## Operating Context

HarmoniQ serves the **NY/NJ Metro Area**. Specific travel limits within or beyond that area are not established.

The current website is a single-page introduction with service information, team information, spaces served, an installation process, equipment brands, and contact options. It has no customer account, checkout, or booking workflow.

The documented working process is: discuss the need and budget; agree on scope and equipment and install; test the setup and walk the customer through using it. See `components/Process.js` and `docs/website-upgrade.md`.

Public contact details are maintained in `lib/site.js`:

- Website: https://www.harmoniqsolutions.com
- Email: sales@harmoniqsolutions.com
- Phone: +1 551-223-1520

## Capabilities and Constraints

The current service content in `components/Services.js` covers:

- **Audio & video:** TVs, displays, projectors, speakers, microphones, sound systems, home entertainment, meeting-room AV, cabling, setup, and troubleshooting.
- **IT & networks:** Wi-Fi, access points, routers, switches, Ethernet cabling, equipment racks, equipment setup, and troubleshooting.
- **Security systems:** cameras and recording, video doorbells and entry systems, installation and setup, remote viewing, and a customer walkthrough.

The inquiry form requires name, email, and project details. Phone and organization are optional. Project types are audio/video, IT/networks/Wi-Fi, security, or a mix of services / unsure. Keep terminology consistent with `lib/site.js`.

The form sends inquiries through Resend and requires server-side configuration and a verified sending domain. A success response means the provider accepted the team notification; it does not establish mailbox delivery. The customer confirmation is best effort. Preserve entered details on failure and keep phone and email recovery available. See `app/api/contact/route.js`, `components/Contact.js`, and `README.md`.

The existing stack is Next.js 16.2.2 App Router, React 19.2.4, and Tailwind CSS 4. Follow `AGENTS.md` and read the installed Next.js documentation before changing application code. Development starts with `npm run dev`; existing verification commands are `npm run lint`, `npm test`, and `npm run build`.

Open product decisions:

- Specific travel limits within or beyond the NY/NJ Metro Area.
- Any service exclusions or distinctive capabilities beyond the documented offering.
- Pricing, response-time commitments, ongoing support terms, and warranties are not established in the current product record; do not invent them.

## Brand Commitments

Use the name **HarmoniQ Solutions** and the existing company marks: `public/images/logo-horizontal.png` and `public/images/logo-square.png`.

Existing copy presents a small, approachable, hands-on team and explains technology through practical jobs. Maintain accurate scope and understandable language; a formal voice framework is not established.

Manufacturer images identify equipment the team works with. Preserve original marks, colors, and proportions as documented in `docs/brand-assets.md`. Brand inclusion does not establish sponsorship, certification, authorized-reseller status, or a formal partnership.

## Evidence on Hand

- The user confirmed the audiences, three service disciplines, welcome for smaller jobs, inquiry goal, NY/NJ Metro Area service area, and approved project/experience/crew figures during init.
- `docs/website-upgrade.md` records earlier owner-approved facts and claim boundaries. Its historical verification reports are not current guarantees.
- `lib/site.js` contains shared identity, contact details, and project-type labels.
- `public/images/` contains company marks and manufacturer assets. The current brand section uses UniFi, RUCKUS Wireless, NETGEAR AV, Shure, Biamp, Q-SYS, Crestron, Extron, and Dante; see `components/Brands.js`.
- No customer project photos, testimonials, case studies, or certification evidence were found in the inspected project content. Do not fabricate them, customer satisfaction figures, or operational metrics.

## Product Principles

1. Make all three service disciplines easy to understand and recognize.
2. Welcome smaller jobs and reflect the actual small-team working model.
3. Let visitors begin with their problem rather than requiring technical expertise.
4. Use factual evidence and bounded commitments to establish trust.
5. Make inquiry outcomes honest and keep direct contact available when the form fails.

## Accessibility & Inclusion

Preserve the existing skip link, keyboard navigation and mobile-menu dismissal, visible focus, explicit form labels, announced form feedback, and reduced-motion support. Keep essential content available without animation and maintain usable layouts on mobile web.

No product-specific accessibility standard or additional audience need was established during init. Historical automated checks in `docs/website-upgrade.md` do not establish ongoing conformance.
