# LittleSparks Launch Checklist

## 1. Production Environment

- Add all values from `.env.production.example` to Netlify production environment variables.
- Use live Stripe keys and live Stripe price IDs.
- Set `SITE_URL` to the exact production domain.
- Set `PDF_BLOB_STORE` only if you want to override the default store name.
- Start with `COLORING_BOOK_IMAGE_MODE=template`.
- Leave `OPENAI_API_KEY` blank for initial launch if you want to validate the core flow first.
- Make sure you replace every placeholder value. Netlify can fail builds if example placeholder values are copied directly into production env vars.

## 2. Stripe

- Create live products and prices in Stripe for:
  - Personalized Coloring Book
  - Custom Activity Workbook
  - Seasonal Holiday Pack
  - Sight Word Flashcards
  - Complete Bundle
- Add each live `price_...` ID to Netlify env vars.
- Create a live webhook endpoint:
  - `https://YOUR-DOMAIN/.netlify/functions/stripe-webhook`
- Subscribe to:
  - `checkout.session.completed`
- Copy the live webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 3. SendGrid

- Verify the sending domain or sender address.
- Confirm `SENDGRID_FROM_EMAIL` is allowed to send.
- Generate a production API key with mail send access.

## 4. Netlify

- Confirm the site builds successfully in production.
- Confirm functions are included from `netlify/functions`.
- Confirm the deployed site can access all required env vars.
- Confirm the production domain is set before testing live checkout.

## 5. First Production Test

- Make one real low-risk live purchase.
- Confirm Stripe checkout succeeds.
- Confirm the webhook logs a successful event.
- Confirm a PDF is generated.
- Confirm the buyer receives the email.
- Confirm the PDF attachment opens.
- Confirm the success page loads order details.
- Confirm the backup download link works if blob storage is active.

## 6. Failure Checks

- Check Netlify function logs for PDF generation errors.
- Check SendGrid activity for suppressed, blocked, or bounced email.
- Check Stripe webhook delivery logs for retries or signature failures.

## 7. OpenAI Rollout

- After the core flow is stable, add `OPENAI_API_KEY`.
- Change `COLORING_BOOK_IMAGE_MODE` from `template` to `hybrid`.
- Make one additional purchase test for the coloring book.
- Confirm AI pages are generated without delaying delivery beyond an acceptable threshold.

## 8. Post-Launch Nice-to-Haves

- Enable Fauna order tracking with `FAUNA_SECRET`.
- Add support monitoring for failed function invocations.
- Add a resend/rebuild admin flow for customer support.
