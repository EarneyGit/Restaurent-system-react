import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/layout/sidebar"
import PageHeader from "@/components/dashboard/page-header"

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
        <main className="flex min-h-screen bg-gray-50">
          <div className="w-64 fixed h-screen overflow-hidden border-r bg-white">
            <Sidebar />
          </div>
          <div className="flex-1 ml-64 flex flex-col">
            <PageHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
} 