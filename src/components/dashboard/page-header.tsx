"use client"

import React, { useRef, useState, useEffect } from 'react'
import { BellIcon, MoonIcon, EditIcon, LogOutIcon } from 'lucide-react'
import { handleSignOut } from '@/app/actions/auth-actions'

function PageHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b">
      <div>
        <h1 className="text-2xl font-semibold">Restaurant Dashboard</h1>
        <p className="text-gray-600 text-sm">Monitor your business performance and data</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <MoonIcon className="h-5 w-5 text-gray-700" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
          <BellIcon className="h-5 w-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-1">
          <span className="font-medium text-sm">EN</span>
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white overflow-hidden">
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=ffffff"
                alt="Admin User"
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2 px-3 border-b border-gray-100">
                <div className="text-gray-700 text-sm font-medium">Owner Githubit</div>
                <div className="text-gray-500 text-sm">Admin</div>
              </div>
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit profile
                </button>
                <form action={handleSignOut}>
                  <button 
                    type="submit" 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader 