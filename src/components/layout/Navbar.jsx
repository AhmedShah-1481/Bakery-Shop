import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site, navLinks } from '../../data/site'
import { buildGeneralLink } from '../../lib/whatsapp'
import { Button, WhatsAppIcon } from '../ui/Button'

/**
 * Transparent over the hero, frosted once scrolled. Tracks the active
 * section for the underline indicator, and opens a full-screen overlay
 * on mobile with focus handling and Escape-to-close.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight whichever section is nearest the top of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The overlay is lg:hidden, so a resize past the breakpoint would leave it
  // invisible but still "open" — locking scroll and skewing the bar colours.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  // The bar sits on a dark backdrop over the hero, and over the mobile
  // overlay (which the header renders above), so it needs light contrast.
  const barLight = !scrolled || open

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_rgba(46,28,20,0.08)] py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <nav
          className="container-x flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Sweet Bites — back to top"
          >
            <svg viewBox="0 0 64 64" className="w-9 h-9 md:w-10 md:h-10" aria-hidden="true">
              <rect
                width="64"
                height="64"
                rx="14"
                className={`fill-cocoa transition-all duration-500 ${
                  barLight ? 'stroke-cream/25' : 'stroke-transparent'
                }`}
                strokeWidth="2"
              />
              <path
                d="M20 34h24l-3.5 18a3 3 0 0 1-3 2.6H26.5a3 3 0 0 1-3-2.6L20 34Z"
                className="fill-caramel"
              />
              <path
                d="M20 34c0-6 4.2-9.5 9-10.2 1-4.3 4.6-6.8 8.4-5.9 3.4.8 5.7 4 5.4 7.4 3.2 1.2 5.2 4.4 4.8 8.7H20Z"
                className="fill-blush"
              />
              <circle cx="32" cy="15" r="3.4" className="fill-berry" />
            </svg>
            <span
              className={`font-display text-lg md:text-xl font-semibold leading-none transition-colors duration-500 ${
                barLight ? 'text-cream' : 'text-cocoa'
              }`}
            >
              Sweet Bites
              <span
                className={`block text-[9px] md:text-[10px] font-sans font-medium tracking-[0.22em] uppercase mt-0.5 transition-colors duration-500 ${
                  barLight ? 'text-caramel-light' : 'text-berry'
                }`}
              >
                {site.city}
              </span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 block ${
                    barLight
                      ? 'text-cream/85 hover:text-caramel-light'
                      : 'text-cocoa-soft hover:text-berry'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full ${
                        barLight ? 'bg-caramel-light' : 'bg-berry'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              href={buildGeneralLink()}
              external
              variant="whatsapp"
              size="sm"
              className="hidden sm:inline-flex"
              data-cursor="Order"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Order Now
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full transition-colors ${
                barLight ? 'hover:bg-cream/10' : 'hover:bg-cocoa/5'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <motion.span
                className={`w-5 h-0.5 rounded-full block transition-colors duration-500 ${
                  barLight ? 'bg-cream' : 'bg-cocoa'
                }`}
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-5 h-0.5 rounded-full block transition-colors duration-500 ${
                  barLight ? 'bg-cream' : 'bg-cocoa'
                }`}
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="fixed inset-0 z-40 bg-cocoa lg:hidden flex flex-col justify-center px-8"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl sm:text-5xl font-semibold text-cream hover:text-caramel transition-colors duration-300 block py-2"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button href={buildGeneralLink()} external variant="whatsapp" size="lg">
                <WhatsAppIcon />
                Order on WhatsApp
              </Button>
              <p className="mt-6 text-cream/50 text-sm">{site.phone}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
