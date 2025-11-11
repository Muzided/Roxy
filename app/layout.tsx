import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { LenisProvider } from "@/components/lenis-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Roxy – Stories, Projects & Impact",
  description:
    "A community-run center dedicated to transparency, collaboration, and creative impact. Explore our projects and join our mission.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: "Roxy – Stories, Projects & Impact",
    description: "A community-run center dedicated to transparency, collaboration, and creative impact.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  )
}
