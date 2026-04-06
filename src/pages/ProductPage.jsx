import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, PRODUCT_MAP } from '../data/products'

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border-2 border-purple-100 rounded-xl overflow-hidden">
          <button
            className="w-full text-left px-5 py-4 font-bold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {faq.q}
            <span className={`text-candy-purple transition-transform ${open === i ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed bg-purple-50">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = PRODUCT_MAP[slug]

  const [childName, setChildName] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [nameError, setNameError] = useState('')

  if (!product) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center gap-4 py-20">
        <div className="text-6xl">😢</div>
        <h1 className="font-fredoka text-3xl text-gray-700">Product Not Found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  const { name, tagline, longDesc, priceDisplay, price, badge, emoji, bannerBg,
          pages, format, ageRange, faqs, interests, gradeLevel, holidays, cardSets } = product

  const options = interests?.length ? interests
    : gradeLevel?.length ? gradeLevel
    : holidays?.length ? holidays
    : cardSets?.length ? cardSets
    : []

  const optionLabel = interests?.length ? 'Favorite Theme'
    : gradeLevel?.length ? 'Grade Level'
    : holidays?.length ? 'Choose Holiday'
    : cardSets?.length ? 'Choose Card Set'
    : ''

  const otherProducts = PRODUCTS.filter(p => p.slug !== slug).slice(0, 3)

  function handleGetIt() {
    if (!childName.trim()) {
      setNameError("Please enter your child's name")
      return
    }
    if (options.length > 0 && !selectedOption) {
      setNameError(`Please select a ${optionLabel.toLowerCase()}`)
      return
    }
    setNameError('')
    const params = new URLSearchParams({
      name: childName.trim(),
      ...(selectedOption && { option: selectedOption }),
    })
    navigate(`/checkout/${slug}?${params}`)
  }

  return (
    <>
      <SEOHead
        title={name}
        description={`${tagline}. ${priceDisplay} one-time payment. Instant PDF download, print at home.`}
        canonical={`/products/${slug}`}
      />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-candy-pink">Home</Link>
          <span>›</span>
          <span className="text-gray-700 font-semibold">{name}</span>
        </nav>
      </div>

      {/* ── PRODUCT HERO ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Visual */}
          <div className="sticky top-24">
            <div className={`rounded-3xl bg-gradient-to-br ${bannerBg} h-80 flex items-center justify-center mb-4 relative overflow-hidden`}>
              <span className="text-[8rem] select-none floating">{emoji}</span>
              {badge && (
                <span className="absolute top-4 left-4 bg-white text-candy-purple text-sm font-bold px-4 py-1.5 rounded-full shadow">
                  {badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '📄', label: `${pages} pages` },
                { icon: '⬇️', label: 'Instant PDF' },
                { icon: '🖨️', label: 'Print at home' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border-2 border-purple-100 py-3 px-2">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-bold text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details + Form */}
          <div>
            <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              ✅ Available Now · Instant Download
            </div>
            <h1 className="font-fredoka text-4xl text-gray-800 mb-2">{name}</h1>
            <p className="text-lg text-gray-500 mb-4">{tagline}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-fredoka text-4xl text-candy-purple">{priceDisplay}</span>
              <span className="text-gray-400">one-time payment</span>
              <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">No subscription</span>
            </div>

            <div className="flex items-center gap-1 mb-6">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-gray-500 ml-1">4.9/5 from 1,200+ parents</span>
            </div>

            {/* Personalization form */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-100">
              <h3 className="font-fredoka text-xl text-gray-800 mb-4">🎨 Personalize It</h3>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Child's First Name <span className="text-candy-pink">*</span>
                </label>
                <input
                  type="text"
                  maxLength={20}
                  placeholder="e.g. Emma, Noah, Sophia..."
                  value={childName}
                  onChange={e => { setChildName(e.target.value); setNameError('') }}
                  className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-gray-800 font-nunito focus:outline-none focus:border-candy-purple transition-colors"
                />
              </div>

              {options.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {optionLabel} <span className="text-candy-pink">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setSelectedOption(opt); setNameError('') }}
                        className={`text-sm font-semibold py-2 px-3 rounded-xl border-2 transition-all text-left ${
                          selectedOption === opt
                            ? 'border-candy-purple bg-candy-purple text-white'
                            : 'border-purple-200 bg-white text-gray-700 hover:border-candy-purple'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {nameError && (
                <div className="text-red-500 text-sm font-semibold mb-3">⚠️ {nameError}</div>
              )}

              <button onClick={handleGetIt} className="btn-primary w-full text-center py-4 text-lg">
                Get It for {priceDisplay} →
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">🔒 Secure checkout via Stripe</p>
            </div>

            {/* Format details */}
            <div className="flex flex-wrap gap-2 text-sm mb-6">
              {[
                { label: ageRange, color: 'bg-pink-100 text-pink-700' },
                { label: format, color: 'bg-blue-100 text-blue-700' },
                { label: `${pages} pages`, color: 'bg-green-100 text-green-700' },
              ].map((tag, i) => (
                <span key={i} className={`px-3 py-1 rounded-full font-semibold ${tag.color}`}>{tag.label}</span>
              ))}
            </div>

            {/* Long description */}
            <div className="prose prose-sm text-gray-600 leading-relaxed mb-8">
              {longDesc.split('\n\n').map((para, i) => (
                <p key={i} className="mb-3">{para}</p>
              ))}
            </div>

            {/* FAQ */}
            {faqs?.length > 0 && (
              <div>
                <h3 className="font-fredoka text-xl text-gray-800 mb-3">Frequently Asked Questions</h3>
                <FaqAccordion faqs={faqs} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="py-16 px-4 bg-white" style={{ borderTop: '2px dashed #FFD6E7' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-fredoka text-3xl text-gray-800 text-center mb-2">You Might Also Love</h2>
          <p className="text-center text-gray-500 mb-8">All products include your child's name on every page.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
