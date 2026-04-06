// netlify/functions/create-checkout.js
// Creates a Stripe Checkout session and returns the session ID to the frontend.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Map product slugs to Stripe price IDs (set these after creating products in Stripe dashboard)
const PRICE_MAP = {
  'personalized-coloring-book':        process.env.STRIPE_PRICE_COLORING_BOOK,
  'custom-activity-workbook':          process.env.STRIPE_PRICE_ACTIVITY_WORKBOOK,
  'seasonal-holiday-activity-pack':    process.env.STRIPE_PRICE_HOLIDAY_PACK,
  'sight-word-flashcards':             process.env.STRIPE_PRICE_FLASHCARDS,
  'bundle':                            process.env.STRIPE_PRICE_BUNDLE,
}

const PRODUCT_NAMES = {
  'personalized-coloring-book':        'Personalized Coloring Book',
  'custom-activity-workbook':          'Custom Activity Workbook',
  'seasonal-holiday-activity-pack':    'Seasonal Holiday Activity Pack',
  'sight-word-flashcards':             'Sight Word Flashcards',
  'bundle':                            'Complete Bundle (All 4 Products)',
}

// Fallback prices in cents if Stripe price IDs not set yet (for dev/testing)
const FALLBACK_PRICES = {
  'personalized-coloring-book':        700,
  'custom-activity-workbook':          1000,
  'seasonal-holiday-activity-pack':    500,
  'sight-word-flashcards':             600,
  'bundle':                            1900,
}

function normalizeOrigin(value) {
  return String(value || '').replace(/\/$/, '')
}

function parseOrigin(value) {
  try {
    return normalizeOrigin(new URL(String(value || '')).origin)
  } catch (error) {
    return ''
  }
}

function isLocalOrigin(value) {
  return /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(value)
}

function buildSiteUrl(headers = {}) {
  const requestOrigin = parseOrigin(headers.origin || headers.Origin)
  if (requestOrigin && isLocalOrigin(requestOrigin)) {
    return requestOrigin
  }

  const configured = normalizeOrigin(process.env.SITE_URL)
  if (configured) return configured

  const proto = headers['x-forwarded-proto'] || headers['X-Forwarded-Proto'] || 'https'
  const host = requestOrigin
    ? new URL(requestOrigin).host
    : (headers['x-forwarded-host'] || headers.host || headers.Host || '')

  return host ? `${proto}://${host}` : ''
}

function isAllowedOrigin(headers = {}) {
  const origin = parseOrigin(headers.origin || headers.Origin)
  if (!origin) return true

  const siteUrl = buildSiteUrl(headers)
  return origin === normalizeOrigin(siteUrl)
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { productSlug, childName, option, email } = JSON.parse(event.body)

    if (!productSlug || !childName || !email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) }
    }

    if (!isAllowedOrigin(event.headers)) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Invalid request origin' }) }
    }

    const productName = PRODUCT_NAMES[productSlug]
    if (!productName) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid product' }) }
    }

    const siteUrl = buildSiteUrl(event.headers)
    if (!siteUrl) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not determine site URL' }) }
    }

    const priceId      = PRICE_MAP[productSlug]
    const fallbackAmt  = FALLBACK_PRICES[productSlug]

    // Build line item — use Stripe Price ID if available, otherwise inline price
    const lineItem = priceId
      ? { price: priceId, quantity: 1 }
      : {
          price_data: {
            currency: 'usd',
            unit_amount: fallbackAmt,
            product_data: {
              name: productName,
              description: `Personalized for: ${childName}${option ? ` · ${option}` : ''}`,
            },
          },
          quantity: 1,
        }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [lineItem],
      customer_email: email,
      metadata: {
        productSlug,
        childName,
        option:      option || '',
        productName,
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${siteUrl}/checkout`,
      // Collect billing address for tax purposes (optional)
      billing_address_collection: 'auto',
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    }

  } catch (err) {
    console.error('Checkout error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    }
  }
}
