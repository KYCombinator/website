import React from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const page = () => {
  return (
    <section id="events" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4">
          Upcoming Events
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Events are open to all. We encourage you to show up. Vote with
          your feet.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Link
          href="https://lu.ma/kycombinator"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          <span>View All Events</span>
        </Link>
      </div>

      <div className="bg-black rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <iframe
          src="https://lu.ma/embed/calendar/cal-gyukdJFBvrxa0BO/events"
          width="100%"
          height="100%"
          className="min-h-[450px] w-full"
          allowFullScreen={true}
          aria-hidden="false"
        ></iframe>
      </div>
    </div>
  </section>
  )
}

export default page