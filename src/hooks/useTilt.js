import { useCallback, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * 3D tilt driven by pointer position — raw transforms, no dependency.
 *
 * Disabled on touch/coarse-pointer devices (where there's no hover to speak of)
 * and under reduced motion. Writes straight to style in a rAF to stay off
 * React's render path.
 *
 * Usage:  const tilt = useTilt(); <div {...tilt.handlers} ref={tilt.ref} />
 */
export function useTilt({ max = 9, scale = 1.02 } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)
  const reduced = usePrefersReducedMotion()

  const enabled =
    !reduced &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches

  const onPointerMove = useCallback(
    (e) => {
      if (!enabled) return
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      // -0.5 … 0.5 relative to the card centre
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})`
        // Exposed for a glare/highlight layer inside the card.
        el.style.setProperty('--tilt-x', `${((px + 0.5) * 100).toFixed(1)}%`)
        el.style.setProperty('--tilt-y', `${((py + 0.5) * 100).toFixed(1)}%`)
      })
    },
    [enabled, max, scale],
  )

  const onPointerLeave = useCallback(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    })
  }, [enabled])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return {
    ref,
    enabled,
    handlers: enabled ? { onPointerMove, onPointerLeave } : {},
  }
}
