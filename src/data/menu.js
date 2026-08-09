/* ============================================================================
   MENU DATA
   ----------------------------------------------------------------------------
   ⚠️  TODO: All products and prices below are realistic PLACEHOLDERS for a
   local Pakistani bakery. Confirm the real lineup and pricing with the owner.

   ⚠️  TODO: Every `image` is free Unsplash stock. Swap each one for a real
   Sweet Bites photo. Ideal source: their Instagram grid. Use ~1200px wide,
   4:5 or 1:1 crop for menu cards.
   ========================================================================== */

/** Builds a sized, auto-formatted Unsplash URL. */
const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'drinks', label: 'Drinks' },
]

export const products = [
  // ------------------------------- CAKES -------------------------------
  {
    id: 'belgian-fudge',
    name: 'Belgian Chocolate Fudge',
    category: 'cakes',
    price: 2600,
    unit: 'per 2 lb',
    badge: 'Bestseller',
    featured: true,
    description:
      'Three layers of dark cocoa sponge soaked in chocolate syrup, wrapped in a silky Belgian ganache.',
    image: img('photo-1578985545062-69928b1d9587'),
    alt: 'Rich chocolate fudge cake with glossy ganache topping',
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Cream Cheese',
    category: 'cakes',
    price: 2900,
    unit: 'per 2 lb',
    badge: 'Most loved',
    featured: true,
    description:
      'Velvet-soft crimson sponge layered with tangy whipped cream cheese frosting and velvet crumb.',
    image: img('photo-1621303837174-89787a7d4729'),
    alt: 'Red velvet layer cake with cream cheese frosting',
  },
  {
    id: 'tres-leches',
    name: 'Tres Leches',
    category: 'cakes',
    price: 2800,
    unit: 'per 2 lb',
    featured: true,
    description:
      'Airy vanilla sponge slowly drenched in three milks, finished with fresh cream and cinnamon dust.',
    image: img('photo-1519869325930-281384150729'),
    alt: 'Tres leches milk cake topped with fresh whipped cream',
  },
  {
    id: 'vanilla-butter',
    name: 'Classic Vanilla Butter',
    category: 'cakes',
    price: 2200,
    unit: 'per 2 lb',
    description:
      'The one everybody grew up on — real butter, Madagascar vanilla and a cloud of buttercream.',
    image: img('photo-1464349095431-e9a21285b5f3'),
    alt: 'Classic vanilla butter cake with white buttercream',
  },
  {
    id: 'coffee-caramel',
    name: 'Coffee Caramel Crunch',
    category: 'cakes',
    price: 3000,
    unit: 'per 2 lb',
    badge: 'New',
    description:
      'Espresso-soaked sponge, salted caramel ribbons and a shattering praline crunch on top.',
    image: img('photo-1571115177098-24ec42ed204d'),
    alt: 'Coffee caramel cake slice with praline crunch topping',
  },
  {
    id: 'fruit-gateau',
    name: 'Fresh Fruit Gateau',
    category: 'cakes',
    price: 3200,
    unit: 'per 2 lb',
    description:
      'Light vanilla chiffon, fresh cream and whatever fruit came in best from the market that morning.',
    image: img('photo-1488477181946-6428a0291777'),
    alt: 'Fresh fruit gateau topped with seasonal fruit and cream',
  },

  // ------------------------------ CUPCAKES ------------------------------
  {
    id: 'choco-ganache-cupcakes',
    name: 'Chocolate Ganache Cupcakes',
    category: 'cupcakes',
    price: 1050,
    unit: 'box of 6',
    badge: 'Bestseller',
    description:
      'Deep cocoa cupcakes crowned with a thick swirl of ganache and a dark chocolate curl.',
    image: img('photo-1563729784474-d77dbb933a9e'),
    alt: 'Box of chocolate cupcakes with ganache swirls',
  },
  {
    id: 'red-velvet-cupcakes',
    name: 'Red Velvet Cupcakes',
    category: 'cupcakes',
    price: 1150,
    unit: 'box of 6',
    description:
      'Miniature red velvets, piped high with cream cheese frosting and a dusting of red crumb.',
    image: img('photo-1535141192574-5d4897c12636'),
    alt: 'Red velvet cupcakes with cream cheese frosting swirls',
  },
  {
    id: 'vanilla-sprinkle-cupcakes',
    name: 'Vanilla Sprinkle Cupcakes',
    category: 'cupcakes',
    price: 950,
    unit: 'box of 6',
    description:
      'Soft vanilla cupcakes, pastel buttercream and a generous storm of sprinkles. Kids order these twice.',
    image: img('photo-1486427944299-d1955d23e34d'),
    alt: 'Vanilla cupcakes decorated with colourful sprinkles',
  },

  // ------------------------------ DESSERTS ------------------------------
  {
    id: 'brownie-box',
    name: 'Fudge Brownie Box',
    category: 'desserts',
    price: 900,
    unit: 'box of 6',
    badge: 'Bestseller',
    description:
      'Dense, gooey centres with that crackly paper-thin top. Walnuts optional, judgement free.',
    image: img('photo-1550617931-e17a7b70dce2'),
    alt: 'Stack of fudgy chocolate brownies with crackly tops',
  },
  {
    id: 'tiramisu-cup',
    name: 'Tiramisu Cup',
    category: 'desserts',
    price: 420,
    unit: 'per cup',
    description:
      'Coffee-soaked sponge and mascarpone cream layered in a jar, finished with bitter cocoa.',
    image: img('photo-1517427294546-5aa121f68e8a'),
    alt: 'Individual tiramisu dessert cup dusted with cocoa',
  },
  {
    id: 'cheesecake-slice',
    name: 'New York Cheesecake',
    category: 'desserts',
    price: 480,
    unit: 'per slice',
    description:
      'Baked low and slow on a butter biscuit base, with a spoon of berry compote on the side.',
    image: img('photo-1568051243851-f9b136146e97'),
    alt: 'Slice of New York cheesecake with berry compote',
  },
  {
    id: 'macarons',
    name: 'French Macarons',
    category: 'desserts',
    price: 1400,
    unit: 'box of 9',
    badge: 'New',
    description:
      'Crisp shells, chewy middles, nine flavours that change with the season. Made in small batches.',
    image: img('photo-1558961363-fa8fdf82db35'),
    alt: 'Assorted pastel French macarons in a gift box',
  },

  // ------------------------------- COOKIES ------------------------------
  {
    id: 'double-choc-cookies',
    name: 'Double Chocolate Chip',
    category: 'cookies',
    price: 600,
    unit: 'box of 6',
    description:
      'Pulled from the oven a minute early so the centre stays molten. Best eaten warm.',
    image: img('photo-1606890737304-57a1ca8a5b62'),
    alt: 'Double chocolate chip cookies with melted chocolate centres',
  },
  {
    id: 'butter-shortbread',
    name: 'Butter Shortbread',
    category: 'cookies',
    price: 550,
    unit: 'box of 12',
    description:
      'Three ingredients, done properly. Crumbly, buttery and dangerously easy to finish.',
    image: img('photo-1499636136210-6f4ee915583e'),
    alt: 'Golden butter shortbread cookies on a wooden board',
  },
  {
    id: 'almond-biscotti',
    name: 'Almond Biscotti',
    category: 'cookies',
    price: 700,
    unit: 'box of 8',
    description:
      'Twice-baked and built for dunking. Roasted almonds throughout, not just on top.',
    image: img('photo-1509440159596-0249088772ff'),
    alt: 'Almond biscotti sticks arranged beside coffee',
  },

  // -------------------------------- DRINKS ------------------------------
  {
    id: 'hot-chocolate',
    name: 'Belgian Hot Chocolate',
    category: 'drinks',
    price: 320,
    unit: 'per cup',
    description:
      'Real melted chocolate, not powder. Thick enough that the marshmallows sit on top.',
    image: img('photo-1587668178277-295251f900ce'),
    alt: 'Mug of thick Belgian hot chocolate with marshmallows',
  },
  {
    id: 'iced-caramel-latte',
    name: 'Iced Caramel Latte',
    category: 'drinks',
    price: 400,
    unit: 'per glass',
    description:
      'Double espresso, cold milk, house caramel and a long pour over ice.',
    image: img('photo-1497034825429-c343d7c6a68f'),
    alt: 'Iced caramel latte in a tall glass with caramel drizzle',
  },
]

/** The three cards shown in the "Signature Bakes" section. */
export const signatures = products.filter((p) => p.featured)

/** Gallery uses the product photography plus a couple of atmosphere shots. */
export const galleryImages = [
  { src: img('photo-1578985545062-69928b1d9587', 1000), alt: 'Chocolate fudge cake finished with glossy ganache' },
  { src: img('photo-1563729784474-d77dbb933a9e', 1000), alt: 'Tray of freshly piped chocolate cupcakes' },
  { src: img('photo-1558961363-fa8fdf82db35', 1000), alt: 'Pastel French macarons lined up in rows' },
  { src: img('photo-1621303837174-89787a7d4729', 1000), alt: 'Red velvet cake with cream cheese frosting' },
  { src: img('photo-1509440159596-0249088772ff', 1000), alt: 'Fresh bakes cooling on the counter' },
  { src: img('photo-1550617931-e17a7b70dce2', 1000), alt: 'Fudge brownies cut into squares' },
  { src: img('photo-1519869325930-281384150729', 1000), alt: 'Milk cake topped with fresh cream' },
  { src: img('photo-1606890737304-57a1ca8a5b62', 1000), alt: 'Chocolate chip cookies straight from the oven' },
  { src: img('photo-1587668178277-295251f900ce', 1000), alt: 'The Sweet Bites counter display' },
]
