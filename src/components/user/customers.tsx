"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash, Eye, MessageCircle, User } from 'lucide-react'
import { Customer } from '@/types';

interface LocalCustomer {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export default function Customers() {
  const [customers, setCustomers] = useState<LocalCustomer[]>([
    { id: 175, firstName: 'fernando', lastName: 'sorto', email: 'fernandosorto4@gmail.com', role: 'User' },
    { id: 174, firstName: 'Sochima', lastName: 'Ugwu', email: 'cj1900a@gmail.com', role: 'User' },
    { id: 173, firstName: 'Sisterna', lastName: 'Pesquero', email: 'sistemapesquero@gmail.com', role: 'User' },
    { id: 172, firstName: 'Joseph', lastName: 'Kabata', email: 'ndichu.kabata@gmail.com', role: 'User' },
    { id: 170, firstName: 'Haykal', lastName: '', email: '25nfqkt9w7@privaterelay.appleid.com', role: 'User' },
    { id: 169, firstName: 'dfgf', lastName: 'dfgdfg', email: 'sdfsd@gmail.com', role: 'User' },
    { id: 168, firstName: 'Heidi', lastName: 'Stephens', email: 'heidistephens.89961@gmail.com', role: 'User' },
    { id: 167, firstName: 'Hojiakbar', lastName: 'Mahmudov', email: 'hojimahmudov001@gmail.com', role: 'User' },
    { id: 166, firstName: 'bunyodyoqubjonov2@gmail.com', lastName: '', email: 'bunyodyoqubjonov2@gmail.com', role: 'User' },
    { id: 165, firstName: 'dydatagrip', lastName: '', email: 'dydatagrip@gmail.com', role: 'User' }
  ])
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('published')
  
  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(customers.map(customer => customer.id))
    }
  }
  
  const handleSelectCustomer = (id: number) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id))
    } else {
      setSelectedCustomers([...selectedCustomers, id])
    }
  }
  
  const handleDeleteSelected = () => {
    setCustomers(customers.filter(customer => !selectedCustomers.includes(customer.id)))
    setSelectedCustomers([])
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Customers</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} />
            Add customer
          </button>
        </div>
        
        {/* Search and Delete */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by id, title"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg"
            onClick={handleDeleteSelected}
            disabled={selectedCustomers.length === 0}
          >
            Delete selection
          </button>
        </div>
        
        {/* Tabs */}
        <div className="border-b mb-4">
          <div className="flex gap-6">
            <button
              className={`pb-2 px-1 ${activeTab === 'published' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
            <button
              className={`pb-2 px-1 ${activeTab === 'deleted' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('deleted')}
            >
              Deleted at
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === customers.length && customers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">First name</th>
                <th className="p-3 text-left font-medium">Last name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-3">{customer.id}</td>
                  <td className="p-3">{customer.firstName}</td>
                  <td className="p-3">{customer.lastName}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.role}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Eye size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <MessageCircle size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <User size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <Edit size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Trash size={16} />
                      </button>
                    </div>
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
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">6</button></li>
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