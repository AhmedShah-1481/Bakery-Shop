import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { buildCustomCakeLink, formatPKR } from '../lib/whatsapp'
import { WhatsAppIcon } from '../components/ui/Button'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* ---------------------------------------------------------------------------
   Options. ⚠️ TODO: confirm all pricing with the owner.
   `sponge`/`colour` drive the live SVG preview.
   ------------------------------------------------------------------------- */

const FLAVOURS = [
  { id: 'choc', name: 'Belgian Chocolate', sponge: '#4A2C1A', price: 0 },
  { id: 'vanilla', name: 'Vanilla Butter', sponge: '#EFD9A8', price: -200 },
  { id: 'redvelvet', name: 'Red Velvet', sponge: '#9E2B2B', price: 300 },
  { id: 'coffee', name: 'Coffee Caramel', sponge: '#6B4423', price: 400 },
  { id: 'tresleches', name: 'Tres Leches', sponge: '#F0E0C0', price: 250 },
]

const SIZES = [
  { id: '1lb', name: '1 lb', serves: '4–6 people', price: 1400, scale: 0.82 },
  { id: '2lb', name: '2 lb', serves: '8–12 people', price: 2600, scale: 1 },
  { id: '3lb', name: '3 lb', serves: '14–18 people', price: 3800, scale: 1.11 },
  { id: '4lb', name: '4 lb', serves: '20–26 people', price: 4900, scale: 1.2 },
]

const FROSTINGS = [
  { id: 'buttercream', name: 'Vanilla Buttercream', colour: '#FBEBD2', price: 0 },
  { id: 'ganache', name: 'Chocolate Ganache', colour: '#3B2416', price: 250 },
  { id: 'creamcheese', name: 'Cream Cheese', colour: '#FDF6E9', price: 350 },
  { id: 'freshcream', name: 'Fresh Cream', colour: '#FFFFFF', price: 150 },
  { id: 'strawberry', name: 'Strawberry Cream', colour: '#F2A0A8', price: 200 },
]

const OCCASIONS = [
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'anniversary', name: 'Anniversary', emoji: '💕' },
  { id: 'wedding', name: 'Wedding', emoji: '💍' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓' },
  { id: 'thankyou', name: 'Thank You', emoji: '🙏' },
  { id: 'justbecause', name: 'Just Because', emoji: '✨' },
]

const ADDONS = [
  { id: 'candles', name: 'Candles', price: 150 },
  { id: 'flowers', name: 'Fresh flowers', price: 500 },
  { id: 'giftbox', name: 'Premium gift box', price: 300 },
  { id: 'photo', name: 'Edible photo print', price: 600 },
]

const STEPS = ['Flavour', 'Size', 'Frosting', 'Occasion', 'Details']

/* ---------------------------------------------------------------------------
   Live preview — an SVG cake that reacts to every choice.
   ------------------------------------------------------------------------- */

function CakePreview({ flavour, size, frosting, message, addons, reduced }) {
  const hasCandles = addons.includes('candles')
  const hasFlowers = addons.includes('flowers')

  const spring = reduced
    ? { duration: 0 }
    : { type: 'spring', stiffness: 160, damping: 20 }

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto grid place-items-center">
      {/* warm halo */}
      <div
        className="absolute inset-8 rounded-full bg-caramel/25 blur-3xl"
        aria-hidden="true"
      />

      <motion.svg
        viewBox="0 0 300 300"
        className="relative w-full h-full drop-shadow-2xl"
        role="img"
        aria-label={`Preview: a ${size.name} ${flavour.name} cake with ${frosting.name} frosting${
          message ? `, reading "${message}"` : ''
        }`}
        animate={{ scale: size.scale }}
        transition={spring}
      >
        {/* candles */}
        <AnimatePresence>
          {hasCandles && (
            <motion.g
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 12 }}
            >
              {[112, 150, 188].map((cx, i) => (
                <g key={cx}>
                  <rect
                    x={cx - 3}
                    y={62}
                    width="6"
                    height="30"
                    rx="2"
                    fill={i % 2 ? '#F2A0A8' : '#FBEBD2'}
                  />
                  <motion.ellipse
                    cx={cx}
                    cy={56}
                    rx="4.5"
                    ry="7.5"
                    fill="#F5A623"
                    animate={
                      reduced
                        ? {}
                        : { scaleY: [1, 1.22, 1], opacity: [0.85, 1, 0.85] }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: reduced ? 0 : Infinity,
                      delay: i * 0.18,
                    }}
                    style={{ transformOrigin: `${cx}px 62px` }}
                  />
                </g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* fresh flowers */}
        <AnimatePresence>
          {hasFlowers && (
            <motion.g
              initial={reduced ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.5 }}
              style={{ transformOrigin: '150px 100px' }}
            >
              {[
                { cx: 96, cy: 96, c: '#F2A0A8' },
                { cx: 204, cy: 98, c: '#E8C4D8' },
                { cx: 150, cy: 88, c: '#FBEBD2' },
              ].map((f, i) => (
                <g key={i}>
                  {[0, 72, 144, 216, 288].map((deg) => (
                    <ellipse
                      key={deg}
                      cx={f.cx}
                      cy={f.cy - 6}
                      rx="3.6"
                      ry="6.2"
                      fill={f.c}
                      transform={`rotate(${deg} ${f.cx} ${f.cy})`}
                    />
                  ))}
                  <circle cx={f.cx} cy={f.cy} r="3" fill="#C98B3A" />
                </g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ---- cake body ---- */}

        {/* plate — behind the cake, so the piped base border stays visible */}
        <ellipse cx="150" cy="243" rx="98" ry="9" fill="rgba(46,28,20,0.16)" />
        <ellipse cx="150" cy="232" rx="122" ry="10" fill="#D9C9B6" />
        <ellipse cx="150" cy="226" rx="122" ry="16" fill="#fff" opacity="0.95" />

        {/* top frosting surface */}
        <motion.ellipse
          cx="150"
          cy="104"
          rx="88"
          ry="17"
          animate={{ fill: frosting.colour }}
          transition={spring}
          stroke="rgba(0,0,0,0.06)"
        />

        {/* upper sponge */}
        <motion.rect
          x="62"
          y="104"
          width="176"
          height="46"
          animate={{ fill: flavour.sponge }}
          transition={spring}
        />

        {/* frosting drips over the top edge */}
        <motion.path
          d="M62 104h176v20c-8 0-8 13-16 13s-8-9-16-9-8 15-16 15-8-12-16-12-8 10-16 10-8-14-16-14-8 11-16 11-8-10-16-10-8 7-16 7-8-11-16-11Z"
          animate={{ fill: frosting.colour }}
          transition={spring}
          opacity="0.97"
        />

        {/* filling stripe */}
        <motion.rect
          x="62"
          y="150"
          width="176"
          height="11"
          animate={{ fill: frosting.colour }}
          transition={spring}
          opacity="0.9"
        />

        {/* lower sponge */}
        <motion.rect
          x="62"
          y="161"
          width="176"
          height="52"
          animate={{ fill: flavour.sponge }}
          transition={spring}
        />

        {/* subtle side shading for volume */}
        <rect x="62" y="104" width="176" height="109" fill="url(#cakeShade)" />

        {/* piped border along the base */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={69 + i * 16}
              cy={213}
              r="8"
              animate={{ fill: frosting.colour }}
              transition={spring}
            />
          ))}
        </g>

        {/* message on the cake front */}
        <AnimatePresence mode="wait">
          {message?.trim() && (
            <motion.text
              key={message}
              x="150"
              y="190"
              textAnchor="middle"
              className="font-display italic"
              fontSize={message.length > 16 ? 13 : 17}
              fill={
                ['#4A2C1A', '#9E2B2B', '#6B4423'].includes(flavour.sponge)
                  ? '#FBEBD2'
                  : '#4A2C1A'
              }
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              {message.trim()}
            </motion.text>
          )}
        </AnimatePresence>

        <defs>
          <linearGradient id="cakeShade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(0,0,0,0.16)" />
            <stop offset="22%" stopColor="rgba(0,0,0,0)" />
            <stop offset="72%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Option button
   ------------------------------------------------------------------------- */

function OptionCard({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative text-left rounded-2xl border-2 p-4 transition-all duration-300 ${
        selected
          ? 'border-berry bg-berry/5 shadow-lg shadow-berry/10'
          : 'border-cocoa/10 hover:border-cocoa/30 bg-cream'
      } ${className}`}
    >
      {children}
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-berry grid place-items-center"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="3.5" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      )}
    </button>
  )
}

/* ---------------------------------------------------------------------------
   Section
   ------------------------------------------------------------------------- */

export function CakeBuilder() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)

  const [flavour, setFlavour] = useState(FLAVOURS[0])
  const [size, setSize] = useState(SIZES[1])
  const [frosting, setFrosting] = useState(FROSTINGS[1])
  const [occasion, setOccasion] = useState(OCCASIONS[0])
  const [addons, setAddons] = useState([])
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState({ name: '', phone: '', date: '', notes: '' })

  const total = useMemo(() => {
    const addonTotal = addons.reduce(
      (sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0),
      0,
    )
    return size.price + flavour.price + frosting.price + addonTotal
  }, [size, flavour, frosting, addons])

  const toggleAddon = (id) =>
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    )

  const orderLink = buildCustomCakeLink({
    flavour: flavour.name,
    size: `${size.name} (${size.serves})`,
    frosting: frosting.name,
    occasion: occasion.name,
    message,
    addons: addons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean),
    total,
    ...details,
  })

  const today = new Date().toISOString().split('T')[0]

  const stepTransition = reduced
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

  return (
    <section
      id="builder"
      className="relative py-24 md:py-32 bg-cocoa text-cream grain overflow-hidden"
    >
      <div
        className="absolute top-1/4 -left-40 w-[36rem] h-[36rem] rounded-full bg-berry/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Build Your Own"
          title="Design your cake in 60 seconds"
          subtitle="Pick what you want and watch it come together. When you're happy, we'll get the whole order on WhatsApp — no forms, no back and forth."
        />

        <div className="mt-14 grid gap-10 lg:gap-14 lg:grid-cols-2 items-start">
          {/* ---------------- preview (sticky on desktop) ---------------- */}
          <div className="lg:sticky lg:top-24 order-1">
            <div className="rounded-[2rem] bg-gradient-to-b from-cream/95 to-cream-deep/90 border border-cream/20 p-6 md:p-8 shadow-2xl shadow-cocoa/40">
              <CakePreview
                flavour={flavour}
                size={size}
                frosting={frosting}
                message={message}
                addons={addons}
                reduced={reduced}
              />

              {/* live summary */}
              <div className="mt-6 pt-6 border-t border-cocoa/10">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {[
                    ['Flavour', flavour.name],
                    ['Size', `${size.name} · ${size.serves}`],
                    ['Frosting', frosting.name],
                    ['Occasion', occasion.name],
                  ].map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="text-cocoa-soft/55">{label}</dt>
                      <dd className="text-cocoa text-right font-medium">{value}</dd>
                    </div>
                  ))}
                  {addons.length > 0 && (
                    <div className="contents">
                      <dt className="text-cocoa-soft/55">Add-ons</dt>
                      <dd className="text-cocoa text-right font-medium">
                        {addons
                          .map((id) => ADDONS.find((a) => a.id === id)?.name)
                          .join(', ')}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-5 pt-5 border-t border-cocoa/10 flex items-end justify-between">
                  <span className="text-cocoa-soft/55 text-sm">Estimated total</span>
                  <motion.span
                    key={total}
                    initial={reduced ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl font-semibold text-berry tabular-nums"
                  >
                    {formatPKR(total)}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- controls ---------------- */}
          <div className="order-2">
            {/* step indicator */}
            <div className="flex items-center gap-1.5 mb-7" role="list">
              {STEPS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  role="listitem"
                  onClick={() => setStep(i)}
                  className="flex-1 group"
                  aria-label={`Go to step ${i + 1}: ${label}`}
                  aria-current={step === i ? 'step' : undefined}
                >
                  <span
                    className={`block h-1 rounded-full transition-colors duration-400 ${
                      i <= step ? 'bg-caramel' : 'bg-cream/15 group-hover:bg-cream/30'
                    }`}
                  />
                  <span
                    className={`mt-2 block text-[10px] uppercase tracking-wider transition-colors ${
                      i === step ? 'text-caramel' : 'text-cream/35'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="min-h-[26rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -24 }}
                  transition={stepTransition}
                >
                  {/* ---- 0: flavour ---- */}
                  {step === 0 && (
                    <fieldset>
                      <legend className="font-display text-2xl mb-4">
                        What flavour are we baking?
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {FLAVOURS.map((f) => (
                          <OptionCard
                            key={f.id}
                            selected={flavour.id === f.id}
                            onClick={() => setFlavour(f)}
                            className="!bg-cream/5 !border-cream/15 hover:!border-cream/40 data-[on=true]:!border-caramel"
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className="w-8 h-8 rounded-full border-2 border-cream/20 shrink-0"
                                style={{ backgroundColor: f.sponge }}
                                aria-hidden="true"
                              />
                              <span>
                                <span className="block font-semibold text-cream pr-6">
                                  {f.name}
                                </span>
                                <span className="block text-xs text-cream/45">
                                  {f.price === 0
                                    ? 'Included'
                                    : f.price > 0
                                      ? `+${formatPKR(f.price)}`
                                      : `−${formatPKR(Math.abs(f.price))}`}
                                </span>
                              </span>
                            </span>
                          </OptionCard>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* ---- 1: size ---- */}
                  {step === 1 && (
                    <fieldset>
                      <legend className="font-display text-2xl mb-4">
                        How many people are you feeding?
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {SIZES.map((s) => (
                          <OptionCard
                            key={s.id}
                            selected={size.id === s.id}
                            onClick={() => setSize(s)}
                            className="!bg-cream/5 !border-cream/15 hover:!border-cream/40"
                          >
                            <span className="block font-display text-2xl font-semibold text-cream">
                              {s.name}
                            </span>
                            <span className="block text-xs text-cream/45 mt-0.5">
                              {s.serves}
                            </span>
                            <span className="block text-sm text-caramel font-semibold mt-2">
                              {formatPKR(s.price)}
                            </span>
                          </OptionCard>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* ---- 2: frosting ---- */}
                  {step === 2 && (
                    <fieldset>
                      <legend className="font-display text-2xl mb-4">
                        Pick your frosting
                      </legend>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {FROSTINGS.map((f) => (
                          <OptionCard
                            key={f.id}
                            selected={frosting.id === f.id}
                            onClick={() => setFrosting(f)}
                            className="!bg-cream/5 !border-cream/15 hover:!border-cream/40"
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className="w-8 h-8 rounded-full border-2 border-cream/20 shrink-0"
                                style={{ backgroundColor: f.colour }}
                                aria-hidden="true"
                              />
                              <span>
                                <span className="block font-semibold text-cream pr-6">
                                  {f.name}
                                </span>
                                <span className="block text-xs text-cream/45">
                                  {f.price === 0 ? 'Included' : `+${formatPKR(f.price)}`}
                                </span>
                              </span>
                            </span>
                          </OptionCard>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* ---- 3: occasion + message + addons ---- */}
                  {step === 3 && (
                    <div className="space-y-7">
                      <fieldset>
                        <legend className="font-display text-2xl mb-4">
                          What's the occasion?
                        </legend>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {OCCASIONS.map((o) => (
                            <OptionCard
                              key={o.id}
                              selected={occasion.id === o.id}
                              onClick={() => setOccasion(o)}
                              className="!bg-cream/5 !border-cream/15 hover:!border-cream/40 text-center"
                            >
                              <span className="block text-2xl" aria-hidden="true">
                                {o.emoji}
                              </span>
                              <span className="block text-sm font-medium text-cream mt-1.5">
                                {o.name}
                              </span>
                            </OptionCard>
                          ))}
                        </div>
                      </fieldset>

                      <div>
                        <label
                          htmlFor="cake-message"
                          className="font-display text-2xl block mb-3"
                        >
                          Message on the cake
                        </label>
                        <input
                          id="cake-message"
                          type="text"
                          maxLength={25}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Happy Birthday Ayesha!"
                          className="w-full rounded-2xl bg-cream/5 border-2 border-cream/15 focus:border-caramel px-5 py-3.5 text-cream placeholder:text-cream/25 outline-none transition-colors"
                        />
                        <p className="mt-2 text-xs text-cream/40 text-right">
                          {message.length}/25 — appears live on the cake
                        </p>
                      </div>

                      <fieldset>
                        <legend className="font-display text-2xl mb-4">
                          Anything else?
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {ADDONS.map((a) => (
                            <OptionCard
                              key={a.id}
                              selected={addons.includes(a.id)}
                              onClick={() => toggleAddon(a.id)}
                              className="!bg-cream/5 !border-cream/15 hover:!border-cream/40"
                            >
                              <span className="block font-semibold text-cream text-sm pr-6">
                                {a.name}
                              </span>
                              <span className="block text-xs text-caramel mt-0.5">
                                +{formatPKR(a.price)}
                              </span>
                            </OptionCard>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {/* ---- 4: details ---- */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl mb-4">
                        Last bit — how do we reach you?
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cust-name" className="block text-sm text-cream/60 mb-1.5">
                            Your name
                          </label>
                          <input
                            id="cust-name"
                            type="text"
                            value={details.name}
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                            placeholder="Ayesha Khan"
                            className="w-full rounded-xl bg-cream/5 border-2 border-cream/15 focus:border-caramel px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="cust-phone" className="block text-sm text-cream/60 mb-1.5">
                            Phone number
                          </label>
                          <input
                            id="cust-phone"
                            type="tel"
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                            placeholder="0300 1234567"
                            className="w-full rounded-xl bg-cream/5 border-2 border-cream/15 focus:border-caramel px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cust-date" className="block text-sm text-cream/60 mb-1.5">
                          When do you need it?
                        </label>
                        <input
                          id="cust-date"
                          type="date"
                          min={today}
                          value={details.date}
                          onChange={(e) => setDetails({ ...details, date: e.target.value })}
                          className="w-full rounded-xl bg-cream/5 border-2 border-cream/15 focus:border-caramel px-4 py-3 text-cream outline-none transition-colors [color-scheme:dark]"
                        />
                      </div>

                      <div>
                        <label htmlFor="cust-notes" className="block text-sm text-cream/60 mb-1.5">
                          Anything we should know?
                        </label>
                        <textarea
                          id="cust-notes"
                          rows={3}
                          value={details.notes}
                          onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                          placeholder="Eggless please, and no nuts — one guest is allergic."
                          className="w-full rounded-xl bg-cream/5 border-2 border-cream/15 focus:border-caramel px-4 py-3 text-cream placeholder:text-cream/25 outline-none transition-colors resize-none"
                        />
                      </div>

                      <a
                        href={orderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] hover:bg-[#1eb855] text-white font-bold py-4 text-lg transition-colors duration-300 shadow-xl shadow-[#25D366]/25"
                        data-cursor="Send"
                      >
                        <WhatsAppIcon />
                        Send this order on WhatsApp
                      </a>

                      <p className="text-center text-xs text-cream/40">
                        Opens WhatsApp with your full order written out. Nothing is
                        charged — we'll confirm the final price with you first.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* step nav */}
            <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-cream/10">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-cream/70 hover:text-cream disabled:opacity-25 disabled:pointer-events-none transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>

              {step < STEPS.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-caramel text-cocoa font-bold text-sm shadow-lg shadow-caramel/20"
                >
                  Next: {STEPS[step + 1]}
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              ) : (
                <span className="text-sm text-cream/40">You're all set 🎉</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
