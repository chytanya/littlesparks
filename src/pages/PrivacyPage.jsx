import SEOHead from '../components/SEOHead'

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="LittleSparks Prints privacy policy — how we collect, use, and protect your information."
        canonical="/privacy"
      />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-fredoka text-4xl text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">1. Information We Collect</h2>
            <p>We collect only the minimum information necessary to process your order and deliver your product:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Email address</strong> — to deliver your PDF and send order confirmation.</li>
              <li><strong>Child's first name</strong> — solely to personalize your printable PDF.</li>
              <li><strong>Payment information</strong> — handled entirely by Stripe. We never see or store your card details.</li>
              <li><strong>Basic analytics</strong> — anonymous page view data to understand which products are popular.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To generate and deliver your personalized PDF.</li>
              <li>To send your order confirmation and download link.</li>
              <li>To respond to support requests if you contact us.</li>
              <li>To improve our products and website experience.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">3. No Account Required</h2>
            <p>We do not require you to create an account. Your email is used only for order delivery and is not used to create a persistent user profile.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">4. Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Stripe</strong> — processes payments securely. Subject to <a href="https://stripe.com/privacy" className="text-candy-pink hover:underline" target="_blank" rel="noopener">Stripe's Privacy Policy</a>.</li>
              <li><strong>SendGrid</strong> — delivers transactional emails. Subject to <a href="https://sendgrid.com/policies/privacy/" className="text-candy-pink hover:underline" target="_blank" rel="noopener">SendGrid's Privacy Policy</a>.</li>
              <li><strong>Netlify</strong> — hosts our website. Subject to <a href="https://www.netlify.com/privacy/" className="text-candy-pink hover:underline" target="_blank" rel="noopener">Netlify's Privacy Policy</a>.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">5. Children's Privacy</h2>
            <p>Our service is directed at parents and guardians, not directly at children. We only collect a child's first name for personalization purposes. We do not knowingly collect any other personal information about children under 13.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">6. Data Retention</h2>
            <p>Order records (email, product, child name) are retained for up to 30 days to enable re-delivery of PDFs if needed, then deleted. Payment records are retained by Stripe per their policies.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">7. Your Rights</h2>
            <p>You may request deletion of your order data at any time by emailing <a href="mailto:hello@littlesparks.com" className="text-candy-pink hover:underline">hello@littlesparks.com</a>. We'll confirm deletion within 5 business days.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">8. Cookies</h2>
            <p>We use minimal session cookies required for checkout functionality. We do not use tracking or advertising cookies.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">9. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:hello@littlesparks.com" className="text-candy-pink hover:underline">hello@littlesparks.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
