"use client"

import React, { useRef, useState, useEffect } from 'react'
import { LogOutIcon, EditIcon, BellIcon, X, ChevronDown } from 'lucide-react'
import { handleSignOut } from '@/app/actions/auth-actions'

function PageHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangPopupOpen, setIsLangPopupOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('English')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const langPopupRef = useRef<HTMLDivElement>(null)
  const [userData, setUserData] = useState({
    name: 'Admin User',
    role: 'Administrator',
    image: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=ffffff'
  })

  useEffect(() => {
    // Direct cookie access for role
    function getUserRole() {
      try {
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=')
          
          if (name === 'user-role') {
            return value
          }
        }
        return 'admin' // Default
      } catch (error) {
        console.error('Error checking role cookie:', error)
        return 'admin'
      }
    }
    
    const role = getUserRole()
    console.log('Header user role:', role)
    
    if (role === 'branch') {
      setUserData({
        name: 'Branch Manager',
        role: 'Branch User',
        image: 'https://ui-avatars.com/api/?name=Branch+Manager&background=4f46e5&color=ffffff'
      })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (langPopupRef.current && !langPopupRef.current.contains(event.target as Node) && isLangPopupOpen) {
        setIsLangPopupOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangPopupOpen])

  return (
    <div className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b">
      <div>
        <h1 className="text-2xl font-semibold">Restaurant Dashboard</h1>
        <p className="text-gray-600 text-sm">Monitor your business performance and data</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
          <BellIcon className="h-5 w-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsLangPopupOpen(true)} 
            className="flex items-center space-x-2 border border-gray-200 rounded px-3 py-1 hover:bg-gray-100"
          >
            <span className="font-medium text-sm">EN</span>
          </button>
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="text-right">
              <p className="text-sm font-medium">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.role}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white overflow-hidden">
              <img 
                src={userData.image}
                alt={userData.name}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2 px-3 border-b border-gray-100">
                <div className="text-gray-700 text-sm font-medium">{userData.name}</div>
                <div className="text-gray-500 text-sm">{userData.role}</div>
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
      
      {/* Language Selection Popup */}
      {isLangPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div 
            ref={langPopupRef}
            className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Change language</h2>
              <button 
                onClick={() => setIsLangPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Language</p>
              <div className="relative w-full">
                <div className="relative w-full border border-gray-300 rounded-md">
                  <div className="flex items-center justify-between w-full px-4 py-2.5 cursor-pointer">
                    <span>{selectedLang}</span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsLangPopupOpen(false)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsLangPopupOpen(false)}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageHeader 