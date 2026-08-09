import { Reveal } from './Reveal'

/** Small caps label above a section title. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-berry ${className}`}
    >
      <span className="w-6 h-px bg-berry/50" aria-hidden="true" />
      {children}
    </span>
  )
}

/**
 * Standard section header. `light` flips colours for dark sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={light ? '!text-caramel-light' : ''}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance ${
            light ? 'text-cream' : 'text-cocoa'
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={`text-base md:text-lg leading-relaxed text-balance ${
              light ? 'text-cream/70' : 'text-cocoa-soft/80'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
