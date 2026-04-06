const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sgMail = require('@sendgrid/mail')

const { buildEmailHtml, buildEmailText } = require('./email-helper')
const { getOrCreatePdf } = require('./pdf-generator')

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const { productSlug, childName, option, productName } = session.metadata || {}
    const email = session.customer_email || session.customer_details?.email
    const amountPaid = session.amount_total

    console.log(`✅ Order completed: ${productName} for ${childName} → ${email}`)

    let pdfAsset = null
    try {
      pdfAsset = await getOrCreatePdf({
        productSlug,
        productName,
        childName,
        option,
      }, event.headers)
      console.log(`🧾 PDF ${pdfAsset.cached ? 'reused' : 'generated'}: ${pdfAsset.key}`)
    } catch (pdfErr) {
      console.error('PDF generation error:', pdfErr.message)
    }

    if (email && pdfAsset?.buffer) {
      try {
        await sgMail.send({
          to: email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'hello@littlesparks.com',
            name: 'LittleSparks Prints',
          },
          subject: `🎉 ${childName}'s ${productName} is ready to print!`,
          html: buildEmailHtml({
            childName,
            productName,
            pdfUrl: pdfAsset.downloadUrl,
            option,
            hasAttachment: true,
          }),
          text: buildEmailText({
            childName,
            productName,
            pdfUrl: pdfAsset.downloadUrl,
            option,
            hasAttachment: true,
          }),
          attachments: [
            {
              filename: pdfAsset.filename,
              content: pdfAsset.buffer.toString('base64'),
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        })
        console.log(`📧 Email sent to ${email}`)
      } catch (emailErr) {
        console.error('SendGrid error:', emailErr.response?.body || emailErr.message)
      }
    } else if (!pdfAsset?.buffer) {
      console.error('Skipping email send because no PDF could be produced')
    } else {
      console.error('Skipping email send because customer email is missing')
    }

    if (process.env.FAUNA_SECRET) {
      try {
        const { Client, fql } = require('fauna')
        const client = new Client({ secret: process.env.FAUNA_SECRET })
        await client.query(fql`
          orders.create({
            stripeSessionId: ${session.id},
            productSlug:     ${productSlug},
            productName:     ${productName},
            childName:       ${childName},
            option:          ${option || ''},
            email:           ${email},
            amountPaid:      ${amountPaid},
            pdfKey:          ${pdfAsset?.key || ''},
            pdfStorage:      ${pdfAsset?.storage || ''},
            createdAt:       Time.now()
          })
        `)
        console.log('📦 Order saved to FaunaDB')
      } catch (dbErr) {
        console.error('FaunaDB error:', dbErr.message)
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) }
}
