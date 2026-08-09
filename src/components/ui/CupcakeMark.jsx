import { motion } from 'framer-motion'

/**
 * The Sweet Bites cupcake glyph — cup + frosting dome + cherry.
 *
 * Single source of truth so the mark stays identical (and symmetric)
 * everywhere it's used: Navbar, Footer, Preloader.
 *
 * `animated` draws the outline stroke-by-stroke (used by the Preloader);
 * otherwise it renders as flat filled shapes (used by Navbar/Footer).
 */
export const CUP_PATH = 'M20 34h24l-3.5 18a3 3 0 0 1-3 2.6H26.5a3 3 0 0 1-3-2.6L20 34Z'
// Symmetric dome — control points mirrored about the x=32 centre line,
// so it can't render lopsided the way the old hand-typed swirl did.
export const FROSTING_PATH = 'M20 34C20 20 26 14 32 12C38 14 44 20 44 34Z'
export const CHERRY = { cx: 32, cy: 10.5, r: 3 }

export function CupcakeMark({ animated = false, className = '', bgClassName = '' }) {
  if (!animated) {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        {bgClassName && <rect width="64" height="64" rx="14" className={bgClassName} />}
        <path d={CUP_PATH} className="fill-caramel" />
        <path d={FROSTING_PATH} className="fill-blush" />
        <circle cx="32" cy="10.5" r="3" className="fill-berry" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <motion.path
        d={CUP_PATH}
        fill="none"
        stroke="#C98B3A"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      <motion.path
        d={FROSTING_PATH}
        fill="none"
        stroke="#F6E0DA"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.25 }}
      />
      <motion.circle
        cx="32"
        cy="10.5"
        r="3"
        fill="#D64550"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.25, type: 'spring', stiffness: 300, damping: 12 }}
      />
    </svg>
  )
}