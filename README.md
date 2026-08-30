# N R Industries — Corporate Website

The official corporate website for **N R Industries**, a manufacturer of power and distribution transformers, compact substations, servo voltage stabilizers, and HT & LT panels, based in Himachal Pradesh, India. N R Industries designs, builds, and tests power equipment for industrial, commercial, and utility-scale distribution networks — every unit engineered to its load and validated in-house before it ships.

This repository is the source for the live production site.

**Live site:** [nrpower.in](https://nrpower.in)

---

## Table of Contents

- [Overview](#overview)
- [Features & Design](#features--design)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Overview

The site is a full multi-page marketing and lead-generation platform for N R Industries — built to present the company's manufacturing capability, product range, technical specifications, and certifications with the polish expected of an enterprise industrial brand, while making it effortless for a prospective buyer to get a quote or book an appointment.

It covers the company's full product catalogue, technical specifications and production capacity, the industries it serves, its certifications, and multiple direct paths to contact the team (contact form, WhatsApp, phone, and an in-page appointment booking flow).

## Features & Design

- **Scroll-driven cinematic hero** — the homepage hero is a custom scroll-scrubbed effect: a small framed photo smoothly expands to fill the screen as the visitor scrolls, with the frame's corners easing from rounded to sharp and the content crossfading from a compact title into the full headline, description, key stats, and calls to action. Fully reversible on scroll-up, and gracefully degrades to a static, fully-accessible layout under reduced-motion preferences.
- **Full-bleed video storytelling** — background video sections showcasing the manufacturing floor, deferred until they're about to enter the viewport and automatically paused when scrolled out of view or when the browser tab isn't active, so they never cost bandwidth or battery a visitor doesn't need.
- **Interactive product showcase** — an animated, auto-advancing product carousel with cut-out product photography sliding into view alongside contextual detail copy.
- **Trust & credibility sections** — an interactive, hover/tap-to-expand client logo wall (with an adaptive layout for desktop vs. mobile), a certifications strip, and a production-capacity chart driven by real manufacturing data.
- **Industries carousel** — a browsable panel of every industry sector the company serves, with real photography and cross-fade transitions.
- **Sitewide appointment booking** — a persistent, fixed booking button (present on every page) opens an appointment request modal backed by the same validation and submission pipeline as the main contact form.
- **Contact & lead capture** — a validated contact form backed by Supabase, plus one-tap WhatsApp and phone deep links throughout the site (product pages included, with per-product pre-filled inquiry messages).
- **Consistent page pattern** — every interior page (About, Products, Specifications, Industries, Contact) shares a common header treatment, section rhythm, and typography system, so the site reads as one coherent product regardless of which page a visitor lands on.
- **Responsive, accessible by default** — every interactive section has a deliberate mobile layout (not just a squeezed desktop layout), respects `prefers-reduced-motion`, and keeps animation-heavy components out of the initial bundle until they're actually needed.
- **Performance-conscious throughout** — route-based code-splitting, lazy-mounted media and heavy UI chunks, and images/video deferred until they're within reach of the viewport, so first paint stays fast even on a content-heavy homepage.

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI framework | [React 19](https://react.dev) |
| Build tool | [Vite 8](https://vite.dev) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` configuration) |
| Routing | [React Router v7](https://reactrouter.com) |
| Animation | [GSAP](https://gsap.com) |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Lucide](https://lucide.dev) |
| Backend / forms | [Supabase](https://supabase.com) |
| Linting | [oxlint](https://oxc.rs) |
| Hosting | [Vercel](https://vercel.com) |

## Project Structure

```
src/
  components/       Shared UI used across the site: header, footer, product
                     cards, contact form, spec tables, and more.
  pages/             One component per route (About, Products, Specifications,
                     Industries, Contact, product detail, 404).
  experimental-ui/  The homepage's design system and components (hero, video
                     sections, product showcase, trust wall, etc.).
  data/              Typed content — products, company info, specifications —
                     kept separate from presentation.
  config/            Single source of truth for contact details (phone,
                     WhatsApp, email, address, map links).
  hooks/             Shared hooks (document meta tags, scroll-reveal, etc.).
  lib/               Third-party client setup (Supabase).
  types/             Shared content type definitions.
  utils/             Pure logic, e.g. contact form validation.
public/              Static assets — photography, video, favicon.
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/products` | Products overview |
| `/products/:slug` | Product detail |
| `/specifications` | Technical Specifications |
| `/industries` | Industries We Serve |
| `/contact` | Contact |
| `*` | 404 |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- npm

### Installation

```bash
git clone https://github.com/Himkush1414/nr-industries-site.git
cd nr-industries-site
npm install
```

### Environment Variables

The contact form and appointment booking modal are backed by Supabase. Create a `.env.local` file in the project root with:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

`.env.local` is git-ignored and never committed — ask a project maintainer for the values, or point them at your own Supabase project.

### Available Scripts

```bash
npm run dev       # start the local dev server at http://localhost:5173
npm run build     # type-check (tsc -b) and build for production into dist/
npm run preview   # serve the production build locally
npm run lint      # run oxlint across the codebase
```

## Deployment

The site deploys to [Vercel](https://vercel.com) with zero additional configuration — framework preset **Vite**, build command `npm run build`, output directory `dist`. `vercel.json` handles SPA rewrites so client-side routes resolve correctly on refresh/direct navigation.

## Contact

- **Website:** [nrpower.in](https://nrpower.in)
- **Email:** info@nrenergy.in
- **Address:** Vill. Rampur Banjaran, PO Dhaulakuan, Tehsil Paonta Sahib, Distt. Sirmaur, Himachal Pradesh 173031, India
