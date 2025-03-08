import type React from "react"
import type { Metadata } from "next"
import { Cabin } from "next/font/google"
import "./globals.css"

const cabin = Cabin({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KYCombinator - Building the Kentucky of Tomorrow",
  description: "We're creating the highest density of ambitious, high-velocity founders and builders in Kentucky.",
  openGraph: {
    images: ['werise1.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        {children}
      </body>
    </html>
  )
}

