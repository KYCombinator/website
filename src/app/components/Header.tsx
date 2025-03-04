import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="KYCombinator Logo"
            width={200}
            height={50}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  )
} 