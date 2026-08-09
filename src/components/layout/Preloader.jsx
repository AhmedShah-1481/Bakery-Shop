import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

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
            <svg viewBox="0 0 64 64" className="w-20 h-20 md:w-24 md:h-24">
              <motion.path
                d="M20 34h24l-3.5 18a3 3 0 0 1-3 2.6H26.5a3 3 0 0 1-3-2.6L20 34Z"
                fill="none"
                stroke="#C98B3A"
                strokeWidth="1.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
              <motion.path
                d="M20 34c0-6 4.2-9.5 9-10.2 1-4.3 4.6-6.8 8.4-5.9 3.4.8 5.7 4 5.4 7.4 3.2 1.2 5.2 4.4 4.8 8.7H20Z"
                fill="none"
                stroke="#F6E0DA"
                strokeWidth="1.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.25 }}
              />
              <motion.circle
                cx="32"
                cy="15"
                r="3.4"
                fill="#D64550"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.25, type: 'spring', stiffness: 300, damping: 12 }}
              />
            </svg>

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
