/* ============================================================================
   SITE CONFIG — every real-world business detail lives here.
   ----------------------------------------------------------------------------
   ⚠️  TODO (before showing the client / going live):
   Replace the placeholder values below with Sweet Bites' real details.
   Their Instagram is login-walled so these could not be read automatically.

   The ONLY value that must be correct for ordering to work is `whatsapp`.
   ========================================================================== */

export const site = {
  name: 'Sweet Bites',
  city: 'Arifwala',
  tagline: 'Freshly Baked Happiness',

  // TODO: replace with the real WhatsApp number.
  // Format: country code + number, digits only, no "+", no spaces.
  // Pakistan example: 0300-1234567  ->  923001234567
  whatsapp: '923001234567',

  // TODO: replace with the real public phone number (display format).
  phone: '+92 300 1234567',

  // TODO: confirm the real shop address.
  address: 'Ghalla Mandi Road, Arifwala, Punjab, Pakistan',

  // TODO: confirm the real email, or delete and remove from the Contact section.
  email: 'hello@sweetbitesarifwala.pk',

  socials: {
    instagram: 'https://www.instagram.com/sweetbitesarifwala/',
    // TODO: add the real Facebook page if they have one.
    facebook: 'https://www.facebook.com/',
  },

  // TODO: confirm real opening hours.
  hours: [
    { days: 'Monday – Thursday', time: '10:00 AM – 10:00 PM' },
    { days: 'Friday', time: '2:00 PM – 10:30 PM' },
    { days: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' },
  ],

  // Shown as count-up stats in the Story section.
  // TODO: confirm these numbers with the owner before publishing.
  stats: [
    { value: 6, suffix: '+', label: 'Years baking' },
    { value: 12000, suffix: '+', label: 'Cakes delivered' },
    { value: 4900, suffix: '+', label: 'Happy customers' },
    { value: 100, suffix: '%', label: 'Fresh, daily' },
  ],

  deliveryNote: 'Free delivery across Arifwala on orders over Rs 3,000',
}

/** Nav links — `id` must match each <section id="..."> in App.jsx. */
export const navLinks = [
  { id: 'story', label: 'Our Story' },
  { id: 'signatures', label: 'Signatures' },
  { id: 'menu', label: 'Menu' },
  { id: 'builder', label: 'Build a Cake' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]
