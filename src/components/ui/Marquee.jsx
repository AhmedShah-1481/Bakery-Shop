import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsapSetup'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Infinite marquee whose speed and direction react to scroll velocity —
 * scroll down and it runs one way, scroll up and it flips.
 *
 * The content is rendered twice and translated by exactly -50%, so the
 * seam is invisible and the loop is perfectly continuous.
 */
export function Marquee({
  items = [],
  baseSpeed = 0.06,
  className = '',
  separator = '✦',
}) {
  const trackRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return

    // xPercent runs 0 -> -50 because the list is duplicated once.
    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 22,
      ease: 'none',
    })

    let direction = 1
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const v = self.getVelocity()
        if (v !== 0) {
          const nextDirection = v > 0 ? 1 : -1
          if (nextDirection !== direction) {
            direction = nextDirection
            gsap.to(tween, { timeScale: direction, duration: 0.35 })
          }
          // Briefly speed up proportional to how fast they're scrolling.
          const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(v) * baseSpeed * 0.01)
          gsap.to(tween, { timeScale: direction * boost, duration: 0.25, overwrite: true })
          gsap.to(tween, { timeScale: direction, duration: 1.2, delay: 0.25, overwrite: false })
        }
      },
    })

    return () => {
      trigger.kill()
      tween.kill()
    }
  }, [reduced, baseSpeed])

  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 md:gap-10 shrink-0">
          <span>{item}</span>
          <span className="text-caramel/70 text-xl" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      role="presentation"
    >
      <div ref={trackRef} className="inline-flex items-center gap-6 md:gap-10 will-change-transform">
        {row}
        {/* Duplicate keeps the loop seamless; hidden from screen readers. */}
        <span className="flex items-center gap-6 md:gap-10 shrink-0" aria-hidden="true">
          {row}
        </span>
      </div>
    </div>
  )
}
