// netlify/functions/get-order.js
// Called by the success page to show order confirmation details.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
exports.handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id

  if (!sessionId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing session_id' }) }
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const metadata = session.metadata || {}

    return {
      statusCode: 200,
      body: JSON.stringify({
        productName: metadata.productName || '',
        childName: metadata.childName || '',
        option: metadata.option || '',
        amount: session.amount_total || 0,
      }),
    }
  } catch (err) {
    console.error('get-order error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve order' }),
    }
  }
}
