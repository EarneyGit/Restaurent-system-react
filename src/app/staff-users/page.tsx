"use client"

import React, { useState } from 'react'
import PageLayout from '@/components/layout/page-layout'
import { Search, PlusCircle, Edit, Trash, Eye, MessageCircle } from 'lucide-react'

interface StaffMember {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function StaffUsersPage() {
  const [activeTab, setActiveTab] = useState('user')
  const [staffData, setStaffData] = useState<StaffMember[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Tab options
  const tabs = [
    { id: 'user', label: 'User' },
    { id: 'moderator', label: 'Moderator' },
    { id: 'cook', label: 'Cook' },
    { id: 'waiter', label: 'Waiter' },
    { id: 'deliveryman', label: 'Deliveryman' },
  ]

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Branch users</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white rounded-t-md'
                    : 'text-gray-700 hover:text-gray-800 hover:bg-gray-100 rounded-t-md'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <PlusCircle className="h-5 w-5" />
                <span>Add staff</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffData.length > 0 ? (
                  staffData.map((staff, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-green-500 hover:text-green-700">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash className="h-5 w-5" />
                        </button>
                        <button className="text-yellow-500 hover:text-yellow-700">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No Data</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination could go here */}
          <div className="py-4">
            <div className="h-1 bg-gray-200 rounded-full w-full"></div>
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