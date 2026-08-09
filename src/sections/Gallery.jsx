import { useState } from 'react'
import { motion } from 'framer-motion'
import { galleryImages } from '../data/menu'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Lightbox } from '../components/ui/Lightbox'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* Varied spans give the grid a masonry rhythm without a masonry library. */
const SPANS = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
  'sm:row-span-2',
  '',
]

export function Gallery() {
  const [index, setIndex] = useState(null)
  const reduced = usePrefersReducedMotion()

  const close = () => setIndex(null)
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length))
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % galleryImages.length))

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-cream">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Straight from our kitchen"
          subtitle="Real bakes, real orders. Tap any photo to see it properly."
        />

        <div className="mt-14 grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[10rem] sm:auto-rows-[12rem]">
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-2xl bg-blush ${SPANS[i] ?? ''}`}
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : (i % 4) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-cursor="View"
              aria-label={`View larger: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/30 transition-colors duration-500" />
              <span className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="w-11 h-11 rounded-full bg-cream/90 grid place-items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cocoa" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        index={index}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
