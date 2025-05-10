import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthWrapper from "@/components/layout/auth-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restroman UK Restaurant Dashboard",
  description: "Restaurant management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  )
} 