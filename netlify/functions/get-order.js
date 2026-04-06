// netlify/functions/get-order.js
// Called by the success page to show order confirmation details.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { buildPdfArtifactInfo } = require('./pdf-artifact')
const { buildDownloadUrl, canUseBlobStorage } = require('./pdf-storage')

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id

  if (!sessionId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing session_id' }) }
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const metadata = session.metadata || {}
    const artifact = buildPdfArtifactInfo({
      productSlug: metadata.productSlug,
      productName: metadata.productName,
      childName: metadata.childName,
      option: metadata.option,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        productName: metadata.productName || '',
        childName: metadata.childName || '',
        option: metadata.option || '',
        email: session.customer_email || session.customer_details?.email || '',
        amount: session.amount_total || 0,
        downloadUrl: canUseBlobStorage() ? buildDownloadUrl(artifact.key, event.headers) : '',
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
