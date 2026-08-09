import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildGeneralLink } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../ui/Button'

/**
 * Sticky WhatsApp button, plus a back-to-top control.
 * Both appear only after the visitor has scrolled past the hero.
 */
export function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-cocoa text-cream grid place-items-center shadow-lg shadow-cocoa/25"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Back to top"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.a
            href={buildGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl shadow-[#25D366]/40"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Order on WhatsApp"
            data-cursor="Chat"
          >
            {/* pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" aria-hidden="true" />
            <WhatsAppIcon className="w-7 h-7 relative" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
