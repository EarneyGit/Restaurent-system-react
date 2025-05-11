"use client"

import React, { useState } from 'react'
import PageLayout from '@/components/layout/page-layout'
import { Pencil, Trash, Plus } from 'lucide-react'

export default function PaymentPayloadsPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  
  // Mock data for payment payloads
  const [payloads, setPayloads] = useState([
    { id: '6', title: 'Cash' }
  ])

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const toggleAllSelection = () => {
    if (selectedRows.length === payloads.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(payloads.map(payload => payload.id))
    }
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Payment payloads</h1>
          <button 
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            <span>Add payment payload</span>
          </button>
        </div>

        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-end">
            <button 
              className={`text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50 ${
                selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={selectedRows.length === 0}
            >
              Delete selection
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      checked={selectedRows.length === payloads.length && payloads.length > 0}
                      onChange={toggleAllSelection}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payloads.map((payload) => (
                  <tr key={payload.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        checked={selectedRows.includes(payload.id)}
                        onChange={() => toggleRowSelection(payload.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payload.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payload.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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