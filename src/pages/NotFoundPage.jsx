import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page Not Found" />
      <section className="min-h-96 flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="text-8xl mb-6 floating">🔍</div>
        <h1 className="font-fredoka text-5xl text-gray-800 mb-3">Oops! Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md">
          Looks like this page went on an adventure. Let's get you back to the fun stuff!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="btn-primary text-lg px-8 py-4">Back to Home 🏠</Link>
          <Link to="/#products" className="btn-secondary text-lg px-8 py-4">Shop Products 🎨</Link>
        </div>
      </section>
    </>
  )
}
