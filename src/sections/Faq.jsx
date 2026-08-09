import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../data/faqs'
import { site } from '../data/site'
import { buildGeneralLink } from '../lib/whatsapp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button, WhatsAppIcon } from '../components/ui/Button'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function FaqItem({ faq, isOpen, onToggle, id }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="border-b border-cocoa/10">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          id={`faq-button-${id}`}
          className="w-full flex items-center justify-between gap-5 py-5 text-left group"
        >
          <span
            className={`font-display text-lg md:text-xl font-medium transition-colors duration-300 ${
              isOpen ? 'text-berry' : 'text-cocoa group-hover:text-berry'
            }`}
          >
            {faq.q}
          </span>

          <span
            className={`shrink-0 w-8 h-8 rounded-full grid place-items-center transition-colors duration-300 ${
              isOpen ? 'bg-berry text-cream' : 'bg-cocoa/5 text-cocoa group-hover:bg-cocoa/10'
            }`}
            aria-hidden="true"
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </motion.svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-button-${id}`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-cocoa-soft/80 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative py-24 md:py-32 bg-cream">
      <div className="container-x">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title="Things people usually ask"
              subtitle="If your question isn't here, just message us — we reply quickly, usually within the hour."
              className="!max-w-none"
            />

            <Button
              href={buildGeneralLink(
                `Assalam o Alaikum ${site.name}! 👋 I have a question:`,
              )}
              external
              variant="dark"
              size="md"
              className="mt-8"
              data-cursor="Ask"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Ask us anything
            </Button>
          </div>

          <div className="lg:col-span-7">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                id={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
