
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when using our services, including:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Name and contact information</li>
              <li>Profile information</li>
              <li>Communications and interactions within our community</li>
              <li>Information about your participation in events and programs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about events and updates</li>
              <li>Facilitate community interactions</li>
              <li>Analyze and improve our platform&apos;s performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Other community members (based on your privacy settings)</li>
              <li>Service providers who assist in our operations</li>
              <li>When required by law or to protect rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain data collection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          </section>
        </div>
      </main>
    </div>
  )
} 