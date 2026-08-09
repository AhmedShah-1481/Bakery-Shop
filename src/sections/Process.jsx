import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Tell us what you want',
    body: 'Message us on WhatsApp, or build your cake right here on the site. A reference photo helps more than anything.',
  },
  {
    n: '02',
    title: 'We confirm the details',
    body: 'Flavour, size, decoration, price and exact pickup or delivery time — all agreed before we start baking.',
  },
  {
    n: '03',
    title: 'It gets baked fresh',
    body: 'Your cake is made the day it reaches you. Never from the freezer, never made ahead to sit in a fridge.',
  },
  {
    n: '04',
    title: 'Delivered to your door',
    body: 'Boxed properly and driven carefully anywhere in Arifwala. Free over Rs 3,000.',
  },
]

export function Process() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const path = pathRef.current
    if (!path) return

    const ctx = gsap.context(() => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: 0.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-blush/40 overflow-hidden"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="How It Works"
          title="From your message to your table"
          subtitle="No apps, no accounts, no complicated checkout. Four steps, and most of them are ours to worry about."
        />

        <div className="relative mt-16">
          {/* connecting line — drawn on scroll, decorative only.
              Sits on the circle row so it never crosses the copy; the
              numbered circles are z-10 and stay in front of it. */}
          <svg
            className="hidden lg:block absolute top-0 left-0 w-full h-14 pointer-events-none"
            viewBox="0 0 1200 100"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M28 50 C 130 0, 235 100, 337 50 C 440 0, 544 100, 646 50 C 750 0, 853 100, 955 50"
              stroke="var(--color-cocoa)"
              strokeOpacity="0.14"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <path
              ref={pathRef}
              d="M28 50 C 130 0, 235 100, 337 50 C 440 0, 544 100, 646 50 C 750 0, 853 100, 955 50"
              stroke="var(--color-berry)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <RevealGroup className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 relative">
            {STEPS.map((step) => (
              <RevealItem key={step.n}>
                <div className="text-center lg:text-left">
                  <span className="relative z-10 inline-grid place-items-center w-14 h-14 rounded-full bg-cream border-2 border-berry/25 font-display text-lg font-semibold text-berry shadow-lg shadow-cocoa/5">
                    {step.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cocoa">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-cocoa-soft/75 leading-relaxed text-sm">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
