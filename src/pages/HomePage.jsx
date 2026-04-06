import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const REVIEWS = [
  { name: 'Sarah L.', role: 'Mom of a 5-year-old', initials: 'SL', color: 'bg-pink-400', text: '"My daughter screamed with excitement when she saw her name on every coloring page. We\'ve printed it three times already!"' },
  { name: 'David M.', role: 'Dad of a 7-year-old', initials: 'DM', color: 'bg-purple-400', text: '"Used the workbook all summer to keep my son sharp. He didn\'t even realize he was learning — just thought it was fun!"' },
  { name: 'Mrs. T. Kim', role: 'Kindergarten Teacher', initials: 'TK', color: 'bg-blue-400', text: '"I recommend these flashcards to every parent at Back-to-School night. The illustrations are adorable and kids love them."' },
  { name: 'Jessica R.', role: 'Mom of twins, ages 6 & 6', initials: 'JR', color: 'bg-green-400', text: '"Bought the holiday pack for Christmas and had to buy the Halloween one too. My kids ask for these now. Incredible value!"' },
  { name: 'Marcus T.', role: 'Homeschool parent', initials: 'MT', color: 'bg-orange-400', text: '"Finally a printable resource that doesn\'t look like it was made in 1998. Beautiful design, educationally solid. 10/10."' },
  { name: 'Priya K.', role: 'Mom of a 4-year-old', initials: 'PK', color: 'bg-candy-pink', text: '"The sight word flashcards are genuinely helping my daughter read. She asks to \'play flashcards\' every morning. Worth every penny."' },
]

const TRUST_ITEMS = [
  { icon: '⚡', text: 'Instant PDF Download' },
  { icon: '🖨️', text: 'Print Unlimited Copies' },
  { icon: '🎨', text: "Child's Name on Every Page" },
  { icon: '⭐', text: '4.9/5 · 1,200+ Parents' },
  { icon: '🔒', text: 'One-Time Payment' },
  { icon: '💌', text: 'PDF Emailed Instantly' },
]

const HOW_STEPS = [
  { num: '1', title: 'Pick a Pack', desc: "Choose the product that fits your child's age and interests from our collection.", color: 'bg-candy-pink' },
  { num: '2', title: 'Enter Their Name', desc: 'Type your child\'s name and select their favorite theme or grade level.', color: 'bg-candy-blue' },
  { num: '3', title: 'Pay Once', desc: 'No subscriptions, no renewals, no hidden fees. Just one small payment.', color: 'bg-candy-green' },
  { num: '4', title: 'Print & Play!', desc: 'Instant PDF in your inbox. Print as many copies as you want, forever.', color: 'bg-candy-purple' },
]

const STATS = [
  { value: '1,200+', label: 'Happy Families' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '4', label: 'Product Types' },
  { value: '100%', label: 'Instant Delivery' },
]

function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function HomePage() {
  useFadeUp()

  return (
    <>
      <SEOHead
        canonical="/"
        description="Personalized printables for kids K–5. Coloring books, activity workbooks, sight word flashcards and holiday packs. Instant PDF download, one-time payment."
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-amber-50 pt-16 pb-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-pink-200 opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-200 opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-yellow-200 opacity-30 pointer-events-none floating-delay" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white border-2 border-candy-pink text-candy-pink text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            ✨ Instant Download · Print at Home · No Subscription
          </div>

          <h1 className="font-fredoka text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-800 mb-6">
            Magical Printables <br />
            <span className="text-candy-pink">Made Just for</span>{' '}
            <span className="text-candy-purple">Your Kid</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Personalized coloring books, activity workbooks, flashcards & seasonal packs —
            with <strong>your child's name on every page</strong>. Designed by educators, loved by kids ages K–5.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#products" className="btn-primary text-lg px-10 py-4">
              Shop All Products 🎨
            </a>
            <a href="#how-it-works" className="btn-secondary text-lg px-10 py-4">
              See How It Works
            </a>
          </div>

          {/* Floating emoji row */}
          <div className="flex justify-center gap-6 text-4xl select-none">
            {['🦄','📖','🎃','🔤','⭐','🖍️'].map((e, i) => (
              <span key={i} className="floating" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-white py-4 px-4" style={{ borderTop: '2px dashed #FFD6E7', borderBottom: '2px dashed #FFD6E7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                <span className="text-lg">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-12 px-4 bg-gradient-to-r from-candy-pink to-candy-purple">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map((s, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="font-fredoka text-4xl mb-1">{s.value}</div>
              <div className="text-sm opacity-80 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title fade-up">🌈 Our Products</h2>
          <p className="section-sub fade-up">Pick a pack — your child's name goes on every single page.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <div key={product.id} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Bundle upsell */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-candy-purple rounded-3xl p-8 text-center fade-up">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="font-fredoka text-2xl text-gray-800 mb-2">The Complete Bundle</h3>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              Get all 4 products for one child at a special bundle price. Coloring book + workbook + holiday pack + flashcards.
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-gray-400 line-through text-lg">$28</span>
              <span className="font-fredoka text-3xl text-candy-pink">$19</span>
              <span className="bg-candy-pink text-white text-xs font-bold px-3 py-1 rounded-full">SAVE 32%</span>
            </div>
            <Link to="/products/bundle" className="btn-primary">Get the Bundle 🎉</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-4 bg-white" style={{ borderTop: '2px dashed #FFD6E7', borderBottom: '2px dashed #FFD6E7' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title fade-up">⚡ How It Works</h2>
          <p className="section-sub fade-up">From purchase to printing in under 2 minutes.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="text-center fade-up" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-fredoka text-2xl shadow-lg`}>
                  {step.num}
                </div>
                <h3 className="font-fredoka text-xl text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute mt-8 text-gray-300 text-2xl" style={{ marginLeft: '110%' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title fade-up">🎨 What's Inside Each Pack</h2>
          <p className="section-sub fade-up">Every product is carefully designed for learning and fun.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCTS.map((product, i) => (
              <div key={product.id} className="bg-white rounded-3xl border-2 border-purple-100 p-6 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.bannerBg} flex items-center justify-center text-3xl flex-shrink-0`}>
                    {product.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-fredoka text-lg text-gray-800">{product.name}</h3>
                      <span className="text-candy-purple font-bold text-sm">{product.priceDisplay}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{product.tagline}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-pink-50 text-pink-700 px-2 py-1 rounded-full font-semibold">{product.pages} pages</span>
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-semibold">{product.ageRange}</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">Instant PDF</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{product.format}</span>
                  <Link to={`/products/${product.slug}`} className="text-candy-pink font-bold text-sm hover:underline">
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title fade-up">💬 What Parents Are Saying</h2>
          <p className="section-sub fade-up">Real families, real smiles.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-purple-100 p-6 fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="py-16 px-4 bg-white" style={{ borderTop: '2px dashed #FFD6E7' }}>
        <div className="max-w-3xl mx-auto text-center fade-up">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="font-fredoka text-3xl text-gray-800 mb-3">100% Happiness Guarantee</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We want every child to love their printables. If you're not completely happy with your purchase,
            contact us within 7 days and we'll make it right — no questions asked.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-600">
            <span className="flex items-center gap-1">✅ Instant delivery</span>
            <span className="flex items-center gap-1">✅ Print unlimited copies</span>
            <span className="flex items-center gap-1">✅ 7-day refund policy</span>
            <span className="flex items-center gap-1">✅ Secure Stripe checkout</span>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-candy-pink to-candy-purple rounded-3xl p-12 text-center text-white fade-up">
          <div className="text-5xl mb-4">🌟</div>
          <h2 className="font-fredoka text-4xl mb-3">Ready to Make Their Day?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join 1,200+ parents who've gifted their kids something truly special. Instant download, one-time payment.
          </p>
          <a href="#products" className="btn-white text-lg px-10 py-4 inline-block">
            Create Your First Pack ✨
          </a>
        </div>
      </section>
    </>
  )
}
