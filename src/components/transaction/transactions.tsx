"use client"

import React, { useState } from 'react'
import { ChevronDown, Eye } from 'lucide-react'
import { Transaction } from '@/types';

interface LocalTransaction {
  id: number
  client: string
  amount: string
  paymentType: string
  status: 'Progress' | 'Paid' | 'Cancelled'
  note: string
  createdAt: string
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<LocalTransaction[]>([
    { id: 1683, client: 'Sochima Ugwu', amount: '$ 25.17', paymentType: 'Cash', status: 'Progress', note: 'Transaction for order #1200', createdAt: '21-04-2025 22:19' },
    { id: 1682, client: 'Branch1 Githubit', amount: '$ 33.75', paymentType: 'Cash', status: 'Progress', note: 'Transaction for Order #1199', createdAt: '21-04-2025 22:10' },
    { id: 1681, client: 'Joseph Kabata', amount: '$ 6,962.48', paymentType: 'Cash', status: 'Progress', note: 'Transaction for Order #1198', createdAt: '21-04-2025 21:55' },
    { id: 1680, client: 'Sistema Pesquero', amount: '$ 13.23', paymentType: 'Cash', status: 'Progress', note: 'Transaction for order #1197', createdAt: '21-04-2025 16:22' },
    { id: 1679, client: 'User Demo', amount: '$ 17.20', paymentType: 'Cash', status: 'Paid', note: 'Transaction for order #1196', createdAt: '21-04-2025 10:00' },
    { id: 1678, client: 'Sistema Pesquero', amount: '$ 6,988.98', paymentType: 'Cash', status: 'Cancelled', note: 'Transaction for Order #1195', createdAt: '21-04-2025 08:04' },
    { id: 1677, client: 'Sistema Pesquero', amount: '$ 6,948.62', paymentType: 'mercado-pago', status: 'Cancelled', note: 'Transaction for Order #1194', createdAt: '21-04-2025 08:03' },
    { id: 1676, client: 'Owner Githubit', amount: '$ 12.59', paymentType: 'Cash', status: 'Progress', note: 'Transaction for Order #1193', createdAt: '20-04-2025 12:35' },
    { id: 1675, client: 'Owner Githubit', amount: '$ 6.32', paymentType: 'Cash', status: 'Paid', note: 'Transaction for Order #1191', createdAt: '19-04-2025 19:49' },
    { id: 1674, client: 'Haykal', amount: '$ 5,739.90', paymentType: 'Cash', status: 'Progress', note: 'Transaction for Order #1190', createdAt: '19-04-2025 19:23' }
  ])
  const [activeTab, setActiveTab] = useState('all')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false)
  
  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true
    if (activeTab === 'progress') return transaction.status === 'Progress'
    if (activeTab === 'paid') return transaction.status === 'Paid'
    if (activeTab === 'rejected') return transaction.status === 'Cancelled'
    return true
  })

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium">Transactions</h1>
        </div>
        
        {/* Tabs and Client Selector */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <button
              className={`py-2 px-6 rounded-l-md ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`py-2 px-6 ${activeTab === 'progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </button>
            <button
              className={`py-2 px-6 ${activeTab === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('paid')}
            >
              Paid
            </button>
            <button
              className={`py-2 px-6 rounded-r-md ${activeTab === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected
            </button>
          </div>
          
          <div className="relative">
            <button 
              className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-56 text-left"
              onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
            >
              <span className="text-gray-500">{selectedClient || 'Select client'}</span>
              <ChevronDown className="text-gray-500" size={16} />
            </button>
            {clientDropdownOpen && (
              <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="p-2">
                  <div 
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedClient(null)
                      setClientDropdownOpen(false)
                    }}
                  >
                    All clients
                  </div>
                  {Array.from(new Set(transactions.map(t => t.client))).map((client, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedClient(client)
                        setClientDropdownOpen(false)
                      }}
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Client</th>
                <th className="p-3 text-left font-medium">Amount</th>
                <th className="p-3 text-left font-medium">Payment type</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Note</th>
                <th className="p-3 text-left font-medium">Created at</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions
                .filter(transaction => selectedClient ? transaction.client === selectedClient : true)
                .map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{transaction.id}</td>
                  <td className="p-3">{transaction.client}</td>
                  <td className="p-3">{transaction.amount}</td>
                  <td className="p-3">{transaction.paymentType}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      transaction.status === 'Progress' ? 'bg-yellow-100 text-yellow-800' :
                      transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-3">{transaction.note}</td>
                  <td className="p-3">{transaction.createdAt}</td>
                  <td className="p-3">
                    <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <ul className="flex items-center gap-1">
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">&lt;</button></li>
              <li><button className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center">1</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">2</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">3</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">4</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">5</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">...</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">17</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">&gt;</button></li>
            </ul>
          </div>
          <div className="text-sm text-gray-500">10 / page</div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 