"use client"

import React, { useState } from 'react'
import { Search, Plus, Filter, Check, MoreHorizontal, Eye, MapPin, Printer, Download, Trash, FileDown } from "lucide-react"
import Link from "next/link"
import { Order } from '@/types'

// Define types for the BoardView props
interface BoardViewProps {
  orders: any[];
  getStatusBadge: (status: string) => JSX.Element;
  getStatusColor: (status: string) => string;
}

// Board view component for Kanban-style order management
function BoardView({ orders, getStatusBadge, getStatusColor }: BoardViewProps) {
  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.orderStatus?.toLowerCase() || 'pending';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {} as Record<string, any[]>);

  // Define status columns to display
  const columns = [
    { id: 'new', label: 'New' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready for Delivery' },
    { id: 'on_the_way', label: 'On the Way' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'canceled', label: 'Canceled' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {columns.map(column => (
        <div key={column.id} className="flex-shrink-0 w-80 bg-gray-50 rounded-lg shadow-sm">
          <div className="p-3 border-b bg-gray-100 rounded-t-lg">
            <h3 className="font-medium text-gray-700">{column.label}</h3>
          </div>
          <div className="p-2 max-h-[calc(100vh-220px)] overflow-y-auto">
            {(groupedOrders[column.id] || []).map((order: any) => (
              <div key={order.id} className="bg-white p-3 rounded-md shadow-sm mb-2 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">Order #{order.id}</span>
                  {getStatusBadge(order.orderStatus || '')}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div>{order.customer}</div>
                  <div>{order.deliveryDate}</div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{order.totalPrice}</span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Eye size={16} className="text-blue-500" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MapPin size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AllOrdersContent() {
  const [viewMode, setViewMode] = useState('list')
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'today', label: 'Today Orders' },
    { id: 'pending', label: 'Pending Orders' },
    { id: 'accepted', label: 'Accepted Orders' },
    { id: 'preparing', label: 'Preparing Orders' },
    { id: 'ready_for_delivery', label: 'Ready for Delivery' },
    { id: 'on_a_way', label: 'On a Way Orders' },
    { id: 'delivered', label: 'Delivered Orders' },
    { id: 'canceled', label: 'Canceled Orders' }
  ]

  // Sample orders data
  const orders = [
    {
      id: 1,
      deliveryDate: "2023-07-10 14:30",
      customer: "John Doe",
      branch: "Main Branch",
      orderType: "Delivery",
      orderStatus: "Pending",
      products: "2 items",
      totalPrice: "$24.99",
      paymentType: "Credit Card",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      deliveryDate: "2023-07-10 15:00",
      customer: "Jane Smith",
      branch: "Downtown Branch",
      orderType: "Pickup",
      orderStatus: "Accepted",
      products: "3 items",
      totalPrice: "$32.50",
      paymentType: "Cash",
      paymentStatus: "Pending"
    },
    {
      id: 3,
      deliveryDate: "2023-07-10 16:15",
      customer: "Robert Johnson",
      branch: "Main Branch",
      orderType: "Dine-in",
      orderStatus: "Delivered",
      products: "4 items",
      totalPrice: "$45.75",
      paymentType: "Credit Card",
      paymentStatus: "Paid"
    },
    {
      id: 4,
      deliveryDate: "2023-07-10 17:30",
      customer: "Emily Davis",
      branch: "Downtown Branch",
      orderType: "Delivery",
      orderStatus: "Preparing",
      products: "2 items",
      totalPrice: "$28.99",
      paymentType: "Wallet",
      paymentStatus: "Paid"
    },
    {
      id: 5,
      deliveryDate: "2023-07-10 18:00",
      customer: "Michael Wilson",
      branch: "Main Branch",
      orderType: "Pickup",
      orderStatus: "Ready",
      products: "1 item",
      totalPrice: "$12.50",
      paymentType: "Cash",
      paymentStatus: "Pending"
    },
  ]

  const toggleOrderSelection = (id: number) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'canceled':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    let bgColor = 'bg-gray-100'
    let textColor = 'text-gray-700'

    switch (status.toLowerCase()) {
      case 'canceled':
        bgColor = 'bg-red-100'
        textColor = 'text-red-700'
        break
      case 'accepted':
        bgColor = 'bg-green-100'
        textColor = 'text-green-700'
        break
      case 'delivered':
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-700'
        break
      case 'ready':
        bgColor = 'bg-teal-100'
        textColor = 'text-teal-700'
        break
      case 'preparing':
        bgColor = 'bg-orange-100'
        textColor = 'text-orange-700'
        break
      case 'pending':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-700'
        break
      case 'new':
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-700'
        break
      default:
        break
    }

    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="w-full px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">All orders</h1>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button 
              className={`px-4 py-2 text-sm ${viewMode === 'board' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('board')}
            >
              Board
            </button>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
            <Plus size={16} />
            Create order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 flex flex-wrap gap-3 border-b">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order id, customer"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>All branches</option>
              <option>Main branch</option>
              <option>Central Branch</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative min-w-[200px]">
            <select className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Select customer</option>
              <option>User Demo</option>
              <option>Owner Githubit</option>
              <option>Branch1 Githubit</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 min-w-[350px]">
            <div className="flex-1">
              <input
                type="date"
                placeholder="From date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-500">→</span>
            <div className="flex-1">
              <input
                type="date"
                placeholder="To date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            Clear
          </button>

          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
            <FileDown size={16} />
            Export
          </button>
        </div>

        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-sm font-medium ${selectedTab === tab.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <button className="px-3 py-3 text-gray-400 ml-auto">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          {viewMode === 'list' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        checked={selectedOrders.length === orders.length}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.deliveryDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.branch}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.orderType}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.products}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.totalPrice}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.paymentType}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={getStatusColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <Eye size={18} className="text-blue-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <MapPin size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <Printer size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <Download size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <Trash size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <BoardView orders={orders} getStatusBadge={getStatusBadge} getStatusColor={getStatusColor} />
          )}
        </div>

        {viewMode === 'list' && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-blue-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    4
                  </button>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    5
                  </button>
                  <span className="relative inline-flex items-center px-4 py-1 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    20
                  </button>
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
