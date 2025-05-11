"use client"

import React, { useState } from 'react'
import PageLayout from '@/components/layout/page-layout'
import { CalendarIcon } from 'lucide-react'

export default function SalesStatisticsPage() {
  const [dateRange, setDateRange] = useState({
    start: '2023-05-10',
    end: '2023-05-10'
  })

  // Mock sales data
  const salesData = {
    mainCards: {
      revenue: { value: 16.00, percentage: 100 },
      orders: { value: 12311.00, percentage: 100 },
      average: { value: 0.00, percentage: 0 }
    },
    cards: {
      cashPayment: 0.00,
      deliveryFee: 0.00,
      otherPayment: 0.00
    },
    statistics: {
      orderStatus: [
        { name: 'New', value: 12.00, percentage: 63 },
        { name: 'Accepted', value: 4.00, percentage: 21 },
        { name: 'Ready', value: 2.00, percentage: 11 },
        { name: 'On a way', value: 0.00, percentage: 0 },
        { name: 'Delivered', value: 1.00, percentage: 5 },
        { name: 'Canceled', value: 0.00, percentage: 0 }
      ],
      groups: [
        { name: 'group.active', value: 18.00, percentage: 95 },
        { name: 'group.completed', value: 1.00, percentage: 5 },
        { name: 'group.ended', value: 0.00, percentage: 0 }
      ]
    },
    history: [
      { id: '1029', user: 'Owner Githubit', note: 'N/A', totalPrice: 273.00 },
      { id: '1043', user: 'Jamshid James', note: 'N/A', totalPrice: 965.00 },
      { id: '1082', user: 'Bek Nurmukanov', note: 'N/A', totalPrice: 1204.23 },
      { id: '1086', user: 'Bek Nurmukanov', note: 'N/A', totalPrice: 1313.89 },
      { id: '1085', user: 'Jamshid Murzamasulov', note: 'N/A', totalPrice: 1205.81 },
      { id: '1088', user: 'Bek Nurmukanov', note: 'N/A', totalPrice: 1205.28 },
      { id: '1090', user: 'Jamshid Murzamasulov', note: 'N/A', totalPrice: 1313.69 },
      { id: '1099', user: 'Walter Vader', note: 'N/A', totalPrice: 68.95 },
      { id: '1114', user: 'Doniyor Oripov', note: 'N/A', totalPrice: 68.67 },
      { id: '1115', user: 'Doniyor Oripov', note: '', totalPrice: 8.22 }
    ]
  }

  // Format numbers with commas and fixed decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Sales Main Cards */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">sales.main.cards</h2>
            <div className="flex items-center space-x-1 text-sm bg-white p-2 border rounded">
              <span>Month</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Revenue Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.mainCards.revenue.value)}</div>
                <div className="text-green-500 text-sm">+ {salesData.mainCards.revenue.percentage} %</div>
                <div className="text-gray-500 mt-4">Revenue</div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.mainCards.orders.value)}</div>
                <div className="text-green-500 text-sm">+ {salesData.mainCards.orders.percentage} %</div>
                <div className="text-gray-500 mt-4">Orders</div>
              </div>
            </div>

            {/* Average Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.mainCards.average.value)}</div>
                <div className="text-gray-500 text-sm">+ {salesData.mainCards.average.percentage} %</div>
                <div className="text-gray-500 mt-4">Average</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Cards */}
        <section>
          <h2 className="text-lg font-medium mb-4">sales.cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cash Payment Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.cards.cashPayment)}</div>
                <div className="text-gray-500 mt-4">all.cash.payment.orders.sum</div>
              </div>
            </div>

            {/* Delivery Fee Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.cards.deliveryFee)}</div>
                <div className="text-gray-500 mt-4">all.delivery.fee.sum</div>
              </div>
            </div>

            {/* Other Payment Card */}
            <div className="bg-white rounded-md p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800">$ {formatCurrency(salesData.cards.otherPayment)}</div>
                <div className="text-gray-500 mt-4">all.other.payment.orders.sum</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Chart */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">sales.chart</h2>
            <div className="flex items-center space-x-1 text-sm bg-white p-2 border rounded">
              <span>Month</span>
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

          {/* Simple chart representation */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="h-64 flex items-end justify-center space-x-2">
              <div className="relative h-full flex items-end">
                <div className="flex flex-col space-y-2 h-full justify-between absolute -left-10 text-xs text-gray-500">
                  <span>17.40</span>
                  <span>17.20</span>
                  <span>17.00</span>
                  <span>16.80</span>
                  <span>16.60</span>
                  <span>16.40</span>
                  <span>16.20</span>
                  <span>16.00</span>
                  <span>15.80</span>
                  <span>15.60</span>
                  <span>15.40</span>
                  <span>15.20</span>
                </div>
                <div className="flex-1 border-t border-gray-200 h-px self-center"></div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              2023-05-10
            </div>
          </div>
        </section>

        {/* Sales Statistics */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">sales.statistics</h2>
            <div className="flex items-center space-x-1 text-sm bg-white p-2 border rounded">
              <span>Month</span>
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

          {/* Order status statistics */}
          <div className="grid grid-cols-6 gap-4 mb-8">
            {salesData.statistics.orderStatus.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm text-center">
                <div className="text-xl font-semibold text-gray-800">$ {formatCurrency(stat.value)}</div>
                <div className="text-gray-500 text-sm">{stat.percentage} %</div>
                <div className="text-gray-600 mt-4">{stat.name}</div>
              </div>
            ))}
          </div>

          {/* Group statistics */}
          <div className="grid grid-cols-3 gap-4">
            {salesData.statistics.groups.map((group, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm text-center">
                <div className="text-xl font-semibold text-gray-800">$ {formatCurrency(group.value)}</div>
                <div className="text-gray-500 text-sm">{group.percentage} %</div>
                <div className="text-gray-600 mt-4">{group.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sales History */}
        <section>
          <h2 className="text-lg font-medium mb-4">sales.history</h2>
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200">
              <span className="text-gray-600">history</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.history.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button className="flex items-center">
                          <span className="mr-2">+</span>
                          {order.id}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.note}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$ {formatCurrency(order.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center px-4 py-3 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm">1</span>
                <span className="w-8 h-8 flex items-center justify-center text-gray-700 rounded-full text-sm">2</span>
                <span className="w-8 h-8 flex items-center justify-center text-gray-700 rounded-full text-sm">›</span>
              </div>
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