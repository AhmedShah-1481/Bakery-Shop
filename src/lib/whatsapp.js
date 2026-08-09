import { site } from '../data/site'

/** Formats a number as PKR, e.g. 2600 -> "Rs 2,600". */
export const formatPKR = (amount) => `Rs ${Number(amount).toLocaleString('en-PK')}`

/**
 * Wraps text in a wa.me deep link.
 * wa.me works on desktop (WhatsApp Web) and mobile (app), so it demos anywhere.
 */
const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

/** "Order this product" — used by every product card. */
export function buildOrderLink(product) {
  const lines = [
    `Assalam o Alaikum ${site.name}! 👋`,
    ``,
    `I'd like to order:`,
    `• ${product.name} — ${formatPKR(product.price)} (${product.unit})`,
    ``,
    `Could you confirm availability and delivery time?`,
  ]
  return waLink(lines.join('\n'))
}

/** Generic "start a conversation" link for nav/hero/FAB buttons. */
export function buildGeneralLink(
  message = `Assalam o Alaikum ${site.name}! 👋 I'd like to know more about your cakes.`,
) {
  return waLink(message)
}

/** Full custom-cake order assembled from the Cake Builder state. */
export function buildCustomCakeLink(order) {
  const lines = [
    `Assalam o Alaikum ${site.name}! 👋`,
    ``,
    `I'd like to order a custom cake:`,
    ``,
    `🍰 Flavour: ${order.flavour}`,
    `⚖️ Size: ${order.size}`,
    `🎨 Frosting: ${order.frosting}`,
    `🎉 Occasion: ${order.occasion}`,
  ]

  if (order.message?.trim()) {
    lines.push(`✍️ Message on cake: "${order.message.trim()}"`)
  }
  if (order.addons?.length) {
    lines.push(`➕ Add-ons: ${order.addons.join(', ')}`)
  }

  lines.push(``, `💰 Estimated total: ${formatPKR(order.total)}`)

  if (order.name?.trim()) lines.push(``, `👤 Name: ${order.name.trim()}`)
  if (order.phone?.trim()) lines.push(`📞 Phone: ${order.phone.trim()}`)
  if (order.date?.trim()) lines.push(`📅 Needed by: ${order.date.trim()}`)
  if (order.notes?.trim()) lines.push(`📝 Notes: ${order.notes.trim()}`)

  lines.push(``, `Please confirm the final price and timing. Shukriya!`)

  return waLink(lines.join('\n'))
}

/** Contact-section inquiry form → WhatsApp. */
export function buildInquiryLink(form) {
  const lines = [
    `Assalam o Alaikum ${site.name}! 👋`,
    ``,
    `Name: ${form.name || '—'}`,
    `Phone: ${form.phone || '—'}`,
    `Occasion: ${form.occasion || '—'}`,
    ``,
    `${form.message || 'I have a question about your cakes.'}`,
  ]
  return waLink(lines.join('\n'))
}
