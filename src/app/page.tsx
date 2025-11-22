import Image from "next/image";
import Link from "next/link";
import EventBanner from "./components/EventBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-900 text-white">
      <EventBanner />
      {/* Hero Section */}
      <section className="relative min-h-screen h-[500px] flex justify-center bg-background-900 text-white">
        <div className="container mx-auto text-center h-full">
          <div className="bg-background-900 rounded-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYX"
              width={360}
              height={123}
              className="mx-auto w-auto h-[400px]"
              priority
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-8">
            Louisville, KY
          </h3>
        </div>
      </section>

      {/* Events Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            December 4th, 2024
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Join us for Velocity and The LOUIES
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/events/velocityfinale"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Learn More About Velocity
            </Link>
            <Link
              href="/events/louies/2025"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Learn More About The LOUIES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}