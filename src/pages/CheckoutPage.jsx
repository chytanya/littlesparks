import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import SEOHead from '../components/SEOHead'
import { PRODUCT_MAP } from '../data/products'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

export default function CheckoutPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const product = PRODUCT_MAP[slug]

  const childName = searchParams.get('name') || ''
  const option     = searchParams.get('option') || ''

  const [email, setEmail]         = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  if (!product) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center gap-4 py-20">
        <div className="text-6xl">😕</div>
        <h1 className="font-fredoka text-3xl text-gray-700">Product Not Found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  if (!childName) {
    navigate(`/products/${slug}`)
    return null
  }

  async function handleCheckout(e) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: slug,
          childName,
          option,
          email,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl:  `${window.location.origin}/products/${slug}`,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.sessionId) throw new Error(data.error || 'Checkout failed')

      const stripe = await stripePromise
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
      if (stripeError) throw new Error(stripeError.message)

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead title={`Checkout — ${product.name}`} />

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-candy-pink">Home</Link>
          <span>›</span>
          <Link to={`/products/${slug}`} className="hover:text-candy-pink">{product.name}</Link>
          <span>›</span>
          <span className="text-gray-700 font-semibold">Checkout</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left: Form */}
          <div className="lg:col-span-3">
            <h1 className="font-fredoka text-3xl text-gray-800 mb-2">Almost There! 🎉</h1>
            <p className="text-gray-500 mb-8">Enter your email to receive your instant PDF download.</p>

            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-candy-pink">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-gray-800 font-nunito focus:outline-none focus:border-candy-purple transition-colors"
                  required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                <p className="text-xs text-gray-400 mt-2">
                  Your PDF will be emailed here instantly after payment. We don't spam — ever.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-600 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full py-4 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Redirecting to secure checkout...
                  </span>
                ) : (
                  `Pay ${product.priceDisplay} Securely →`
                )}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-400">
              <span>🔒 256-bit SSL encryption</span>
              <span>💳 Powered by Stripe</span>
              <span>📧 Instant email delivery</span>
              <span>🛡️ 7-day happiness guarantee</span>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 sticky top-24">
              <h3 className="font-fredoka text-xl text-gray-800 mb-4">Order Summary</h3>

              <div className={`h-24 rounded-2xl bg-gradient-to-br ${product.bannerBg} flex items-center justify-center mb-4`}>
                <span className="text-5xl">{product.emoji}</span>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <p className="font-bold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.tagline}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-3 space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Child's name</span>
                    <span className="font-bold text-gray-800">{childName}</span>
                  </div>
                  {option && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Selected</span>
                      <span className="font-bold text-gray-800">{option}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Format</span>
                    <span className="font-bold text-gray-800">PDF download</span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-purple-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Total</span>
                  <span className="font-fredoka text-2xl text-candy-purple">{product.priceDisplay}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">One-time · No subscription</p>
              </div>

              <Link
                to={`/products/${slug}`}
                className="block text-center text-sm text-gray-400 hover:text-candy-pink mt-4 transition-colors"
              >
                ← Edit personalization
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
