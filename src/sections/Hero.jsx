import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { site } from '../data/site'
import { buildGeneralLink } from '../lib/whatsapp'
import { Button, WhatsAppIcon } from '../components/ui/Button'

const HEADLINE = ['Freshly', 'Baked', 'Happiness']

/** Words rise out of a mask, one after another. */
function MaskedHeadline({ reduced }) {
  return (
    <h1 className="font-display text-[3.25rem] leading-[0.95] sm:text-7xl lg:text-8xl xl:text-[7rem] font-semibold text-cream">
      {HEADLINE.map((word, i) => (
        <span key={word} className="block overflow-hidden pb-[0.08em]">
          {reduced ? (
            <span className="block">{word}</span>
          ) : (
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.35 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word === 'Happiness' ? (
                <span className="italic text-caramel-light">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          )}
        </span>
      ))}
    </h1>
  )
}

export function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // Background drifts slower than the page — classic depth parallax.
      gsap.to(bgRef.current, {
        yPercent: 22,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Copy lifts and fades as you scroll away.
      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '35% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-cocoa grain"
    >
      {/* backdrop */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/85 via-cocoa/70 to-cocoa/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa/80 via-transparent to-transparent" />
      </div>

      {/* floating garnish */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[
            { top: '18%', left: '8%', size: 12, delay: 0, color: 'bg-caramel/50' },
            { top: '30%', right: '14%', size: 8, delay: 1.2, color: 'bg-berry/50' },
            { top: '62%', left: '16%', size: 10, delay: 0.6, color: 'bg-blush/40' },
            { top: '74%', right: '22%', size: 14, delay: 1.8, color: 'bg-caramel/40' },
            { top: '45%', right: '8%', size: 7, delay: 2.4, color: 'bg-pistachio/50' },
          ].map((dot, i) => (
            <motion.span
              key={i}
              className={`absolute rounded-full ${dot.color} blur-[1px]`}
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                width: dot.size,
                height: dot.size,
              }}
              animate={{ y: [0, -26, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: dot.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* content */}
      <div ref={contentRef} className="container-x relative z-10 pt-28 pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-caramel" aria-hidden="true" />
            <span className="text-caramel text-xs sm:text-sm font-semibold uppercase tracking-[0.24em]">
              {site.city}, Punjab
            </span>
          </motion.div>

          <MaskedHeadline reduced={reduced} />

          <motion.p
            className="mt-7 text-cream/75 text-lg md:text-xl leading-relaxed max-w-xl"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            Custom cakes, cupcakes and desserts — baked fresh every morning and
            delivered across {site.city}. Tell us what you're celebrating and we'll
            take it from there.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col sm:flex-row gap-3.5 sm:items-center"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              href={buildGeneralLink()}
              external
              variant="whatsapp"
              size="lg"
              data-cursor="Order"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </Button>
            <Button href="#builder" variant="cream" size="lg" data-cursor="Build">
              Design your cake
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>

          <motion.p
            className="mt-7 text-cream/45 text-sm flex items-center gap-2"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pistachio animate-pulse" aria-hidden="true" />
            {site.deliveryNote}
          </motion.p>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/50 hover:text-cream transition-colors"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to our story"
      >
        <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent relative overflow-hidden">
          {!reduced && (
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-caramel"
              animate={{ y: [-12, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </span>
      </motion.a>
    </section>
  )
}
