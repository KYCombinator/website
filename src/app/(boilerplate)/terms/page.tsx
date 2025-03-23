export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Terms of Service</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using KYC&apos;s services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access our services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Services</h2>
            <p>Our services are provided for building and supporting the Kentucky startup ecosystem. You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are owned by KYC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Contributions</h2>
            <p>Any content you contribute to our community must be accurate, lawful, and not violate the rights of any third party. We reserve the right to remove any content that violates these terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Termination</h2>
            <p>We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us.</p>
          </section>
        </div>
      </main>
    </div>
  )
} 