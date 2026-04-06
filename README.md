# ✏️ LittleSparks Prints

Personalized printables for kids K–5. Built with React + Vite, hosted on Netlify, powered by Stripe payments, on-demand PDF generation, and SendGrid email delivery.

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies

```bash
# Frontend
npm install

# Netlify functions
cd netlify/functions && npm install && cd ../..
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env` file — see [Environment Variables](#environment-variables) below.

### 3. Run locally

**Option A — Frontend only** (no functions):
```bash
npm run dev
# → http://localhost:3000
```

**Option B — Frontend + Netlify Functions (recommended for local work):**
```bash
npm install -g netlify-cli
npm run dev:netlify
# → app at http://127.0.0.1:3000
# → functions served through /.netlify/functions/*
```

If you run `netlify dev` directly, it uses the local `[dev]` block in [`/Users/chaitu/Sites/littlesparks/netlify.toml`](/Users/chaitu/Sites/littlesparks/netlify.toml) and serves the built app rather than the Vite dev server. For day-to-day development, `npm run dev:netlify` is the intended workflow.

---

## 📁 Project Structure

```
littlesparks/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Marketing landing page
│   │   ├── ProductPage.jsx       # Product detail + personalization form
│   │   ├── CheckoutPage.jsx      # Email collection + Stripe redirect
│   │   ├── SuccessPage.jsx       # Post-payment confirmation
│   │   ├── AboutPage.jsx         # About us
│   │   ├── FaqPage.jsx           # FAQ with schema markup
│   │   └── NotFoundPage.jsx      # 404
│   ├── components/
│   │   ├── Layout.jsx            # Navbar + Footer
│   │   ├── ProductCard.jsx       # Product grid card
│   │   └── SEOHead.jsx           # react-helmet-async wrapper
│   ├── data/
│   │   └── products.js           # All product data (single source of truth)
│   ├── App.jsx                   # React Router setup
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Tailwind + custom styles
├── netlify/
│   └── functions/
│       ├── create-checkout.js    # POST → creates Stripe Checkout session
│       ├── stripe-webhook.js     # Stripe event listener → generates PDF + sends email
│       ├── pdf-generator.js      # HTML → PDF renderer with Puppeteer/Chromium
│       ├── pdf-storage.js        # Blob/local cache abstraction for generated PDFs
│       ├── pdf-artifact.js       # Stable keys + filenames for reuse
│       ├── download-pdf.js       # Download endpoint for stored PDFs
│       ├── get-order.js          # GET → order details for success page
│       └── package.json          # Function dependencies
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── netlify.toml                  # Netlify build + redirect config
├── vite.config.js
├── tailwind.config.js
├── .env.example
├── .env.production.example
└── LAUNCH_CHECKLIST.md
```

---

## 🔑 Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_SECRET_KEY` | Stripe secret key | Same as above |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe Dashboard → Webhooks |
| `STRIPE_PRICE_COLORING_BOOK` | Stripe Price ID | Create product in Stripe |
| `STRIPE_PRICE_ACTIVITY_WORKBOOK` | Stripe Price ID | Create product in Stripe |
| `STRIPE_PRICE_HOLIDAY_PACK` | Stripe Price ID | Create product in Stripe |
| `STRIPE_PRICE_FLASHCARDS` | Stripe Price ID | Create product in Stripe |
| `SENDGRID_API_KEY` | SendGrid API key | [SendGrid Dashboard](https://app.sendgrid.com/settings/api_keys) |
| `SENDGRID_FROM_EMAIL` | Verified sender email | Verify in SendGrid Settings |
| `SITE_URL` | Base public site URL | Your Netlify site URL |
| `PDF_BLOB_STORE` | Netlify Blobs store name for cached PDFs | Any short name, e.g. `generated-pdfs` |
| `PDF_CACHE_DIR` | Local development cache directory | Optional; defaults to `/tmp/littlesparks-pdfs` |
| `DOWNLOAD_TOKEN_SECRET` | Secret used to sign customer-specific download links | Generate a long random secret |
| `COLORING_BOOK_IMAGE_MODE` | `template`, `hybrid`, or `ai` | Controls coloring-book generation |
| `COLORING_BOOK_AI_PAGE_COUNT` | Number of AI pages to attempt | Optional; default `2` |
| `OPENAI_API_KEY` | Optional OpenAI API key for coloring-page image generation | OpenAI dashboard |
| `OPENAI_IMAGE_MODEL` | Optional image model name | Default `gpt-image-1` |
| `OPENAI_IMAGE_SIZE` | Optional image size | Default `1024x1024` |
| `FAUNA_SECRET` | FaunaDB server key (optional) | [FaunaDB Dashboard](https://dashboard.fauna.com) |

---

## 🚀 Production Rollout

For launch, start with the core payment and delivery flow first:

1. Set live Stripe, SendGrid, `SITE_URL`, and `PDF_BLOB_STORE` variables.
2. Launch with `COLORING_BOOK_IMAGE_MODE=template`.
3. Validate payment → webhook → PDF generation → email attachment → backup download.
4. After that flow is stable, add `OPENAI_API_KEY` and switch to `COLORING_BOOK_IMAGE_MODE=hybrid`.

Use:

- [`.env.production.example`](/Users/chaitu/Sites/littlesparks/.env.production.example) for the production env variable set
- [`LAUNCH_CHECKLIST.md`](/Users/chaitu/Sites/littlesparks/LAUNCH_CHECKLIST.md) for the production launch checklist

---

## 💳 Stripe Setup

### 1. Create products in Stripe
Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products) and create 4 products:
- Personalized Coloring Book — $7.00 one-time
- Custom Activity Workbook — $10.00 one-time
- Seasonal Holiday Pack — $5.00 one-time
- Sight Word Flashcards — $6.00 one-time

Copy each **Price ID** (starts with `price_`) into your `.env`.

### 2. Register webhook
In [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):
- Endpoint URL: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
- Event: `checkout.session.completed`
- Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### 3. Test with Stripe CLI (local)
```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
stripe trigger checkout.session.completed
```

---

## 📧 SendGrid Setup

1. Create account at [sendgrid.com](https://sendgrid.com) (free tier: 100 emails/day)
2. Verify your sender email address or domain
3. Create an API key with "Mail Send" permission
4. Add `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` to `.env`

---

## 🗄️ FaunaDB Setup (Optional — for order tracking)

1. Create a free account at [fauna.com](https://fauna.com)
2. Create a database called `littlesparks`
3. Create a collection called `orders`
4. Generate a server key and add to `FAUNA_SECRET`

Orders are automatically stored after each successful payment. When PDF storage is available, the saved order also includes the generated PDF key so the same personalized file can be reused instead of rebuilt.

---

## 🌐 Deploy to Netlify

### Option A — Netlify CLI
```bash
netlify login
netlify init        # connect to your GitHub repo
netlify deploy --prod
```

### Option B — GitHub + Netlify Dashboard
1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → New site → Import from GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add all env variables in Site Settings → Environment Variables
6. Deploy!

---

## 🔍 SEO Features

- Full meta tags (title, description, canonical, OG, Twitter cards)
- JSON-LD structured data (Store schema with ratings)
- FAQ page with `FAQPage` schema markup
- `sitemap.xml` and `robots.txt`
- Semantic HTML throughout
- Mobile-responsive design

---

## 📦 Adding New Products

1. Add the product object to `src/data/products.js`
2. Create a Stripe product + price, add the price ID to `.env`
3. Add the HTML/PDF template rules in [`/Users/chaitu/Sites/littlesparks/netlify/functions/pdf-generator.js`](/Users/chaitu/Sites/littlesparks/netlify/functions/pdf-generator.js)
4. The product automatically appears in the shop — no static PDF URL needed

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| SEO | react-helmet-async |
| Hosting | Netlify |
| Backend | Netlify Functions (serverless) |
| Payments | Stripe Checkout |
| Email | SendGrid |
| Database | FaunaDB (optional) |

---

## 📝 License

Private — all rights reserved.
