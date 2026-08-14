# N R Industries — Corporate Website (Phase 1)

Production-quality corporate site for N R Industries, a transformer and power
equipment manufacturer based in Himachal Pradesh, India. This is **Phase 1**:
a clean, credible, enterprise B2B site. Phase 2 (advanced UI/UX) will replace
this deployment on the same domain — the data layer is structured to make
that swap painless.

## Stack

- React 19 + Vite 8, TypeScript (strict mode)
- Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first `@theme` config — no `tailwind.config.js`)
- React Router v7 (multi-page, not a single scroller)
- Zero-config deploy on Vercel

## Setup

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks (tsc -b) then builds to dist/
npm run preview   # serve the production build locally
```

## Folder structure

```
src/
  components/   Reusable UI: Header, Footer, ProductCard, FeatureRow,
                WhatsAppButton, ImagePlaceholder, SpecTable, etc.
  pages/        One component per route (Home, About, Products, Contact...)
  data/         Typed content — products.ts, company.ts, specifications.ts.
                All copy lives here, separate from presentation. Phase 2 can
                reuse this layer unchanged.
  config/       contact.ts — single source of truth for phone/WhatsApp/email.
  hooks/        useDocumentMeta (per-page <title>/meta), useInView (scroll reveal).
  types/        Shared content interfaces (Product, IndustryItem, SpecRow...).
  utils/        contactFormValidation.ts — pure validation logic, no UI.
```

Routes (`src/App.tsx`):

| Path              | Page                       |
| ------------------ | --------------------------- |
| `/`                  | Home                        |
| `/about`             | About                       |
| `/products`           | Products overview           |
| `/products/:slug`       | Product detail (9 slugs)    |
| `/specifications`        | Technical Specifications    |
| `/industries`              | Industries We Serve         |
| `/contact`                  | Contact                     |
| `*`                            | 404                          |

## Design system

Defined in `src/index.css` under `@theme`:

- **Palette** — navy (`--color-navy-*`) as primary, muted gold (`--color-gold-*`)
  as a sparing accent, neutral ink/surface grays for text and backgrounds.
- **Type** — Archivo (headings, geometric/technical) + Inter (body, high
  legibility for dense spec tables), loaded via Google Fonts in `index.html`.
- No `tailwind.config.js` — Tailwind v4 reads tokens straight from the
  `@theme` block, so `bg-navy-800`, `text-gold-600`, etc. are generated
  automatically from those CSS variables.

## Image placeholders

Every image slot uses `<ImagePlaceholder />` — a styled div reserving the
correct aspect ratio (square / video / banner / portrait) so dropping in real
photography later causes no layout shift. No external image services are
used anywhere (no Unsplash, placeholder.com, picsum) — zero network
dependency on third-party image hosts.

## WhatsApp / Phone integration

`src/config/contact.ts` holds `WHATSAPP_NUMBER`, `COMPANY_PHONE_TEL`, and
`COMPANY_PHONE_DISPLAY` as named constants — nowhere else in the codebase are
these hardcoded. Every product detail page's WhatsApp button pre-fills a
product-specific inquiry via the `wa.me` deep link; the Contact page uses a
general inquiry message.

## Contact form

Client-side validated (`src/utils/contactFormValidation.ts`), no backend
wired yet. On submit it `console.log`s the payload — search the codebase for
`// TODO: wire to backend/email service` to find the integration point.

---

## BEFORE LAUNCH checklist

- [ ] Replace `COMPANY_PHONE_DISPLAY` / `COMPANY_PHONE_TEL` in `src/config/contact.ts`
- [ ] Replace `WHATSAPP_NUMBER` in `src/config/contact.ts`
- [ ] Replace every `<ImagePlaceholder />` usage with real photography/artwork
      (hero background, product photos, logo, certification badges, client logos)
- [ ] Replace the Google Maps placeholder on `/contact` (`ContactPage.tsx`)
      with a real `<iframe>` embed for Vill. Rampur Banjaran, PO Dhaulakuan,
      Sirmaur, HP
- [ ] Wire `ContactForm.tsx` submit handler to a real backend / email service
- [ ] Swap the favicon placeholder (`public/favicon.svg`) for the real logo mark
- [ ] Confirm `COMPANY_EMAIL` in `src/config/contact.ts` is the correct
      production inbox (currently `nr.industries2012@gmail.com` per brief)

## Deployment (Vercel)

No configuration needed — standard Vite output. Framework preset:
**Vite**. Build command: `npm run build`. Output directory: `dist`.
