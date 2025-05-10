"use client"

import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import PageHeader from "@/components/dashboard/page-header"

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current path is login or forgot-password page
  const isAuthPage = pathname === "/login" || pathname === "/forgot-password"
  
  if (isAuthPage) {
    return children
  }
  
  // For authenticated pages, show sidebar and header
  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-screen overflow-hidden border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 flex flex-col">
        <PageHeader />
        <div className="p-6">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthWrapper 