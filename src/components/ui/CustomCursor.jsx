import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Custom cursor: a small dot with a trailing ring that grows and labels
 * itself over interactive elements.
 *
 * Only mounts on fine-pointer devices with motion enabled — on touch it
 * renders nothing and the native cursor is untouched.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine && !reduced)
  }, [reduced])

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor')
      return
    }
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target.closest('a, button, [data-cursor]')
      setHovering(Boolean(target))
      setLabel(target?.dataset?.cursor ?? '')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* precise dot — follows instantly */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-berry"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      {/* trailing ring — springs behind, grows on hover */}
      <motion.div
        className="absolute rounded-full border-2 border-berry/60 flex items-center justify-center backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? (label ? 76 : 44) : 28,
          height: hovering ? (label ? 76 : 44) : 28,
          backgroundColor: hovering ? 'rgba(214,69,80,0.12)' : 'rgba(214,69,80,0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {label && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-berry text-center leading-tight px-1">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}
