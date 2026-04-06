import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const FAQ_CATEGORIES = [
  {
    category: 'Ordering & Payment',
    icon: '💳',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through Stripe, which is one of the most trusted payment processors in the world. All transactions are encrypted and secure.' },
      { q: 'Is this a subscription?', a: 'No! Never. Every product is a single one-time payment. There are no recurring charges, no auto-renewals, and no surprise fees. You pay once and own your printable forever.' },
      { q: 'Can I get a refund?', a: "Yes — we offer a 7-day happiness guarantee. If you're not completely satisfied with your purchase, email us at hello@littlesparks.com within 7 days and we'll issue a full refund, no questions asked. Because digital products are instant downloads, we handle refunds on a trust basis." },
      { q: 'Do I need to create an account?', a: "No account required! Just enter your child's name, provide your email for delivery, and check out. We keep it simple — your email is only used to send your PDF." },
      { q: 'Is my payment information safe?', a: "Absolutely. We use Stripe for all payments — we never see or store your credit card information. Stripe is PCI-DSS Level 1 certified, the highest level of payment security available." },
    ]
  },
  {
    category: 'Delivery & Downloads',
    icon: '📧',
    faqs: [
      { q: 'How do I receive my purchase?', a: 'Immediately after payment, a PDF is automatically emailed to the address you provided at checkout. The email typically arrives within 1–2 minutes. Check your spam folder if you don\'t see it.' },
      { q: 'What if I don\'t receive my email?', a: "Check your spam/junk folder first. If it's not there, email us at hello@littlesparks.com with your order details and we'll resend it right away." },
      { q: 'Can I re-download my PDF later?', a: "Yes! Your PDF link is included in your confirmation email. We also store orders for 30 days, so if you lose your email, contact us and we'll resend your file." },
      { q: 'What format are the files?', a: 'All files are PDF format, compatible with any device (phone, tablet, laptop, desktop). You can open them with the free Adobe Acrobat Reader, your browser, or any PDF viewer.' },
    ]
  },
  {
    category: 'Printing',
    icon: '🖨️',
    faqs: [
      { q: 'What paper should I use?', a: "Standard white printer paper (8.5\" × 11\" in the US) works perfectly for coloring books and workbooks. For flashcards, we recommend cardstock (65–110 lb) for durability, though regular paper works too." },
      { q: 'Can I print multiple copies?', a: "Yes! Once you purchase a PDF, you can print it as many times as you want, forever. Print a fresh copy when the first one gets too colorful, or print one for each child in the house." },
      { q: 'Do I need a color printer?', a: "Coloring books and activity workbooks are designed as black-and-white line art — a standard black & white printer is perfect. Flashcards have optional color elements that look better on a color printer, but still work in black and white." },
      { q: 'Can I print at a print shop like FedEx or Staples?', a: "Absolutely! Your PDF is print-ready. You can take it to any print shop or office supply store. For coloring books, spiral binding makes a great experience for kids." },
    ]
  },
  {
    category: 'Personalization',
    icon: '🎨',
    faqs: [
      { q: "How do you personalize the printable with my child's name?", a: "When you add a product to your cart, you'll enter your child's first name (up to 20 characters). Our system automatically places their name on the cover and throughout the pages." },
      { q: "What if I made a typo in the name?", a: "Email us at hello@littlesparks.com within 24 hours with the correct name and we'll send you a corrected version at no charge." },
      { q: "Can I order for multiple children?", a: "Yes — simply place a separate order for each child with their individual name. Each order gets its own personalized PDF." },
      { q: "Can I use a nickname or middle name?", a: "Of course! Whatever name your child goes by — nickname, preferred name, or full name — just type it in the name field." },
    ]
  },
  {
    category: 'Products',
    icon: '📚',
    faqs: [
      { q: "What age range are these products for?", a: "All products are designed for children kindergarten through 5th grade (ages 4–11). Specific age recommendations: Coloring Books (ages 3–10), Activity Workbooks (ages 4–8 / K–Grade 2), Holiday Packs (ages 4–10), Sight Word Flashcards (ages 4–7 / Pre-K–Grade 1)." },
      { q: "Are the products aligned to school curriculum?", a: "Yes — our Activity Workbooks and Sight Word Flashcards are aligned to common US kindergarten through Grade 2 learning objectives, including phonics, number sense, letter formation, and high-frequency sight words." },
      { q: "Can teachers use these in the classroom?", a: "Absolutely! Many teachers purchase our products to supplement classroom activities, for holiday parties, or to send home as practice. For classroom use, one purchase allows you to print for your whole class." },
    ]
  },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-2 border-purple-100 rounded-xl overflow-hidden"
      itemScope itemType="https://schema.org/Question"
    >
      <button
        className="w-full text-left px-5 py-4 font-bold text-gray-800 flex items-start justify-between gap-3 hover:bg-purple-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span itemProp="name">{faq.q}</span>
        <span className={`text-candy-purple transition-transform flex-shrink-0 mt-0.5 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div
          className="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-purple-50"
          itemScope itemType="https://schema.org/Answer"
          itemProp="acceptedAnswer"
        >
          <span itemProp="text">{faq.a}</span>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(null)

  const displayed = activeCategory
    ? FAQ_CATEGORIES.filter(c => c.category === activeCategory)
    : FAQ_CATEGORIES

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions"
        description="Common questions about LittleSparks Prints — ordering, payments, printing, personalization, and product details."
        canonical="/faq"
      />

      <div itemScope itemType="https://schema.org/FAQPage">

        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16 px-4 text-center">
          <div className="text-6xl mb-4">🙋</div>
          <h1 className="font-fredoka text-5xl text-gray-800 mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to know about ordering, printing, and personalizing your printables.
          </p>
        </section>

        {/* Category filter */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                  !activeCategory
                    ? 'bg-candy-purple text-white border-candy-purple'
                    : 'border-purple-200 text-gray-600 hover:border-candy-purple'
                }`}
              >
                All Questions
              </button>
              {FAQ_CATEGORIES.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                    activeCategory === cat.category
                      ? 'bg-candy-purple text-white border-candy-purple'
                      : 'border-purple-200 text-gray-600 hover:border-candy-purple'
                  }`}
                >
                  {cat.icon} {cat.category}
                </button>
              ))}
            </div>

            {/* FAQ sections */}
            <div className="space-y-10">
              {displayed.map(cat => (
                <div key={cat.category} id={cat.category.toLowerCase().replace(/\s+/g, '-')}>
                  <h2 className="font-fredoka text-2xl text-gray-800 mb-4 flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.category}
                  </h2>
                  <div className="space-y-2">
                    {cat.faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
                  </div>
                </div>
              ))}
            </div>

            {/* Still need help */}
            <div className="mt-16 bg-gradient-to-r from-candy-pink to-candy-purple rounded-3xl p-10 text-center text-white">
              <div className="text-5xl mb-3">💌</div>
              <h2 className="font-fredoka text-3xl mb-2">Still Have Questions?</h2>
              <p className="opacity-90 mb-6">We're real humans and we love hearing from parents. Reach out anytime!</p>
              <a
                href="mailto:hello@littlesparks.com"
                className="btn-white inline-block"
              >
                Email Us: hello@littlesparks.com
              </a>
              <p className="text-sm opacity-70 mt-3">We typically respond within a few hours.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
