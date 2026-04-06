// netlify/functions/stripe-webhook.js
// Listens for Stripe payment events. On success: logs order + sends download email.

const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sgMail  = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Publicly accessible PDF links per product
// In production: generate signed URLs or host PDFs on a CDN and generate after payment
const PDF_LINKS = {
  'personalized-coloring-book':        process.env.PDF_URL_COLORING_BOOK     || 'https://littlesparks.com/pdfs/sample-coloring.pdf',
  'custom-activity-workbook':          process.env.PDF_URL_ACTIVITY_WORKBOOK || 'https://littlesparks.com/pdfs/sample-workbook.pdf',
  'seasonal-holiday-activity-pack':    process.env.PDF_URL_HOLIDAY_PACK      || 'https://littlesparks.com/pdfs/sample-holiday.pdf',
  'sight-word-flashcards':             process.env.PDF_URL_FLASHCARDS        || 'https://littlesparks.com/pdfs/sample-flashcards.pdf',
}

function buildEmailHtml({ childName, productName, pdfUrl, option }) {
  const optionLine = option ? `<p style="margin:0 0 8px 0;color:#666;font-size:14px;">Selected: <strong>${option}</strong></p>` : ''
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your LittleSparks Printable is Ready!</title>
</head>
<body style="margin:0;padding:0;background:#FFF9F0;font-family:'Nunito',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <tr>
      <td>
        <!-- Header -->
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#FF6B9D;margin:0 0 4px;">LittleSparks Prints</h1>
          <p style="color:#888;margin:0;font-size:14px;">Magical printables for curious little minds</p>
        </div>

        <!-- Main card -->
        <div style="background:#fff;border-radius:24px;border:2px solid #EDE9FE;padding:32px;margin-bottom:24px;">
          <div style="font-size:64px;text-align:center;margin-bottom:16px;">🎉</div>
          <h2 style="font-family:Arial;font-size:24px;color:#2D2D2D;text-align:center;margin:0 0 8px;">
            ${childName}'s printable is ready!
          </h2>
          <p style="text-align:center;color:#666;margin:0 0 24px;">
            Your <strong>${productName}</strong> has been personalized and is ready to download and print.
          </p>
          ${optionLine}

          <!-- Download button -->
          <div style="text-align:center;margin:28px 0;">
            <a href="${pdfUrl}"
               style="background:#FF6B9D;color:#fff;text-decoration:none;padding:16px 40px;
                      border-radius:50px;font-weight:700;font-size:16px;display:inline-block;
                      box-shadow:0 4px 0 #c94a7b;">
              Download Your PDF →
            </a>
          </div>

          <div style="background:#FFF5FF;border-radius:16px;padding:16px;margin-top:24px;">
            <p style="margin:0 0 8px;font-weight:700;color:#2D2D2D;font-size:14px;">🖨️ Printing Tips</p>
            <ul style="margin:0;padding:0 0 0 16px;color:#666;font-size:13px;line-height:1.7;">
              <li>Use standard 8.5" × 11" white paper</li>
              <li>For flashcards, cardstock is great — or laminate after printing</li>
              <li>You can print as many copies as you want, anytime!</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center;color:#aaa;font-size:12px;">
          <p>Questions? Reply to this email or contact us at <a href="mailto:hello@littlesparks.com" style="color:#FF6B9D;">hello@littlesparks.com</a></p>
          <p>© ${new Date().getFullYear()} LittleSparks Prints · We never spam.</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

exports.handler = async (event) => {
  const sig         = event.headers['stripe-signature']
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

    const { productSlug, childName, option, productName } = session.metadata
    const email    = session.customer_email || session.customer_details?.email
    const pdfUrl   = PDF_LINKS[productSlug]
    const amountPaid = session.amount_total

    console.log(`✅ Order completed: ${productName} for ${childName} → ${email}`)

    // Send email via SendGrid
    if (email && pdfUrl) {
      try {
        await sgMail.send({
          to:      email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'hello@littlesparks.com',
            name:  'LittleSparks Prints',
          },
          subject: `🎉 ${childName}'s ${productName} is ready to print!`,
          html:    buildEmailHtml({ childName, productName, pdfUrl, option }),
          text:    `Hi! Your ${productName} personalized for ${childName} is ready. Download it here: ${pdfUrl}`,
        })
        console.log(`📧 Email sent to ${email}`)
      } catch (emailErr) {
        console.error('SendGrid error:', emailErr.response?.body || emailErr.message)
        // Don't fail the webhook — log and continue
      }
    }

    // Optional: store order in FaunaDB for tracking
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
