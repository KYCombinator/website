import { Download } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Brand Assets
        </h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            These brand assets are provided for use in accordance with our brand
            guidelines. By downloading and using these assets, you agree to use
            them only for purposes related to KYCombinator and not to modify or
            alter them in any way. For questions about usage, please contact our
            team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.name}
              className="bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <div className="aspect-square relative mb-2 bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={asset.previewUrl}
                  alt={asset.name}
                  fill
                  className="object-contain p-2"
                  style={{ backgroundColor: asset.backgroundColor }}
                />
              </div>

              <h2 className="text-base font-semibold text-gray-800 mb-1">
                {asset.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{asset.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{asset.dimensions}</span>
                <span>{asset.format}</span>
              </div>

              <a
                href={asset.downloadUrl}
                download
                className="flex items-center justify-center gap-1 bg-purple-700 text-white px-3 py-1.5 rounded-md hover:bg-purple-800 transition text-sm"
              >
                <Download className="w-3 h-3" />
                Download
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
