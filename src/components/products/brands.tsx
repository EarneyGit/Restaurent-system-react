"use client"

import React, { useState } from "react"
import { Search, Plus, Pencil, Trash2, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Brand {
  id: number;
  title: string;
  image: string;
  active: boolean;
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([
    { id: 2, title: "Fresh Burger", image: "/burger.png", active: true },
    { id: 1, title: "Locma", image: "/locma.png", active: true },
  ]);

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('published');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBrands(brands.map(brand => brand.id));
    } else {
      setSelectedBrands([]);
    }
  };

  const handleSelectBrand = (id: number) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands(selectedBrands.filter(brandId => brandId !== id));
    } else {
      setSelectedBrands([...selectedBrands, id]);
    }
  };

  const handleDeleteSelected = () => {
    setBrands(brands.filter(brand => !selectedBrands.includes(brand.id)));
    setSelectedBrands([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brands</h1>
        <Link href="/brands/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
            <Plus className="h-5 w-5" />
            Add brand
          </button>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'published' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('published')}
          >
            Published
          </button>
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'deleted' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('deleted')}
          >
            Deleted at
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title"
              className="px-9 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <button className="px-4 py-2 bg-blue-50 text-blue-500 rounded-md flex items-center gap-2 hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          
          <button className="px-4 py-2 bg-green-50 text-green-500 rounded-md flex items-center gap-2 hover:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            selectedBrands.length > 0 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedBrands.length === 0}
          onClick={handleDeleteSelected}
        >
          <Trash2 className="h-4 w-4" />
          Delete selection
        </button>
        
        <button className="ml-2 p-2 border border-gray-200 rounded-md">
          <List className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                    onChange={handleSelectAll}
                    checked={selectedBrands.length === brands.length && brands.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Image
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Active
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleSelectBrand(brand.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {brand.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {brand.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                        {brand.title === "Fresh Burger" ? (
                          <span>🍔</span>
                        ) : (
                          <span>🥐</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 rounded-md text-gray-400 bg-white">
              &laquo;
            </button>
            <button className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
              1
            </button>
            <button className="px-2 py-1 rounded-md text-gray-600 bg-white">
              &raquo;
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 text-sm text-gray-600">
        Restroman Single support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 