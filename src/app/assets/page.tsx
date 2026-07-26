import { Download } from "lucide-react";
import Image from "next/image";
import { Container, PageHero, Eyebrow } from "@/app/components/fm";

const assets = [
  {
    name: "KY Logo (Full)",
    description: "Primary logo with purple background",
    previewUrl: "/assets/purple.png",
    downloadUrl: "/assets/purple.png",
    dimensions: "2048x715",
    format: "png",
  },
  {
    name: "KY Logo (White)",
    description: "Primary logo in white on purple background",
    previewUrl: "/assets/White_w_Purple.png",
    downloadUrl: "/assets/White_w_Purple.png",
    dimensions: "2048x715",
    backgroundColor: "#000",
    format: "png",
  },
  {
    name: "KY Logo (Black)",
    description: "Black logo for dark backgrounds",
    previewUrl: "/assets/Black.png",
    downloadUrl: "/assets/Black.png",
    dimensions: "2048x715",
    format: "png",
  },
  {
    name: "KY Logo Square",
    description: "Square Logo",
    previewUrl: "/assets/Square Logo.png",
    downloadUrl: "/assets/Square Logo.png",
    dimensions: "500x500",
    format: "png",
  },
];

export default function AssetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand"
        title="Brand assets."
        intro="Logos and marks for using the KYCombinator brand. Download the files you need — please keep them intact and unmodified."
      />

      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <p className="mb-10 max-w-[720px] border-l-2 border-[var(--kyx-purple)] pl-5 text-[15px] leading-[1.65] text-[#4a443a]">
            These brand assets are provided for use in accordance with our brand
            guidelines. By downloading and using these assets, you agree to use
            them only for purposes related to KYCombinator and not to modify or
            alter them in any way. For questions about usage, please contact our
            team.
          </p>

          <Eyebrow className="mb-6">Downloads</Eyebrow>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
            {assets.map((asset) => (
              <div
                key={asset.name}
                className="flex flex-col border border-[#d8d2c5] p-4"
              >
                <div className="relative mb-4 aspect-square overflow-hidden border border-[#d8d2c5] bg-white">
                  <Image
                    src={asset.previewUrl}
                    alt={asset.name}
                    fill
                    className="object-contain p-2"
                    style={{ backgroundColor: asset.backgroundColor }}
                  />
                </div>

                <h2 className="mb-1 text-[15px] font-medium text-[#16130f]">
                  {asset.name}
                </h2>
                <p className="mb-3 text-[14px] leading-[1.5] text-[#4a443a]">
                  {asset.description}
                </p>

                <div className="mb-4 flex items-center justify-between font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                  <span>{asset.dimensions}</span>
                  <span>{asset.format}</span>
                </div>

                <a
                  href={asset.downloadUrl}
                  download
                  className="mt-auto inline-flex items-center justify-center gap-1.5 bg-[#16130f] px-4 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
