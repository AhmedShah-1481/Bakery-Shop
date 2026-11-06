# Sweet Bites Arifwala — Website

An interactive one-page website for **Sweet Bites**, a bakery in Arifwala, Punjab.
Orders are placed through WhatsApp — there is no backend, no database and no
hosting cost beyond static file hosting.

LIVE LINK: https://sweetbites-nu.vercel.app

> **This is a sample/pitch build.** All business details (phone number, prices,
> photos) are realistic **placeholders**. See [Before going live](#before-going-live).

---

## Running it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install     # once, installs dependencies into ./node_modules
npm run dev     # start the dev server -> http://localhost:5173
```

Other commands:

```bash
npm run build     # production build into ./dist
npm run preview   # serve ./dist locally to check the real build
```

To publish, run `npm run build` and upload the contents of `dist/` to any static
host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or normal cPanel hosting).

---

## Before going live

Everything the client needs to change lives in **two files**. You should not need
to touch any component.

### 1. `src/data/site.js` — business details

| Field | What it is | Must change? |
|---|---|---|
| `whatsapp` | WhatsApp number, **digits only, no `+`, no spaces**. `0300-1234567` → `923001234567` | **Yes — ordering does not work without it** |
| `phone` | Phone number as displayed on the page | Yes |
| `address` | Shop address (also used by the map) | Yes |
| `email` | Contact email — or delete it and remove it from the Contact section | Yes |
| `socials` | Instagram / Facebook URLs | Check |
| `hours` | Opening hours | Confirm |
| `stats` | The count-up numbers in "Our Story" | Confirm |
| `deliveryNote` | Free-delivery line under the hero buttons | Confirm |

Every one of these is marked with a `TODO:` comment in the file.

### 2. `src/data/menu.js` — products, prices and photos

- `products` — 18 items with name, description, PKR price and category.
  **All prices are placeholders and must be confirmed with the owner.**
- `galleryImages` — the gallery photos.
- Photos are currently **Unsplash stock images**. Replace each `image:` URL with
  the bakery's own photography. Either drop the files into `public/` and use
  `/my-photo.jpg`, or paste a hosted URL.
- Keep the `alt` text accurate when you swap a photo — it is read aloud by screen
  readers and shown if an image fails to load.

Cake Builder pricing (flavour / size / frosting / add-on costs) lives at the top
of `src/sections/CakeBuilder.jsx` and also needs confirming.

---

## How ordering works

There is no cart and no payment. Every order button builds a
[`wa.me`](https://wa.me) link containing a pre-written message, so tapping it
opens WhatsApp with the order already typed out — the customer just hits send.

- **Product cards** send the item name and price.
- **Cake Builder** sends the full spec: flavour, size, frosting, occasion,
  message on the cake, add-ons, estimated total, and the customer's name/phone.
- **Contact form** composes an enquiry instead of emailing.

The link builders are in `src/lib/whatsapp.js`.

---

## Project structure

```
src/
├── data/          ← client content lives here (site.js, menu.js, testimonials, faqs)
├── lib/           ← whatsapp.js (order links), gsapSetup.js
├── hooks/         ← smooth scroll, reduced-motion, count-up, card tilt
├── components/
│   ├── ui/        ← Reveal, Button, Marquee, ScrollProgress, Cursor, Lightbox
│   └── layout/    ← Navbar, Footer, Preloader, WhatsAppFab
└── sections/      ← Hero, Story, Signatures, Menu, CakeBuilder, Gallery,
                     Process, Testimonials, Faq, Contact
```

**Built with:** Vite + React 18, Tailwind CSS v4, GSAP (scroll animation),
Framer Motion (interaction), Lenis (smooth scrolling).

Tailwind v4 is configured **in CSS**, not in a JS config file — the colour
palette and fonts are declared in the `@theme` block at the top of
`src/index.css`. There is intentionally no `tailwind.config.js`.

---

## Accessibility & motion

- Respects `prefers-reduced-motion` — with it enabled, the preloader is skipped,
  smooth scrolling is off and all animation is suppressed. The site stays fully
  usable.
- Keyboard operable throughout, including the menu, cake builder, gallery
  lightbox and FAQ accordion.
- The 3D tilt and custom cursor are disabled on touch devices.

Verified with automated browser checks at 360 / 768 / 1440 px: no console errors,
no broken images, no horizontal overflow.
