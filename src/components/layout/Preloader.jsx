import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { CupcakeMark } from '../ui/CupcakeMark'

/**
 * Intro sequence: the cupcake mark draws itself, a counter runs to 100,
 * then the panel splits and lifts away.
 *
 * Skipped entirely under reduced motion — `onDone` fires immediately.
 */
export function Preloader({ onDone }) {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(!reduced)

  useEffect(() => {
    if (reduced) {
      onDone?.()
      return
    }

    let frame
    const start = performance.now()
    const DURATION = 1900

    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          onDone?.()
        }, 260)
      }
    }

    frame = requestAnimationFrame(tick)

    // Lock scrolling while the intro plays.
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ''
    }
  }, [reduced, onDone])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  if (reduced) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cocoa"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* curtain halves */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-cocoa"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-cocoa"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
          >
            <CupcakeMark animated className="w-20 h-20 md:w-24 md:h-24" />

            <div className="flex flex-col items-center gap-3">
              <p className="font-display text-2xl md:text-3xl text-cream tracking-tight">
                Sweet Bites
              </p>

              <div className="w-40 h-px bg-cream/20 overflow-hidden">
                <motion.div
                  className="h-full bg-caramel origin-left"
                  style={{ scaleX: progress / 100 }}
                />
              </div>

              <p className="text-cream/50 text-xs font-mono tabular-nums tracking-widest">
                {String(progress).padStart(3, '0')}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
