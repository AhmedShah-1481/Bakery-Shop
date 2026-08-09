import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useCountUp } from '../hooks/useCountUp'
import { site } from '../data/site'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/SectionHeading'

function Stat({ value, suffix, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-display text-3xl md:text-4xl font-semibold text-berry tabular-nums">
        {display.toLocaleString('en-PK')}
        <span className="text-caramel">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-cocoa-soft/70">{label}</p>
    </div>
  )
}

export function Story() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // Image unmasks upward as the section enters.
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 82%' },
        },
      )

      // Gentle counter-drift inside the frame.
      gsap.to(imageRef.current.querySelector('img'), {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* image side */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              data-animate
              className="relative rounded-[2rem] overflow-hidden aspect-4/5 shadow-2xl shadow-cocoa/15"
            >
              <img
                src="https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=900&q=80"
                alt="The Sweet Bites counter, stocked with the morning's fresh bakes"
                className="w-full h-[112%] object-cover"
                loading="lazy"
                width="900"
                height="1125"
              />
            </div>

            {/* floating badge */}
            <Reveal
              delay={0.3}
              className="absolute -bottom-6 -right-2 sm:right-6 bg-cocoa text-cream rounded-2xl px-6 py-5 shadow-xl shadow-cocoa/25 max-w-[13rem]"
            >
              <p className="font-display text-3xl text-caramel leading-none">5am</p>
              <p className="text-xs mt-1.5 text-cream/70 leading-snug">
                the ovens go on, every single morning
              </p>
            </Reveal>
          </div>

          {/* text side */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Our Story</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-cocoa text-balance">
                A small kitchen in {site.city} with one stubborn rule
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-cocoa-soft/85">
                Nothing leaves this kitchen that we wouldn't serve at our own table.
                That's the whole philosophy. It's why we bake in small batches, why we
                buy cream and fruit fresh instead of in bulk, and why we'd rather tell
                you honestly that a cake needs three days than rush it in one.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-4 text-lg leading-relaxed text-cocoa-soft/85">
                What started as birthday cakes for friends turned into a bakery the
                whole town orders from. We still remember most of our regulars by their
                usual order — and we still get a little nervous every time a wedding
                cake goes out the door.
              </p>
            </Reveal>

            <div className="mt-11 grid grid-cols-2 gap-x-6 gap-y-7 pt-8 border-t border-cocoa/10">
              {site.stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
