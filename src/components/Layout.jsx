import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}
         style={{ borderBottom: '2px dashed #FFD6E7' }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-fredoka text-2xl leading-none">
          <span className="text-candy-pink">Little</span>
          <span className="text-candy-purple">Sparks</span>
          <span className="text-gray-700"> Prints</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center list-none">
          <li><Link to="/#products" className="font-bold text-gray-700 hover:text-candy-pink transition-colors text-sm">Products</Link></li>
          <li><Link to="/#how-it-works" className="font-bold text-gray-700 hover:text-candy-pink transition-colors text-sm">How It Works</Link></li>
          <li><Link to="/faq" className="font-bold text-gray-700 hover:text-candy-pink transition-colors text-sm">FAQ</Link></li>
          <li><Link to="/about" className="font-bold text-gray-700 hover:text-candy-pink transition-colors text-sm">About</Link></li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/#products" className="btn-primary text-sm py-2 px-5">Shop Now ✨</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 flex flex-col gap-3">
          <Link to="/#products" className="font-bold text-gray-700 py-2">Products</Link>
          <Link to="/#how-it-works" className="font-bold text-gray-700 py-2">How It Works</Link>
          <Link to="/faq" className="font-bold text-gray-700 py-2">FAQ</Link>
          <Link to="/about" className="font-bold text-gray-700 py-2">About</Link>
          <Link to="/#products" className="btn-primary text-center mt-2">Shop Now ✨</Link>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-fredoka text-2xl mb-3">
              <span className="text-candy-pink">Little</span>
              <span className="text-candy-purple">Sparks</span>
              <span className="text-white"> Prints</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Magical, personalized printables for curious little minds. Made with love for kids kindergarten through 5th grade.
            </p>
            <p className="text-xs mt-4 text-gray-600">⭐ 4.9/5 from 1,200+ happy parents</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/personalized-coloring-book" className="hover:text-candy-pink transition-colors">Coloring Books</Link></li>
              <li><Link to="/products/custom-activity-workbook" className="hover:text-candy-pink transition-colors">Activity Workbooks</Link></li>
              <li><Link to="/products/seasonal-holiday-activity-pack" className="hover:text-candy-pink transition-colors">Holiday Packs</Link></li>
              <li><Link to="/products/sight-word-flashcards" className="hover:text-candy-pink transition-colors">Sight Word Flashcards</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-candy-pink transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-candy-pink transition-colors">About Us</Link></li>
              <li><a href="mailto:hello@littlesparks.com" className="hover:text-candy-pink transition-colors">Contact Us</a></li>
              <li><Link to="/faq#refunds" className="hover:text-candy-pink transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} LittleSparks Prints. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
          <p>🔒 Secure payments via Stripe</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
