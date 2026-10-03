# HarmoniQ Solutions website

A single-page website for our small AV, IT, and security installation team, built with Next.js 16 App Router, React 19, and Tailwind CSS 4.

## Develop and verify

Use a supported Node.js LTS release (22.13+ or 24+) and npm:

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

Open http://localhost:3000. `npm run start` serves the production build. The build downloads Inter through `next/font/google`, then serves the font locally.

## Structure

- `app/page.js` composes server-rendered sections. Navigation, the contact form, the service explorer, and local pointer effects use small client components.
- `components/` contains the presentation sections, including `Process.js` and the shared `Icon.js`.
- `components/ConnectionVisual.js` provides the interactive hero diagram, service selection, pause/resume, and reduced-motion handling. `components/SurfaceEffects.js` provides local pointer illumination.
- `components/SignalSculpture.js` draws the hero’s rotating 3D signal mesh and luminous orbital ribbons with Canvas 2D. It shares the service selection and pause control, stops offscreen or in hidden tabs, and renders static artwork for reduced motion.
- `lib/site.js` is the source for public contact details, navigation, project types, and site metadata.
- `app/api/contact/route.js` validates inquiries and sends them through Resend. A successful response means the team notification was accepted; a courtesy confirmation runs afterward with Next.js `after()`.
- `app/robots.js` and `app/sitemap.js` generate crawler metadata.
- `tests/contact.test.mjs` tests validation and delivery behavior with mocked mail providers. Tests never send email.
- `docs/website-upgrade.md` records the Intent audit, positioning, design decisions, and verification.
- `docs/design-polish.md` records the futuristic polish, interaction behavior, verification, and animation-hook review.
- `PRODUCT.md` records confirmed product facts, service area, claim boundaries, and open decisions. `.impeccable/config.json` stores the code-first design workflow and scoped detector exceptions; `.impeccable/live/config.json` identifies the app entry for optional live editing.

## Contact email configuration

Set `RESEND_API_KEY` in `.env.local` for local delivery and in the Vercel project’s environment for production. The sender `noreply@info.harmoniqsolutions.com` requires that sending domain to be verified in Resend. Keep credentials out of Git. The inquiry recipient comes from `SITE.email` in `lib/site.js`.

Without a configured key the form returns a helpful delivery failure; it never pretends the message was sent. Phone and email links remain available.

## Logo assets

Manufacturer images live in `public/images/`. The square HarmoniQ mark in the hero comes from `public/images/logo-square.png`; replace that file to change the mark. A 1000 × 1000 transparent PNG works well. Keep the filename and square aspect ratio. The navigation/footer use `logo-horizontal.png` separately.

## Deploy

Push to `main` on the existing GitHub remote. The connected Vercel project should build and deploy the commit. Verify the GitHub deployment status and https://www.harmoniqsolutions.com after pushing; a successful Git push alone does not prove deployment succeeded.
