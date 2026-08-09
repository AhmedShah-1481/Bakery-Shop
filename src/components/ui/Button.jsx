import { motion } from 'framer-motion'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-berry text-cream hover:bg-berry-deep shadow-lg shadow-berry/25',
  dark: 'bg-cocoa text-cream hover:bg-cocoa-soft shadow-lg shadow-cocoa/25',
  outline:
    'border-2 border-cocoa/20 text-cocoa hover:border-cocoa hover:bg-cocoa hover:text-cream',
  cream: 'bg-cream text-cocoa hover:bg-blush shadow-lg shadow-cocoa/10',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1eb855] shadow-lg shadow-[#25D366]/30',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm md:text-base',
  lg: 'px-8 py-4 text-base md:text-lg',
}

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * External links get the correct rel for security.
 */
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const motionProps = {
    whileHover: { scale: 1.04, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}

/** Inline WhatsApp glyph so we don't pull in an icon library. */
export function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.943c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.943-11.945A11.86 11.86 0 0 0 20.52 3.45" />
    </svg>
  )
}
