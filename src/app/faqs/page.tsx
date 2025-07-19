import React from 'react'

const page = () => {
  return (
    <section id="faqs" className="py-16 bg-background-900">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-500">
        FAQs
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            How does KYC work?
          </h3>
          <p className="text-gray-600">
            we&apos;re a self-organizing community.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Do I need to be experienced?
          </h3>
          <p className="text-gray-600">
            No, come with a willingness to learn and grow.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            How much does it cost?
          </h3>
          <p className="text-gray-600">just time and effort.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Can I create my own community?
          </h3>
          <p className="text-gray-600">yes</p>
        </div>
      </div>

      <div className="text-center mt-10">
        <button className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition">
          View All FAQs
        </button>
      </div>
    </div>
  </section>
  )
}

export default page