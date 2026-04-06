import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const { slug, name, shortDesc, priceDisplay, badge, emoji, bannerBg } = product

  return (
    <div className="card group">
      {/* Banner */}
      <div className={`h-36 bg-gradient-to-br ${bannerBg} flex items-center justify-center relative`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
          {emoji}
        </span>
        {badge && (
          <span className="absolute top-3 right-3 bg-white text-candy-purple text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-fredoka text-xl text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{shortDesc}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-candy-purple">{priceDisplay}</span>
            <span className="text-xs text-gray-400 ml-1">one-time</span>
          </div>
          <Link
            to={`/products/${slug}`}
            className="btn-primary text-sm py-2 px-5"
          >
            Get It →
          </Link>
        </div>
      </div>
    </div>
  )
}
