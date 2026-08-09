import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { buildInquiryLink, buildGeneralLink } from '../lib/whatsapp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/Button'

const OCCASION_OPTIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Corporate / bulk order',
  'Something else',
]

function ContactCard({ href, external, icon, label, value, accent }) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 p-5 rounded-2xl bg-cream border-2 border-cocoa/8 hover:border-cocoa/20 transition-colors duration-300"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span
        className={`shrink-0 w-12 h-12 rounded-full grid place-items-center text-white ${accent}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wider text-cocoa-soft/50 font-semibold">
          {label}
        </span>
        <span className="block font-semibold text-cocoa truncate group-hover:text-berry transition-colors">
          {value}
        </span>
      </span>
    </motion.a>
  )
}

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    occasion: OCCASION_OPTIONS[0],
    message: '',
  })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(buildInquiryLink(form), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-blush/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's bake something for you"
          subtitle="Tell us what you're planning. We'll come back with options, honest timings and a firm price."
        />

        <div className="mt-14 grid gap-10 lg:gap-14 lg:grid-cols-2 items-start">
          {/* left: details */}
          <div className="space-y-4">
            <ContactCard
              href={buildGeneralLink()}
              external
              accent="bg-[#25D366]"
              label="WhatsApp — fastest"
              value={site.phone}
              icon={<WhatsAppIcon className="w-6 h-6" />}
            />

            <ContactCard
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              accent="bg-berry"
              label="Call us"
              value={site.phone}
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <ContactCard
              href={site.socials.instagram}
              external
              accent="bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]"
              label="Instagram — see our latest"
              value="@sweetbitesarifwala"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16m0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32m0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4m5.3-7.03a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0" />
                </svg>
              }
            />

            {/* hours */}
            <Reveal className="p-6 rounded-2xl bg-cocoa text-cream/70">
              <h3 className="font-display text-lg text-cream mb-4">When we're open</h3>
              <ul className="space-y-2.5">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 text-sm">
                    <span>{h.days}</span>
                    <span className="text-cream/50 whitespace-nowrap">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-5 border-t border-cream/10 text-sm leading-relaxed">
                <span className="text-caramel font-semibold block mb-1">Find us</span>
                {site.address}
              </p>
            </Reveal>

            {/* map — no API key needed */}
            <div className="rounded-2xl overflow-hidden border-2 border-cocoa/8 h-56">
              {/* TODO: replace the query with the exact shop location once confirmed. */}
              <iframe
                title="Map showing Sweet Bites in Arifwala"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.03%2C30.25%2C73.11%2C30.31&layer=mapnik&marker=30.2864%2C73.0679"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* right: inquiry form */}
          <Reveal
            delay={0.1}
            className="bg-cream rounded-[2rem] p-7 md:p-9 shadow-xl shadow-cocoa/8"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-cocoa">
              Send us the details
            </h3>
            <p className="mt-2 text-cocoa-soft/70 text-sm leading-relaxed">
              Fill this in and it opens WhatsApp with your message ready to send —
              no email, no waiting on a form.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-cocoa-soft mb-1.5">
                    Your name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Ayesha Khan"
                    className="w-full rounded-xl border-2 border-cocoa/12 focus:border-berry px-4 py-3 outline-none transition-colors bg-white/60 placeholder:text-cocoa/25"
                  />
                </div>

                <div>
                  <label htmlFor="c-phone" className="block text-sm font-medium text-cocoa-soft mb-1.5">
                    Phone
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="0300 1234567"
                    className="w-full rounded-xl border-2 border-cocoa/12 focus:border-berry px-4 py-3 outline-none transition-colors bg-white/60 placeholder:text-cocoa/25"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-occasion" className="block text-sm font-medium text-cocoa-soft mb-1.5">
                  What's it for?
                </label>
                <select
                  id="c-occasion"
                  value={form.occasion}
                  onChange={set('occasion')}
                  className="w-full rounded-xl border-2 border-cocoa/12 focus:border-berry px-4 py-3 outline-none transition-colors bg-white/60"
                >
                  {OCCASION_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="c-message" className="block text-sm font-medium text-cocoa-soft mb-1.5">
                  Tell us more
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="I need a 3 lb chocolate cake for Saturday evening, delivered to Model Town."
                  className="w-full rounded-xl border-2 border-cocoa/12 focus:border-berry px-4 py-3 outline-none transition-colors resize-none bg-white/60 placeholder:text-cocoa/25"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1eb855] text-white font-bold py-4 transition-colors duration-300 shadow-lg shadow-[#25D366]/25"
                data-cursor="Send"
              >
                <WhatsAppIcon />
                Send on WhatsApp
              </motion.button>

              <p className="text-center text-xs text-cocoa-soft/50">
                We usually reply within the hour during opening times.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
