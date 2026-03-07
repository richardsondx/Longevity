import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Longevity - Your Personal Health Optimization Platform",
  description:
    "Transform your blood biomarkers into actionable insights. Calculate your biological age, get personalized coaching, and optimize your healthspan.",
  keywords: ["health tracking", "biomarkers", "biological age", "wellness", "longevity", "blood work analysis"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
