"use client"

import React, { useState } from 'react'
import PageLayout from '@/components/layout/page-layout'
import { Pencil } from 'lucide-react'

export default function MyBranchPage() {
  const [isOpen, setIsOpen] = useState(true)
  
  const branchData = {
    name: "Central Branch",
    address: "Carl-Wery-Straße 63, 81739 München, Германия",
    phone: "123456789",
    tax: "1",
    wallet: "$0.00"
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My restaurant</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Pencil className="h-4 w-4" />
            <span>Restaurant edit</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Restaurant Name */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Restaurant name</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                {branchData.name}
              </div>
            </div>

            {/* Restaurant Address */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Restaurant address</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                {branchData.address}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Phone</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                {branchData.phone}
              </div>
            </div>

            {/* Tax */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Tax</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                {branchData.tax}
              </div>
            </div>

            {/* Background Image */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Background image</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 h-40">
                <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm">Restaurant Interior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Image */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Logo image</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 h-40">
                <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm">Restaurant Logo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Status */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Open</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isOpen}
                    onChange={() => setIsOpen(!isOpen)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Wallet */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Wallet</div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                {branchData.wallet}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-8">
          <span>Restroman support team</span>
          <a href="tel:123456789" className="text-blue-500 ml-2">123456789</a>
        </div>
      </div>
    </PageLayout>
  )
} 