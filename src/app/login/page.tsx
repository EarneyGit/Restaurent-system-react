"use client"

import { handleLogin } from "@/app/actions/auth-actions"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Separate client component for image with error handling
function LogoImage() {
  const [imgError, setImgError] = useState(false)
  
  if (imgError) {
    return (
      <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xl">🍽️</span>
      </div>
    )
  }
  
  return (
    <Image 
      src="/logo.png" 
      alt="Restaurant Logo" 
      width={80} 
      height={80}
      className="h-20 w-auto"
      onError={() => setImgError(true)}
    />
  )
}

export default function LoginPage({
  searchParams
}: {
  searchParams?: { callbackUrl?: string; error?: string }
}) {
  const callbackUrl = searchParams?.callbackUrl || "/"
  const error = searchParams?.error || ""

  const errorMessages = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    InvalidCredentials: "Please provide a valid email and password.",
    unknown: "An unexpected error occurred. Please try again.",
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <LogoImage />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Restaurant Management System
        </h1>
        <p className="text-gray-600 mt-2">
          Sign in to your dashboard
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-medium">Authentication Error</p>
          <p>
            {errorMessages[error as keyof typeof errorMessages] || errorMessages.unknown}
          </p>
        </div>
      )}
      
      <form action={handleLogin} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password" 
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p className="font-medium mb-2">Demo Credentials</p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-semibold text-blue-600">Admin</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-semibold text-green-600">Branch</p>
            <p>Email: branch@example.com</p>
            <p>Password: branch123</p>
          </div>
        </div>
      </div>
    </div>
  )
} 