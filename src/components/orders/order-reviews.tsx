"use client"

import React, { useState } from "react"
import { Search, ChevronDown, Star, Eye, Trash2 } from "lucide-react"
import { Review } from '@/types';

export default function OrderReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: "#1179", customer: "Delivery Delivery", branch: "Bareilly", reviewText: "N/A", rating: 5, date: "18-04-2023 15:44" },
    { id: "#1177", customer: "User Demo", branch: "Main branch", reviewText: "N/A", rating: 5, date: "15-03-2023 16:08" },
    { id: "#1173", customer: "Hojiakbar Mahmudov", branch: "Main branch", reviewText: "N/A", rating: 5, date: "15-03-2023 14:36" },
    { id: "#1134", customer: "Dendi 4890", branch: "Bareilly", reviewText: "N/A", rating: 5, date: "06-03-2023 18:45" },
    { id: "#1077", customer: "Delivery Delivery", branch: "Bareilly", reviewText: "N/A", rating: 5, date: "12-05-2023 16:37" },
    { id: "#1090", customer: "Delivery Delivery", branch: "Central Branch", reviewText: "N/A", rating: 5, date: "12-05-2023 16:20" },
    { id: "#1089", customer: "Delivery Delivery", branch: "Central Branch", reviewText: "N/A", rating: 5, date: "12-05-2023 15:39" },
    { id: "#1088", customer: "Delivery Delivery", branch: "Central Branch", reviewText: "N/A", rating: 5, date: "12-05-2023 13:58" },
    { id: "#1078", customer: "Delivery Delivery", branch: "Bareilly", reviewText: "N/A", rating: 5, date: "08-05-2023 16:57" },
    { id: "#1074", customer: "Delivery Delivery", branch: "Bareilly", reviewText: "Nice", rating: 5, date: "08-05-2023 13:53" },
  ]);

  const [selectedReviews, setSelectedReviews] = useState<(string | number)[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All branches');
  const [selectedCustomer, setSelectedCustomer] = useState('Select customer');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedReviews(reviews.map(review => review.id).filter(id => id !== undefined) as (string | number)[]);
    } else {
      setSelectedReviews([]);
    }
  };

  const toggleReviewSelection = (id: string | number) => {
    if (selectedReviews.includes(id)) {
      setSelectedReviews(selectedReviews.filter(reviewId => reviewId !== id));
    } else {
      setSelectedReviews([...selectedReviews, id]);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedBranch('All branches');
    setSelectedCustomer('Select customer');
  };

  const handleDeleteSelected = () => {
    setReviews(reviews.filter(review => 
      review.id === undefined || !selectedReviews.includes(review.id)
    ));
    setSelectedReviews([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">Order reviews</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by customers"
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative min-w-[150px]">
          <select
            className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option>All branches</option>
            <option>Main branch</option>
            <option>Bareilly</option>
            <option>Central Branch</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="relative min-w-[150px]">
          <select
            className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option>Select customer</option>
            <option>Delivery Delivery</option>
            <option>User Demo</option>
            <option>Hojiakbar Mahmudov</option>
            <option>Dendi 4890</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <button
          className="px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            selectedReviews.length > 0 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedReviews.length === 0}
          onClick={handleDeleteSelected}
        >
          <Trash2 className="h-4 w-4" />
          Delete selection
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
                    checked={selectedReviews.length === reviews.length && reviews.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Branch
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Review
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Rating
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Review date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded"
                      checked={review.id !== undefined && selectedReviews.includes(review.id)}
                      onChange={() => review.id !== undefined && toggleReviewSelection(review.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.reviewText}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < (review.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.date instanceof Date ? review.date.toLocaleString() : review.date || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100">
                        <Eye className="h-4 w-4" />
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
            <button className="h-8 w-8 rounded-full bg-white text-gray-600 flex items-center justify-center text-sm">
              2
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