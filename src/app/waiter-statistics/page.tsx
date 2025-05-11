"use client"

import React, { useState } from 'react'
import PageLayout from '@/components/layout/page-layout'
import { CalendarIcon, Search } from 'lucide-react'

export default function WaiterStatisticsPage() {
  const [dateRange, setDateRange] = useState({
    start: '2023-05-10',
    end: '2023-05-10'
  })
  
  const [searchTerm, setSearchTerm] = useState('')

  // Mock waiter statistics data
  const waiterData = {
    summary: {
      totalWaiters: 5,
      activeWaiters: 4,
      totalTips: 523.45,
      averageRating: 4.7
    },
    topPerformers: [
      { id: 1, name: 'John Smith', ordersServed: 34, tips: 157.25, rating: 4.9 },
      { id: 2, name: 'Maria Garcia', ordersServed: 29, tips: 134.50, rating: 4.8 },
      { id: 3, name: 'David Kim', ordersServed: 26, tips: 112.30, rating: 4.6 }
    ],
    waiters: [
      { id: 1, name: 'John Smith', ordersServed: 34, tips: 157.25, rating: 4.9, status: 'active' },
      { id: 2, name: 'Maria Garcia', ordersServed: 29, tips: 134.50, rating: 4.8, status: 'active' },
      { id: 3, name: 'David Kim', ordersServed: 26, tips: 112.30, rating: 4.6, status: 'active' },
      { id: 4, name: 'Sarah Johnson', ordersServed: 22, tips: 98.40, rating: 4.5, status: 'active' },
      { id: 5, name: 'Michael Chen', ordersServed: 0, tips: 0, rating: 0, status: 'inactive' }
    ],
    recentActivity: [
      { waiterId: 1, waiterName: 'John Smith', orderId: '1086', tableId: 'T12', amount: 72.50, tip: 14.50, time: '14:25' },
      { waiterId: 2, waiterName: 'Maria Garcia', orderId: '1085', tableId: 'T08', amount: 95.20, tip: 19.00, time: '14:10' },
      { waiterId: 3, waiterName: 'David Kim', orderId: '1084', tableId: 'T15', amount: 42.30, tip: 8.50, time: '13:55' },
      { waiterId: 1, waiterName: 'John Smith', orderId: '1083', tableId: 'T07', amount: 68.75, tip: 13.75, time: '13:40' },
      { waiterId: 4, waiterName: 'Sarah Johnson', orderId: '1082', tableId: 'T03', amount: 51.20, tip: 10.25, time: '13:25' },
      { waiterId: 2, waiterName: 'Maria Garcia', orderId: '1081', tableId: 'T09', amount: 83.60, tip: 16.70, time: '13:10' }
    ]
  }

  // Format numbers with commas and fixed decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  // Filter waiters based on search term
  const filteredWaiters = waiterData.waiters.filter(waiter => 
    waiter.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Waiter Statistics</h1>
          <div className="flex items-center space-x-1 text-sm bg-white p-2 border rounded">
            <span>Date Range:</span>
            <div className="flex items-center space-x-2 ml-4">
              <div className="px-3 py-1 border rounded text-gray-600">
                {dateRange.start}
              </div>
              <span>—</span>
              <div className="px-3 py-1 border rounded text-gray-600">
                {dateRange.end}
              </div>
              <CalendarIcon className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <section>
          <h2 className="text-lg font-medium mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Total Waiters */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">{waiterData.summary.totalWaiters}</div>
                <div className="text-gray-500 mt-4">Total Waiters</div>
              </div>
            </div>

            {/* Active Waiters */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">{waiterData.summary.activeWaiters}</div>
                <div className="text-gray-500 mt-4">Active Waiters</div>
              </div>
            </div>

            {/* Total Tips */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(waiterData.summary.totalTips)}</div>
                <div className="text-gray-500 mt-4">Total Tips</div>
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">{waiterData.summary.averageRating.toFixed(1)}</div>
                <div className="text-gray-500 mt-4">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Performers */}
        <section>
          <h2 className="text-lg font-medium mb-4">Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {waiterData.topPerformers.map((waiter, index) => (
              <div key={index} className="bg-white rounded-md p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-4">
                    {waiter.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{waiter.name}</div>
                    <div className="text-sm text-gray-500">#{index + 1} Top Performer</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-semibold">{waiter.ordersServed}</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">$ {formatCurrency(waiter.tips)}</div>
                    <div className="text-xs text-gray-500">Tips</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{waiter.rating.toFixed(1)}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Waiter List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">All Waiters</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search waiters..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders Served
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tips Earned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWaiters.map((waiter) => (
                    <tr key={waiter.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-3">
                            {waiter.name.charAt(0)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{waiter.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {waiter.ordersServed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $ {formatCurrency(waiter.tips)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {waiter.rating > 0 ? (
                            <>
                              <span className="mr-2">{waiter.rating.toFixed(1)}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(waiter.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400">Not rated</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          waiter.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {waiter.status.charAt(0).toUpperCase() + waiter.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waiter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Table
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tip
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {waiterData.recentActivity.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-2 text-xs">
                            {activity.waiterName.charAt(0)}
                          </div>
                          <div className="text-sm text-gray-900">{activity.waiterName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{activity.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.tableId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $ {formatCurrency(activity.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $ {formatCurrency(activity.tip)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <div className="flex items-center text-sm text-gray-500 mt-8">
          <span>Restroman support team</span>
          <a href="tel:123456789" className="text-blue-500 ml-2">123456789</a>
        </div>
      </div>
    </PageLayout>
  )
} 