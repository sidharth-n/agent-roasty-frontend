import React from "react"

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-center mb-8 font-digital">
          Privacy Policy
        </h1>

        <div className="bg-black/40 p-6 rounded-lg border border-[#ff3e3e]/20 space-y-6">
          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              1. Information We Collect
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Phone numbers provided for call services</li>
                <li>Call recordings and transcripts</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>Usage data and analytics</li>
                <li>Device information and IP addresses</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              2. How We Use Your Information
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>Your information is used for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Providing and maintaining our service</li>
                <li>Processing payments and transactions</li>
                <li>Improving and personalizing user experience</li>
                <li>Communicating service updates</li>
                <li>Ensuring compliance with our terms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              3. Data Storage and Security
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>We implement robust security measures:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Call recordings are stored securely and encrypted</li>
                <li>
                  Recordings are automatically deleted after 24 hours unless
                  purchased
                </li>
                <li>Payment data is handled by certified payment processors</li>
                <li>Regular security audits and updates</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              4. Data Sharing
            </h2>
            <p className="text-gray-300">
              We do not sell or share your personal information with third
              parties except as necessary to provide our services (e.g., payment
              processing, cloud storage). We may share anonymized, aggregated
              data for analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              5. User Rights
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request your call recordings</li>
                <li>Lodge complaints with relevant authorities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to improve user
              experience and collect usage data. You can control cookie settings
              through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              7. Children's Privacy
            </h2>
            <p className="text-gray-300">
              Our service is not intended for users under 18 years of age. We do
              not knowingly collect or maintain information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              8. International Data Transfers
            </h2>
            <p className="text-gray-300">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              9. Changes to Privacy Policy
            </h2>
            <p className="text-gray-300">
              We may update this privacy policy periodically. We will notify
              users of any material changes through our service or via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              10. Contact Us
            </h2>
            <p className="text-gray-300">
              For privacy-related concerns or requests, please contact us
              through our official Telegram channel @Sidharth_n.
            </p>
          </section>

          <div className="text-xs text-gray-400 mt-8 pt-4 border-t border-[#ff3e3e]/20">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
