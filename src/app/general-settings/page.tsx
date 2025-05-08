"use client"

import PageLayout from "@/components/layout/page-layout"
import { InfoIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function GeneralSettingsPage() {
  const [logoImage, setLogoImage] = useState<File | null>(null)
  const [darkLogoImage, setDarkLogoImage] = useState<File | null>(null)
  const [faviconImage, setFaviconImage] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [darkLogoPreview, setDarkLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)
  
  const handleLogoUpdate = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        const file = files[0]
        setLogoImage(file)
        
        // Create image preview
        const reader = new FileReader()
        reader.onload = () => {
          setLogoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }
  
  const handleDarkLogoUpdate = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        const file = files[0]
        setDarkLogoImage(file)
        
        // Create image preview
        const reader = new FileReader()
        reader.onload = () => {
          setDarkLogoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }
  
  const handleFaviconUpdate = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        const file = files[0]
        setFaviconImage(file)
        
        // Create image preview
        const reader = new FileReader()
        reader.onload = () => {
          setFaviconPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }
  
  const handleLogoRemove = () => {
    setLogoImage(null)
    setLogoPreview(null)
  }
  
  const handleDarkLogoRemove = () => {
    setDarkLogoImage(null)
    setDarkLogoPreview(null)
  }
  
  const handleFaviconRemove = () => {
    setFaviconImage(null)
    setFaviconPreview(null)
  }

  return (
    <PageLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">General settings</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Settings Sidebar */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 border-r">
              <div className="py-4 px-4 font-medium text-gray-700 border-b">Settings</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">Location</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">Default delivery zone</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">Permission</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">Auth settings</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">Reservation</div>
              <div className="py-3 px-4 border-b hover:bg-gray-50">QR-code</div>
              <div className="py-3 px-4 hover:bg-gray-50">Footer</div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-6">
              {/* Title Input */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Title</label>
                <input 
                  type="text" 
                  defaultValue="Restroman UK" 
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Payment Type Select */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block text-sm">
                    <span className="text-red-500 mr-1">*</span>
                    Payment type
                  </label>
                </div>
                <div className="relative">
                  <select className="w-full p-2 border rounded-md appearance-none pr-10">
                    <option>Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hour Format Select */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block text-sm">Hour format</label>
                </div>
                <div className="relative">
                  <select className="w-full p-2 border rounded-md appearance-none pr-10">
                    <option>24 hour</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Logo Upload Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Favicon */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-sm">
                      <span className="text-red-500 mr-1">*</span>
                      Favicon
                    </label>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                          {faviconPreview ? (
                            <img 
                              src={faviconPreview} 
                              alt="Favicon preview" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full">
                        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-red-600 hover:bg-red-50 flex-1"
                          onClick={handleFaviconRemove}>
                          Remove
                        </button>
                        <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex-1"
                          onClick={handleFaviconUpdate}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Logo */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-sm">
                      <span className="text-red-500 mr-1">*</span>
                      Logo
                    </label>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <div className="flex items-center h-10">
                          {logoPreview ? (
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="h-10 object-contain" 
                            />
                          ) : (
                            <>
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                </svg>
                              </div>
                              <span className="font-bold text-lg">foodyman</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full">
                        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-red-600 hover:bg-red-50 flex-1"
                          onClick={handleLogoRemove}>
                          Remove
                        </button>
                        <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex-1"
                          onClick={handleLogoUpdate}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Logo for dark mode */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-sm">
                      <span className="text-red-500 mr-1">*</span>
                      Logo for dark mode
                    </label>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <div className="flex items-center h-10">
                          {darkLogoPreview ? (
                            <img 
                              src={darkLogoPreview} 
                              alt="Dark logo preview" 
                              className="h-10 object-contain" 
                            />
                          ) : (
                            <>
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                </svg>
                              </div>
                              <span className="font-bold text-lg text-white bg-gray-800 px-2">foodyman</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full">
                        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-red-600 hover:bg-red-50 flex-1"
                          onClick={handleDarkLogoRemove}>
                          Remove
                        </button>
                        <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex-1"
                          onClick={handleDarkLogoUpdate}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Deliveryman order acceptance time */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-sm">Deliveryman order acceptance time</label>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    defaultValue="5" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                {/* Recommended count */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="block text-sm">Recommended count</label>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    defaultValue="1" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => {
                    // Create formData and upload images to server
                    const formData = new FormData();
                    if (logoImage) formData.append('logo', logoImage);
                    if (darkLogoImage) formData.append('darkLogo', darkLogoImage);
                    if (faviconImage) formData.append('favicon', faviconImage);
                    
                    // Add other form data
                    // formData.append('title', title);
                    // etc.
                    
                    // Here you would typically send the formData to your API
                    console.log('Saving settings...');
                    alert('Settings saved successfully!');
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-center text-gray-500 my-6">
          <span>Restroman UK support team </span>
          <a href="#" className="text-blue-500">123456789</a>
        </div>
      </div>
    </PageLayout>
  )
} 