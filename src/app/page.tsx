import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-900 text-white">
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
    </div>
  );
}