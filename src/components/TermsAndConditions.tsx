import React from "react"

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-center mb-8 font-digital">
          Terms and Conditions
        </h1>

        <div className="bg-black/40 p-6 rounded-lg border border-[#ff3e3e]/20 space-y-6">
          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By accessing or using Our New Agents, you agree to be bound by
              these Terms and Conditions. If you disagree with any part of these
              terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              2. Service Description
            </h2>
            <p className="text-gray-300">
              Our New Agents is an entertainment service that provides
              AI-powered roast calls. The service is intended for entertainment
              purposes only and should not be used for harassment, bullying, or
              any malicious intent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              3. User Responsibilities
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>Users must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Be at least 18 years old to use the service</li>
                <li>
                  Obtain consent from call recipients before initiating calls
                </li>
                <li>Not use the service for harassment or harmful purposes</li>
                <li>
                  Not attempt to bypass security measures or payment systems
                </li>
                <li>Not share or resell recordings without authorization</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              4. Payment and Refunds
            </h2>
            <div className="text-gray-300 space-y-2">
              <p>By purchasing call recordings, you agree that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  All payments are processed through secure third-party payment
                  processors
                </li>
                <li>Payments are non-refundable unless required by law</li>
                <li>Prices are subject to change without notice</li>
                <li>You are responsible for any applicable taxes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-gray-300">
              All content, features, and functionality of Our New Agents,
              including but not limited to text, graphics, logos, and audio
              recordings, are owned by Our New Agents and are protected by
              international copyright, trademark, and other intellectual
              property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-300">
              Our New Agents and its operators shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              7. Service Modifications
            </h2>
            <p className="text-gray-300">
              We reserve the right to modify, suspend, or discontinue any part
              of the service at any time without notice. We may also restrict
              access to parts or all of the service without notice or liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              8. Termination
            </h2>
            <p className="text-gray-300">
              We may terminate or suspend your access to the service
              immediately, without prior notice, for conduct that we believe
              violates these Terms or is harmful to other users, us, or third
              parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              9. Governing Law
            </h2>
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-digital text-[#ff3e3e] mb-3">
              10. Contact Information
            </h2>
            <p className="text-gray-300">
              For any questions about these Terms, please contact us through our
              official Telegram channel @Sidharth_n.
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

export default TermsAndConditions
