import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const VALUES = [
  { icon: '🎓', title: 'Education First', desc: 'Every product is designed with real learning goals in mind, not just pretty pictures.' },
  { icon: '💖', title: 'Personalization Matters', desc: 'A child who sees their own name lights up. We make that happen for every single order.' },
  { icon: '💰', title: 'Affordable for Everyone', desc: 'Quality educational content should be accessible. That\'s why everything is under $15.' },
  { icon: '🔒', title: 'No Subscription Tricks', desc: 'Pay once, own it forever. No auto-renewals, no hidden fees, no nonsense.' },
]

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about LittleSparks Prints — personalized educational printables for kids K–5, made by educators and parents."
        canonical="/about"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-7xl mb-6 floating">✏️</div>
          <h1 className="font-fredoka text-5xl text-gray-800 mb-4">We Believe Every Child Deserves a Little Magic</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            LittleSparks Prints was born from a simple idea: what if a learning worksheet felt like a gift?
            What if a child's face lit up when they opened their activity book because it had <em>their</em> name on it?
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-purple-100 p-8 md:p-12">
            <h2 className="font-fredoka text-3xl text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                LittleSparks started when we noticed something frustrating: the educational printables
                available online were either generic and boring, or expensive subscription services
                that auto-charged parents month after month for content their kids had already outgrown.
              </p>
              <p>
                We knew there was a better way. Using the latest AI tools, we built a system that
                creates genuinely personalized content — coloring books, workbooks, flashcards —
                that feel like they were made specifically for each individual child. Because they were.
              </p>
              <p>
                Every product ships as a print-ready PDF the moment you pay. No waiting, no account creation,
                no subscription. Just instant, joyful, educational content that works for your child.
              </p>
              <p className="font-bold text-gray-800">
                We're parents and educators ourselves. We built the product we wished existed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-fredoka text-4xl text-center text-gray-800 mb-2">What We Stand For</h2>
          <p className="text-center text-gray-500 mb-12">Four principles that guide everything we do.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-purple-100 p-6 flex gap-4">
                <div className="text-4xl flex-shrink-0">{v.icon}</div>
                <div>
                  <h3 className="font-fredoka text-xl text-gray-800 mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,200+', label: 'Happy Families' },
            { value: '4', label: 'Unique Products' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '$0', label: 'Monthly Fees' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-purple-100 py-6 px-4">
              <div className="font-fredoka text-4xl text-candy-pink mb-1">{s.value}</div>
              <div className="text-sm font-bold text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-fredoka text-3xl text-gray-800 mb-3">Ready to Spark Some Joy?</h2>
          <p className="text-gray-500 mb-6">Browse our collection and create something special for your little one today.</p>
          <Link to="/#products" className="btn-primary text-lg px-10 py-4">
            Shop All Products 🌈
          </Link>
        </div>
      </section>
    </>
  )
}
