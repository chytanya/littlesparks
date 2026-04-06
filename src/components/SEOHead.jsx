import { Helmet } from 'react-helmet-async'

export default function SEOHead({ title, description, canonical, ogImage }) {
  const fullTitle = title
    ? `${title} | LittleSparks Prints`
    : 'LittleSparks Prints — Personalized Printables for Kids K–5'

  const desc = description ||
    'Personalized coloring books, activity workbooks, sight word flashcards and seasonal packs for kids K–5. Instant PDF download, one-time payment.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={`https://littlesparks.com${canonical}`} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}
