import { forwardRef, useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { categories, products } from '../data/menu'
import { buildOrderLink, formatPKR } from '../lib/whatsapp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { WhatsAppIcon } from '../components/ui/Button'

/**
 * forwardRef is required: AnimatePresence `mode="popLayout"` measures each
 * exiting child, so it needs a ref onto the real DOM node.
 */
const MenuCard = forwardRef(function MenuCard({ product, reduced }, ref) {
  return (
    <motion.article
      ref={ref}
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-cream rounded-2xl overflow-hidden shadow-md shadow-cocoa/5 hover:shadow-xl hover:shadow-cocoa/15 transition-shadow duration-500"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
          loading="lazy"
          width="900"
          height="900"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-berry text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-cocoa leading-tight">
            {product.name}
          </h3>
          <p className="font-display font-semibold text-berry whitespace-nowrap">
            {formatPKR(product.price)}
          </p>
        </div>

        <p className="text-[11px] uppercase tracking-wider text-caramel font-semibold mt-1">
          {product.unit}
        </p>

        <p className="mt-2.5 text-sm text-cocoa-soft/75 leading-relaxed flex-1">
          {product.description}
        </p>

        <a
          href={buildOrderLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full border-2 border-cocoa/15 text-cocoa text-sm font-semibold py-2.5 transition-colors duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
          data-cursor="Order"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Order
        </a>
      </div>
    </motion.article>
  )
})

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const reduced = usePrefersReducedMotion()

  const visible = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-cream">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Full Menu"
          title="Everything we bake"
          subtitle="Prices are for our standard sizes — custom sizes, flavours and decoration are always available on request."
        />

        {/* filters */}
        <div
          className="mt-11 flex flex-wrap justify-center gap-2.5"
          role="tablist"
          aria-label="Filter menu by category"
        >
          <LayoutGroup id="menu-filters">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-cream'
                      : 'text-cocoa-soft hover:text-cocoa bg-cocoa/5 hover:bg-cocoa/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-pill"
                      className="absolute inset-0 bg-cocoa rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </LayoutGroup>
        </div>

        {/* grid */}
        <motion.div
          layout={!reduced}
          className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <MenuCard key={product.id} product={product} reduced={reduced} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-12 text-center text-cocoa-soft/60 text-sm">
          Looking for something that isn't on the list? We take custom requests —
          just message us.
        </p>
      </div>
    </section>
  )
}
