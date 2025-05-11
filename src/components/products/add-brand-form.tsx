"use client"

import React, { useState, useRef, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import PageLayout from "@/components/layout/page-layout"
import { Upload, ImagePlus, X } from "lucide-react"

export default function AddBrandForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send data to your API
    console.log({
      title,
      isActive,
      image: previewImage
    })
    
    // Navigate back to brands list
    router.push("/brands")
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Add brand</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter brand name"
                  required
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                
                {previewImage ? (
                  <div className="relative w-64 h-64 border border-gray-300 rounded-md overflow-hidden">
                    <img 
                      src={previewImage}
                      alt="Brand preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <div className="p-4 rounded-full bg-blue-50">
                      <ImagePlus className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Upload</p>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              
              <div>
                <label htmlFor="active" className="block text-sm font-medium text-gray-700 mb-1">
                  Active
                </label>
                <label className="inline-flex items-center">
                  <div className={`relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
                    <input
                      type="checkbox"
                      id="active"
                      checked={isActive}
                      onChange={() => setIsActive(!isActive)}
                      className="opacity-0 w-0 h-0"
                    />
                    <span 
                      className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${isActive ? 'transform translate-x-5' : ''}`}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  )
} 