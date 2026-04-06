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

    // Only return safe, non-sensitive order info
    return {
      statusCode: 200,
      body: JSON.stringify({
        productName: session.metadata?.productName || '',
        childName:   session.metadata?.childName   || '',
        option:      session.metadata?.option      || '',
        email:       session.customer_email || session.customer_details?.email || '',
        amount:      session.amount_total   || 0,
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
