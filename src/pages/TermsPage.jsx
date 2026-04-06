import SEOHead from '../components/SEOHead'

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="LittleSparks Prints terms of service — your rights and our policies for digital printable purchases."
        canonical="/terms"
      />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-fredoka text-4xl text-gray-800 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">1. Products & Digital Delivery</h2>
            <p>LittleSparks Prints sells digital printable products (PDF files). Upon successful payment, you will receive an email containing a link to download your personalized PDF. Downloads are delivered automatically — typically within 1–2 minutes of payment.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">2. License & Permitted Use</h2>
            <p>When you purchase a product, you receive a <strong>personal, non-commercial license</strong> to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Print the PDF for personal or classroom use, unlimited times.</li>
              <li>Use the printed product for personal, educational, or gift purposes.</li>
            </ul>
            <p className="mt-3">You may <strong>not</strong>:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Resell, redistribute, or share the digital PDF files.</li>
              <li>Use the files for commercial printing or resale of physical copies.</li>
              <li>Upload or share the files on any website, file-sharing service, or marketplace.</li>
              <li>Claim the designs as your own or remove branding.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">3. Refund Policy</h2>
            <p>We offer a <strong>7-day happiness guarantee</strong>. If you are not satisfied with your purchase for any reason, email us at <a href="mailto:hello@littlesparks.com" className="text-candy-pink hover:underline">hello@littlesparks.com</a> within 7 days of purchase and we will issue a full refund.</p>
            <p className="mt-2">Because our products are digital downloads, refunds are handled on a trust basis — we will not ask you to "return" a digital file. We simply ask that you delete the file upon refund.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">4. Personalization Errors</h2>
            <p>If there is a spelling error in the child's name that you entered at checkout, email us within 24 hours and we'll send you a corrected version at no charge. Please double-check the name before completing your purchase.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">5. Payments</h2>
            <p>All payments are processed by Stripe. LittleSparks Prints does not store or have access to your payment card information. All prices are in USD. All sales are final after the 7-day refund window.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">6. No Warranties</h2>
            <p>Products are provided "as is." While we strive for the highest quality, we make no warranties about the educational outcomes or specific printing results of our products.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">7. Limitation of Liability</h2>
            <p>LittleSparks Prints' total liability for any claim arising from a purchase shall not exceed the amount you paid for that specific product.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">8. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          </div>

          <div>
            <h2 className="font-fredoka text-2xl text-gray-800 mb-3">9. Contact</h2>
            <p>Questions? Email <a href="mailto:hello@littlesparks.com" className="text-candy-pink hover:underline">hello@littlesparks.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
