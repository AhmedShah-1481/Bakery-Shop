import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] bg-gradient-to-r from-berry via-caramel to-pistachio"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
