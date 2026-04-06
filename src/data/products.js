export const PRODUCTS = [
  {
    id: 'coloring-book',
    slug: 'personalized-coloring-book',
    name: 'Personalized Coloring Book',
    tagline: "20 unique pages built around your child's world",
    shortDesc: "AI-generated coloring pages built around your child's interests — unicorns, space, dinosaurs & more.",
    longDesc: `Give your child the gift of a truly one-of-a-kind coloring experience. Every page of this 20-page coloring book is generated just for them — featuring their name, their favorite themes, and their favorite characters.

Whether your little artist loves unicorns and rainbows, dinosaurs and volcanoes, space rockets, ocean creatures, or superheroes — we build a whole adventure just for them. Each page is clean black-and-white line art sized perfectly for standard US Letter paper.

Perfect for rainy days, long car rides, birthday gifts, or just making a Tuesday feel special.`,
    price: 700,
    priceDisplay: '$7',
    badge: 'Bestseller',
    emoji: '🦄',
    bannerBg: 'from-pink-100 to-pink-200',
    accentColor: 'candy-pink',
    pages: 20,
    format: 'PDF (US Letter, print-ready)',
    ageRange: 'Ages 3–10',
    interests: ['Unicorns & rainbows', 'Dinosaurs', 'Space & rockets', 'Ocean creatures', 'Superheroes', 'Fairies & magic', 'Cars & trucks', 'Animals & nature'],
    faqs: [
      { q: 'How do I personalize it?', a: "Just enter your child's name and pick their favorite theme — we do the rest instantly." },
      { q: 'Can I print multiple copies?', a: 'Yes! Once you purchase, the PDF is yours to print as many times as you want.' },
      { q: 'What age is this for?', a: 'Best for ages 3–10, though kids of all ages enjoy coloring!' },
    ]
  },
  {
    id: 'activity-workbook',
    slug: 'custom-activity-workbook',
    name: 'Custom Activity Workbook',
    tagline: 'Learning disguised as play — with their name on every page',
    shortDesc: "Tracing letters, number practice, mazes, dot-to-dot — all branded with your child's name throughout.",
    longDesc: `This isn't a boring worksheet pack. It's a personalized adventure that sneaks real learning into every page — and your child will never even realize it.

Every page of this 25-page workbook is customized with your child's name, making it feel like it was made just for them (because it was!). Activities include letter tracing, number writing practice, simple mazes, dot-to-dot puzzles, shape recognition, and basic counting games.

Perfectly aligned to Kindergarten through Grade 2 learning goals. Great for summer slide prevention, homeschooling, or just giving little brains something fun to do.`,
    price: 1000,
    priceDisplay: '$10',
    badge: 'Most Loved',
    emoji: '📖',
    bannerBg: 'from-yellow-100 to-yellow-200',
    accentColor: 'candy-orange',
    pages: 25,
    format: 'PDF (US Letter, print-ready)',
    ageRange: 'Ages 4–8 (K–Grade 2)',
    interests: [],
    gradeLevel: ['Kindergarten', '1st Grade', '2nd Grade'],
    faqs: [
      { q: 'Is this aligned to school standards?', a: 'Yes — activities are aligned to common Kindergarten through Grade 2 learning objectives.' },
      { q: "What if my child is advanced or needs extra practice?", a: "Select their current grade level at checkout and we'll tailor the difficulty accordingly." },
      { q: 'How long does the workbook last?', a: 'Most kids work through it over 1–2 weeks, but you can print it again anytime!' },
    ]
  },
  {
    id: 'holiday-pack',
    slug: 'seasonal-holiday-activity-pack',
    name: 'Seasonal Holiday Pack',
    tagline: 'Festive fun kids look forward to every single year',
    shortDesc: 'Halloween, Christmas, Easter & more. Themed worksheets, coloring pages, and activities for every season.',
    longDesc: `Celebrate every season with a fun-filled activity pack your kids will beg for year after year. Each holiday pack includes 15+ pages of themed activities — coloring pages, word searches, mazes, connect-the-dots, and seasonal crafts — all designed around the holiday.

Available for: Halloween, Thanksgiving, Christmas, Hanukkah, Valentine's Day, St. Patrick's Day, Easter, Summer, and Back-to-School.

Every pack is lightly personalized with your child's name on the cover. These make wonderful alternatives to candy in goodie bags, classroom party activities, or quiet-time holiday entertainment.`,
    price: 500,
    priceDisplay: '$5',
    badge: 'Seasonal',
    emoji: '🎃',
    bannerBg: 'from-blue-100 to-blue-200',
    accentColor: 'candy-blue',
    pages: 15,
    format: 'PDF (US Letter, print-ready)',
    ageRange: 'Ages 4–10',
    holidays: ['Halloween', 'Thanksgiving', 'Christmas', 'Hanukkah', "Valentine's Day", "St. Patrick's Day", 'Easter', 'Summer Fun', 'Back to School'],
    faqs: [
      { q: 'Can I buy multiple holiday packs?', a: 'Yes! Each holiday is a separate pack. Buy them individually or grab our All-Seasons Bundle.' },
      { q: 'Are these good for classroom use?', a: 'Absolutely — teachers love these for holiday parties. Print enough copies for the whole class!' },
      { q: 'How far in advance should I buy?', a: 'Instantly — download is immediate, so you can print the same day.' },
    ]
  },
  {
    id: 'sight-words',
    slug: 'sight-word-flashcards',
    name: 'Sight Word Flashcards',
    tagline: 'The kindergarten reading secret weapon',
    shortDesc: 'Printable flashcard sets with fun illustrated characters. A kindergarten must-have for reading readiness.',
    longDesc: `Sight words are the building blocks of early reading — and making them fun makes all the difference. These illustrated flashcard sets turn rote memorization into a game your child actually wants to play.

Each set comes with 50 carefully selected sight words (Dolch or Fry word lists), beautifully illustrated with friendly characters that help kids remember each word. Cards are sized to print at 3"×4" — perfect for little hands.

Includes a parent guide with 5 fun games to play with the cards (no screen required!). Loved by kindergarten teachers nationwide.

Choose from: Pre-K Starter Set (25 words), Kindergarten Set (50 words), or Grade 1 Set (50 words).`,
    price: 600,
    priceDisplay: '$6',
    badge: 'Teacher Pick',
    emoji: '🔤',
    bannerBg: 'from-green-100 to-green-200',
    accentColor: 'candy-green',
    pages: 50,
    format: 'PDF (3"×4" cards, print & cut)',
    ageRange: 'Ages 4–7 (Pre-K–Grade 1)',
    cardSets: ['Pre-K Starter (25 words)', 'Kindergarten Set (50 words)', 'Grade 1 Set (50 words)'],
    faqs: [
      { q: 'Which word list do you use?', a: 'We use the Dolch word list — the most widely recognized sight word list used in US schools.' },
      { q: 'How do I print the cards?', a: 'Print on regular paper or cardstock, then cut along the guides. Laminating is optional but makes them last longer!' },
      { q: 'Do teachers use these?', a: 'Yes — many kindergarten teachers buy these to send home with students as reading homework support.' },
    ]
  }
]

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.slug, p]))
