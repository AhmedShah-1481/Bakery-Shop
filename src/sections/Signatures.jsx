import { useTilt } from '../hooks/useTilt'
import { signatures } from '../data/menu'
import { buildOrderLink, formatPKR } from '../lib/whatsapp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/Button'

function SignatureCard({ product, index }) {
  const tilt = useTilt({ max: 8, scale: 1.03 })

  return (
    <RevealItem>
      <article
        ref={tilt.ref}
        {...tilt.handlers}
        className="group relative h-full flex flex-col rounded-[1.75rem] overflow-hidden bg-cream shadow-xl shadow-cocoa/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-cocoa/20 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* pointer-following glare */}
        {tilt.enabled && (
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at var(--tilt-x,50%) var(--tilt-y,50%), rgba(255,255,255,0.35), transparent 55%)',
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative overflow-hidden aspect-4/3">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            loading={index === 0 ? 'eager' : 'lazy'}
            width="900"
            height="675"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/55 via-transparent to-transparent" />

          {product.badge && (
            <span className="absolute top-4 left-4 bg-berry text-cream text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              {product.badge}
            </span>
          )}

          <span className="absolute bottom-4 right-4 bg-cream/95 backdrop-blur text-cocoa font-display font-semibold px-4 py-2 rounded-full shadow-lg">
            {formatPKR(product.price)}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-6 md:p-7">
          <h3 className="font-display text-2xl font-semibold text-cocoa">
            {product.name}
          </h3>
          <p className="text-xs uppercase tracking-wider text-caramel font-semibold mt-1">
            {product.unit}
          </p>
          <p className="mt-3 text-cocoa-soft/80 leading-relaxed flex-1">
            {product.description}
          </p>

          <a
            href={buildOrderLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-full bg-cocoa text-cream font-semibold py-3.5 transition-colors duration-300 hover:bg-[#25D366]"
            data-cursor="Order"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Order this
          </a>
        </div>
      </article>
    </RevealItem>
  )
}

export function Signatures() {
  return (
    <section id="signatures" className="relative py-24 md:py-32 bg-blush/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Signature Bakes"
          title="The three we're known for"
          subtitle="If it's your first time ordering from us, start here. These are the ones that come back week after week."
        />

        <RevealGroup className="mt-14 md:mt-18 grid gap-7 md:grid-cols-3">
          {signatures.map((product, i) => (
            <SignatureCard key={product.id} product={product} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
