import { site, navLinks } from '../../data/site'
import { buildGeneralLink } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../ui/Button'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-cocoa text-cream/70 pt-20 pb-8 grain overflow-hidden">
      {/* warm glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-caramel/10 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 64 64" className="w-11 h-11" aria-hidden="true">
                <rect width="64" height="64" rx="14" className="fill-cream/10" />
                <path
                  d="M20 34h24l-3.5 18a3 3 0 0 1-3 2.6H26.5a3 3 0 0 1-3-2.6L20 34Z"
                  className="fill-caramel"
                />
                <path
                  d="M20 34c0-6 4.2-9.5 9-10.2 1-4.3 4.6-6.8 8.4-5.9 3.4.8 5.7 4 5.4 7.4 3.2 1.2 5.2 4.4 4.8 8.7H20Z"
                  className="fill-blush"
                />
                <circle cx="32" cy="15" r="3.4" className="fill-berry" />
              </svg>
              <span className="font-display text-2xl font-semibold text-cream">
                Sweet Bites
              </span>
            </div>

            <p className="mt-5 max-w-sm leading-relaxed">
              A small bakery in {site.city} that believes everything tastes better when
              it was made this morning. Cakes, cupcakes and desserts, baked to order.
            </p>

            <a
              href={buildGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[#25D366] hover:text-[#4ae085] font-semibold transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {site.phone}
            </a>
          </div>

          {/* links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-lg text-cream mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="hover:text-caramel transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* hours */}
          <div className="md:col-span-4">
            <h3 className="font-display text-lg text-cream mb-4">Opening Hours</h3>
            <ul className="space-y-2.5">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 text-sm">
                  <span>{h.days}</span>
                  <span className="text-cream/50 whitespace-nowrap">{h.time}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 mt-6">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-berry grid place-items-center transition-colors duration-300"
                aria-label="Sweet Bites on Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32m0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0" />
                </svg>
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-berry grid place-items-center transition-colors duration-300"
                aria-label="Sweet Bites on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>
            © {year} Sweet Bites {site.city}. All rights reserved.
          </p>
          <p>{site.address}</p>
        </div>
      </div>
    </footer>
  )
}
