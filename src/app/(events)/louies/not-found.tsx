import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Oops! Did Someone Say Party?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Well, this is awkward... Looks like you&apos;re trying to crash a party that doesn&apos;t exist! 
          Did you time travel to the wrong year? Or maybe you&apos;ve had one too many Kentucky bourbons? 
          Don&apos;t worry, we won&apos;t tell anyone - let&apos;s get you to the right celebration! 🥃
        </p>
        <Link 
          href="/louies/2025" 
          className="inline-block bg-[#6B46C1] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#5B3AA8] transition"
        >
          Take Me to the Real Party! 🎉
        </Link>
      </div>
    </div>
  );
} 