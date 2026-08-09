import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Counts from 0 to `end` the first time the element scrolls into view.
 * Under reduced motion it jumps straight to the final value.
 *
 * @returns [ref, displayValue]
 */
export function useCountUp(end, duration = 1800) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      setValue(end)
      return
    }

    const el = ref.current
    if (!el) return

    let frame = 0
    let startTime = null
    let done = false

    const step = (now) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true
          frame = requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end, duration, reduced])

  return [ref, value]
}
