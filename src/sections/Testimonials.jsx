import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function Stars({ rating }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < rating ? 'text-caramel' : 'text-cocoa/15'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.26 6.85.72-5.1 4.6 1.44 6.72L12 16.9l-6.09 3.4 1.44-6.72-5.1-4.6 6.85-.72z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const go = useCallback(
    (dir) =>
      setIndex((i) => (i + dir + testimonials.length) % testimonials.length),
    [],
  )

  // Auto-advance, paused on hover/focus and disabled under reduced motion.
  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [paused, reduced, go])

  const active = testimonials[index]

  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Arifwala says about us"
          subtitle="We've never asked anyone for a review. These arrived on their own."
        />

        <div
          className="mt-14 max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative min-h-[19rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 mx-auto text-berry/20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.7 5.3C6.5 6.9 4.5 9.8 4.5 13.2c0 3.3 2 5.5 4.7 5.5 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.5 3.8-4.5zm9.1 0c-3.2 1.6-5.2 4.5-5.2 7.9 0 3.3 2 5.5 4.7 5.5 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.5 3.8-4.5z" />
                </svg>

                <blockquote className="mt-5 font-display text-xl sm:text-2xl md:text-3xl leading-snug text-cocoa text-balance">
                  “{active.quote}”
                </blockquote>

                <figcaption className="mt-7 flex flex-col items-center gap-2.5">
                  <Stars rating={active.rating} />
                  <div>
                    <p className="font-semibold text-cocoa">{active.name}</p>
                    <p className="text-sm text-cocoa-soft/60">{active.location}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border-2 border-cocoa/15 hover:border-cocoa hover:bg-cocoa hover:text-cream text-cocoa grid place-items-center transition-colors duration-300"
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === index ? 'w-7 bg-berry' : 'w-2 bg-cocoa/20 hover:bg-cocoa/40'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border-2 border-cocoa/15 hover:border-cocoa hover:bg-cocoa hover:text-cream text-cocoa grid place-items-center transition-colors duration-300"
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
