"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Sidebar from "@/components/layout/sidebar"
import { BranchSidebar } from "@/components/layout/sidebar-branch"
import PageHeader from "@/components/dashboard/page-header"

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  
  // Check if current path is login or forgot-password page
  const isAuthPage = pathname === "/login" || pathname === "/forgot-password"
  
  useEffect(() => {
    // Improved cookie parsing function
    function getUserRole() {
      try {
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=')
          
          if (name === 'user-role') {
            return value
          }
        }
        return null // Return null by default so we can show a loading state
      } catch (error) {
        console.error('Error checking role cookie:', error)
        return null
      }
    }
    
    const role = getUserRole()
    console.log('Current user role:', role)
    setUserRole(role)
    
    // Add a cookie change listener
    const checkCookieChange = setInterval(() => {
      const currentRole = getUserRole()
      if (currentRole !== userRole) {
        console.log('Role changed from', userRole, 'to', currentRole)
        setUserRole(currentRole)
      }
    }, 1000) // Check every second
    
    return () => {
      clearInterval(checkCookieChange)
    }
  }, [userRole]) // Re-run when userRole changes
  
  if (isAuthPage) {
    return children
  }
  
  if (userRole === null) {
    // Show a loading state or redirect to login
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  // For authenticated pages, show sidebar and header based on role
  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-screen overflow-hidden border-r bg-white">
        {userRole === 'branch' ? <BranchSidebar /> : <Sidebar />}
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