import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { PRODUCTS } from '../data/products'

export default function BundlePage() {
  const navigate = useNavigate()
  const [childName, setChildName] = useState('')
  const [holiday, setHoliday] = useState('')
  const [cardSet, setCardSet] = useState('')
  const [theme, setTheme] = useState('')
  const [grade, setGrade] = useState('')
  const [error, setError] = useState('')

  const coloring = PRODUCTS.find(p => p.id === 'coloring-book')
  const workbook  = PRODUCTS.find(p => p.id === 'activity-workbook')
  const holiday_  = PRODUCTS.find(p => p.id === 'holiday-pack')
  const flash     = PRODUCTS.find(p => p.id === 'sight-words')

  function handleGetBundle() {
    if (!childName.trim()) { setError("Please enter your child's name"); return }
    if (!theme)   { setError('Please choose a coloring book theme'); return }
    if (!grade)   { setError('Please choose a grade level for the workbook'); return }
    if (!holiday) { setError('Please choose a holiday pack'); return }
    if (!cardSet) { setError('Please choose a flashcard set'); return }
    setError('')
    const params = new URLSearchParams({ name: childName.trim(), theme, grade, holiday, cardSet })
    navigate(`/checkout/bundle?${params}`)
  }

  return (
    <>
      <SEOHead
        title="Complete Bundle — All 4 Products"
        description="Get all 4 LittleSparks printables for your child at one discounted price. Coloring book, activity workbook, holiday pack, and sight word flashcards."
        canonical="/products/bundle"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4 text-center">
        <div className="text-6xl mb-4">🎁</div>
        <div className="inline-block bg-candy-pink text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          BEST VALUE — Save 32%
        </div>
        <h1 className="font-fredoka text-5xl text-gray-800 mb-3">The Complete Bundle</h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto mb-6">
          Every LittleSparks product, personalized for your child — at one unbeatable price.
        </p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-400 line-through text-2xl">$28</span>
          <span className="font-fredoka text-5xl text-candy-pink">$19</span>
          <span className="text-gray-500 text-sm">one-time</span>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-fredoka text-3xl text-gray-800 text-center mb-2">What's Included</h2>
        <p className="text-center text-gray-500 mb-10">Four complete products, all personalized for one child.</p>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-4 bg-white rounded-2xl border-2 border-purple-100 p-5`}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.bannerBg} flex items-center justify-center text-3xl flex-shrink-0`}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <div className="font-fredoka text-lg text-gray-800">{p.name}</div>
                <div className="text-sm text-gray-500">{p.tagline}</div>
                <div className="text-xs text-gray-400 mt-1">{p.pages} pages · {p.ageRange}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 line-through text-sm">{p.priceDisplay}</div>
                <div className="text-green-600 font-bold text-sm">Included</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle form */}
        <div className="bg-purple-50 rounded-3xl border-2 border-purple-200 p-8 max-w-2xl mx-auto">
          <h3 className="font-fredoka text-2xl text-gray-800 mb-6 text-center">🎨 Personalize All 4 Products</h3>

          {/* Child name */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">Child's First Name <span className="text-candy-pink">*</span></label>
            <input
              type="text" maxLength={20} placeholder="e.g. Emma, Noah, Lily..."
              value={childName} onChange={e => { setChildName(e.target.value); setError('') }}
              className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 font-nunito focus:outline-none focus:border-candy-purple transition-colors"
            />
          </div>

          {/* Coloring theme */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">Coloring Book Theme <span className="text-candy-pink">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {coloring.interests.map(opt => (
                <button key={opt} type="button"
                  onClick={() => { setTheme(opt); setError('') }}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl border-2 transition-all text-left ${theme === opt ? 'border-candy-purple bg-candy-purple text-white' : 'border-purple-200 bg-white text-gray-700 hover:border-candy-purple'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Grade level */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">Workbook Grade Level <span className="text-candy-pink">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {workbook.gradeLevel.map(opt => (
                <button key={opt} type="button"
                  onClick={() => { setGrade(opt); setError('') }}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl border-2 transition-all text-center ${grade === opt ? 'border-candy-purple bg-candy-purple text-white' : 'border-purple-200 bg-white text-gray-700 hover:border-candy-purple'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Holiday */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">Holiday Pack <span className="text-candy-pink">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {holiday_.holidays.map(opt => (
                <button key={opt} type="button"
                  onClick={() => { setHoliday(opt); setError('') }}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl border-2 transition-all text-center ${holiday === opt ? 'border-candy-purple bg-candy-purple text-white' : 'border-purple-200 bg-white text-gray-700 hover:border-candy-purple'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Flashcard set */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Flashcard Set <span className="text-candy-pink">*</span></label>
            <div className="grid grid-cols-1 gap-2">
              {flash.cardSets.map(opt => (
                <button key={opt} type="button"
                  onClick={() => { setCardSet(opt); setError('') }}
                  className={`text-sm font-semibold py-2 px-3 rounded-xl border-2 transition-all text-left ${cardSet === opt ? 'border-candy-purple bg-candy-purple text-white' : 'border-purple-200 bg-white text-gray-700 hover:border-candy-purple'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-semibold mb-4">⚠️ {error}</div>}

          <button onClick={handleGetBundle} className="btn-primary w-full py-4 text-lg">
            Get the Bundle for $19 →
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">🔒 Secure checkout · No subscription · Instant PDF</p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-4 bg-white text-center" style={{ borderTop: '2px dashed #FFD6E7' }}>
        <div className="max-w-lg mx-auto">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="font-fredoka text-2xl text-gray-800 mb-2">7-Day Happiness Guarantee</h3>
          <p className="text-gray-500 text-sm">Not happy? We'll refund you, no questions asked.</p>
        </div>
      </section>
    </>
  )
}
