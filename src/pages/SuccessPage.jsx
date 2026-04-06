import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { PRODUCTS } from '../data/products'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/.netlify/functions/get-order?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sessionId])

  return (
    <>
      <SEOHead title="Order Confirmed! 🎉" />

      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-lg w-full text-center">

          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-candy-purple border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 font-semibold">Confirming your order...</p>
            </div>
          ) : (
            <>
              {/* Success animation */}
              <div className="text-8xl mb-6 floating">🎉</div>
              <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm mb-4">
                ✅ Payment Successful!
              </div>

              <h1 className="font-fredoka text-4xl text-gray-800 mb-3">
                Your PDF is on its way!
              </h1>

              <p className="text-gray-600 text-lg mb-2">
                {order?.email ? (
                  <>Check <strong>{order.email}</strong> — your printable is being sent right now.</>
                ) : (
                  'Check your inbox — your printable is being sent right now.'
                )}
              </p>
              <p className="text-sm text-gray-400 mb-8">
                (Check your spam folder if you don't see it within 2 minutes)
              </p>

              {order?.downloadUrl && (
                <div className="mb-8">
                  <a href={order.downloadUrl} className="btn-primary inline-flex">
                    Download a backup copy
                  </a>
                </div>
              )}

              {order && (
                <div className="bg-white rounded-2xl border-2 border-green-200 p-6 text-left mb-8">
                  <h3 className="font-fredoka text-lg text-gray-800 mb-4">📋 Order Details</h3>
                  <div className="space-y-2 text-sm">
                    {order.productName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Product</span>
                        <span className="font-bold text-gray-800">{order.productName}</span>
                      </div>
                    )}
                    {order.childName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Personalized for</span>
                        <span className="font-bold text-gray-800">{order.childName}</span>
                      </div>
                    )}
                    {order.amount && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount paid</span>
                        <span className="font-bold text-candy-purple">${(order.amount / 100).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-yellow-50 rounded-2xl border-2 border-yellow-200 p-5 text-left mb-8">
                <h3 className="font-bold text-gray-800 mb-3">🖨️ Printing Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• For coloring books, use standard 8.5"×11" white paper</li>
                  <li>• For flashcards, cardstock works great — or laminate after printing</li>
                  <li>• Print double-sided for workbooks to save paper</li>
                  <li>• You can reprint as many copies as you need, anytime!</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-primary">
                  Shop More Products 🛒
                </Link>
                <a
                  href="mailto:hello@littlesparks.com"
                  className="btn-secondary"
                >
                  Contact Support
                </a>
              </div>

              {/* Upsell */}
              <div className="mt-12 pt-8 border-t-2 border-dashed border-purple-100">
                <p className="text-gray-500 mb-4 font-semibold">Make it a complete collection 👇</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRODUCTS.map(p => (
                    <Link
                      key={p.id}
                      to={`/products/${p.slug}`}
                      className="bg-white rounded-xl border-2 border-purple-100 p-3 text-center hover:border-candy-purple transition-colors"
                    >
                      <div className="text-2xl mb-1">{p.emoji}</div>
                      <div className="text-xs font-bold text-gray-700 leading-tight">{p.name}</div>
                      <div className="text-candy-purple text-xs font-bold mt-1">{p.priceDisplay}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
