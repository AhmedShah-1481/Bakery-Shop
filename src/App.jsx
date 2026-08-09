import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

import { Preloader } from './components/layout/Preloader'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { CustomCursor } from './components/ui/CustomCursor'
import { Marquee } from './components/ui/Marquee'

import { Hero } from './sections/Hero'
import { Story } from './sections/Story'
import { Signatures } from './sections/Signatures'
import { MenuSection } from './sections/MenuSection'
import { CakeBuilder } from './sections/CakeBuilder'
import { Gallery } from './sections/Gallery'
import { Process } from './sections/Process'
import { Testimonials } from './sections/Testimonials'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'

const MARQUEE_ITEMS = [
  'Freshly Baked Daily',
  'Custom Cakes',
  'Arifwala',
  'Same-Day Delivery',
  'Made to Order',
  'No Preservatives',
]

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(reduced)

  useLenis()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ScrollProgress />

      {/* Skip link — first tab stop for keyboard and screen-reader users. */}
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-cocoa focus:text-cream focus:px-5 focus:py-3 focus:rounded-full focus:font-semibold"
      >
        Skip to menu
      </a>

      <Navbar />

      <main
        className="transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Hero />

        <div className="bg-cocoa text-cream/85 py-4 md:py-5 font-display text-lg md:text-2xl border-y border-cream/10">
          <Marquee items={MARQUEE_ITEMS} />
        </div>

        <Story />
        <Signatures />
        <MenuSection />
        <CakeBuilder />
        <Gallery />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  )
}
