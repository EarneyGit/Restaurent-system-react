"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { Item } from '@/types';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  id: number;
  items: CartItem[];
  deliveryType: string | null;
  deliveryZone: string | null;
  table: string | null;
  user: string | null;
  address: string | null;
  deliveryDate: string | null;
  deliveryTime: string | null;
  paymentType: string | null;
}

function POSContent() {
  const [carts, setCarts] = useState<Cart[]>([
    { 
      id: 1, 
      items: [], 
      deliveryType: null, 
      deliveryZone: null, 
      table: null, 
      user: null,
      address: null,
      deliveryDate: null,
      deliveryTime: null,
      paymentType: null 
    }
  ])
  const [activeCartId, setActiveCartId] = useState<number>(1)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState("Main branch")
  const [currency, setCurrency] = useState("USD ($)")
  
  // Sample categories
  const categories = ["All", "Fast Food", "Pizza", "Sushi", "Salads", "Desserts"]
  
  // Sample products based on the screenshot
  const products = [
    { id: 1, name: "Chilli Cheese Hot Dog", image: "/hot-dog.jpg", price: 8.99, category: "Fast Food" },
    { id: 2, name: "California-style Pizza", image: "/california-pizza.jpg", price: 12.99, category: "Pizza" },
    { id: 3, name: "Cobb Salad", image: "/cobb-salad.jpg", price: 10.99, category: "Salads" },
    { id: 4, name: "California Roll", image: "/california-roll.jpg", price: 14.99, category: "Sushi" },
    { id: 5, name: "French Dip Sandwich", image: "/sandwich.jpg", price: 9.99, category: "Fast Food" },
    { id: 6, name: "Ice Cream Sandwich", image: "/ice-cream.jpg", price: 5.99, category: "Desserts" },
    { id: 7, name: "Pastrami Sandwich", image: "/pastrami.jpg", price: 11.99, category: "Fast Food" },
    { id: 8, name: "Tacos", image: "/tacos.jpg", price: 8.99, category: "Fast Food" },
    { id: 9, name: "Sweet Potato Hash", image: "/sweet-potato.jpg", price: 7.99, category: "Fast Food" },
    { id: 10, name: "Wild Salmon", image: "/salmon.jpg", price: 16.99, category: "Fast Food" },
    { id: 11, name: "Hot Dog", image: "/hotdog.jpg", price: 6.99, category: "Fast Food" },
    { id: 12, name: "Club Sandwich", image: "/club-sandwich.jpg", price: 10.99, category: "Fast Food" },
  ]

  // Filter products by category
  const filteredProducts = selectedCategory && selectedCategory !== "All" 
    ? products.filter(product => product.category === selectedCategory)
    : products

  // Get active cart
  const activeCart = carts.find(cart => cart.id === activeCartId) || carts[0]
  
  // Add new cart
  const addNewCart = () => {
    const newCartId = carts.length > 0 ? Math.max(...carts.map(cart => cart.id)) + 1 : 1
    setCarts([...carts, { 
      id: newCartId, 
      items: [], 
      deliveryType: null, 
      deliveryZone: null, 
      table: null, 
      user: null,
      address: null,
      deliveryDate: null,
      deliveryTime: null,
      paymentType: null 
    }])
    setActiveCartId(newCartId)
  }
  
  // Remove cart
  const removeCart = (cartId: number) => {
    if (carts.length <= 1) return // Prevent removing the last cart
    
    const newCarts = carts.filter(cart => cart.id !== cartId)
    setCarts(newCarts)
    
    // If removing the active cart, switch to another cart
    if (activeCartId === cartId) {
      setActiveCartId(newCarts[0].id)
    }
  }
  
  // Add to cart function
  const addToCart = (product: typeof products[0]) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        
        const existingItem = cart.items.find(item => item.id === product.id)
        if (existingItem) {
          return {
            ...cart,
            items: cart.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          }
        } else {
          return {
            ...cart,
            items: [...cart.items, { ...product, quantity: 1 }]
          }
        }
      })
    })
  }

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        
        return {
          ...cart,
          items: cart.items.filter(item => item.id !== productId)
        }
      })
    })
  }
  
  // Update delivery type
  const updateDeliveryType = (type: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, deliveryType: type }
      })
    })
  }
  
  // Update delivery zone
  const updateDeliveryZone = (zone: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, deliveryZone: zone }
      })
    })
  }
  
  // Update table
  const updateTable = (table: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, table: table }
      })
    })
  }
  
  // Update payment type
  const updatePaymentType = (type: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, paymentType: type }
      })
    })
  }

  // Update user
  const updateUser = (user: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, user: user }
      })
    })
  }
  
  // Update address
  const updateAddress = (address: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, address: address }
      })
    })
  }
  
  // Update delivery date
  const updateDeliveryDate = (date: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, deliveryDate: date }
      })
    })
  }
  
  // Update delivery time
  const updateDeliveryTime = (time: string | null) => {
    setCarts(prevCarts => {
      return prevCarts.map(cart => {
        if (cart.id !== activeCartId) return cart
        return { ...cart, deliveryTime: time }
      })
    })
  }

  // Calculate subtotal
  const subtotal = activeCart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  // Calculate tax (assume 5%)
  const tax = subtotal * 0.05
  
  // Delivery fee
  const deliveryFee = activeCart.deliveryType ? 2.00 : 0
  
  // Service fee
  const serviceFee = 1.00
  
  // Calculate total
  const total = subtotal + tax + deliveryFee + serviceFee

  // Add client modal state
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
  const [newClientFirstName, setNewClientFirstName] = useState("")
  const [newClientLastName, setNewClientLastName] = useState("")
  const [newClientPhone, setNewClientPhone] = useState("")
  const [newClientEmail, setNewClientEmail] = useState("")
  
  // Add address modal state
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false)
  const [newAddressFirstName, setNewAddressFirstName] = useState("")
  const [newAddressLastName, setNewAddressLastName] = useState("")
  const [newAddressTitle, setNewAddressTitle] = useState("")
  const [newAddressHomeNumber, setNewAddressHomeNumber] = useState("")
  const [newAddressZipCode, setNewAddressZipCode] = useState("")
  const [newAddressStreet, setNewAddressStreet] = useState("")
  const [newAddressDetails, setNewAddressDetails] = useState("")

  // Add new client function
  const handleAddClient = () => {
    // Here you would typically send this data to your backend API
    // For now, we'll just close the modal and reset the form
    setIsAddClientModalOpen(false)
    setNewClientFirstName("")
    setNewClientLastName("")
    setNewClientPhone("")
    setNewClientEmail("")
  }
  
  // Add new address function
  const handleAddAddress = () => {
    // Here you would typically send this data to your backend API
    // For now, we'll just close the modal and reset the form
    setIsAddAddressModalOpen(false)
    setNewAddressFirstName("")
    setNewAddressLastName("")
    setNewAddressTitle("")
    setNewAddressHomeNumber("")
    setNewAddressZipCode("")
    setNewAddressStreet("")
    setNewAddressDetails("")
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50 text-sm">
      <div className="flex-1 p-2 md:p-3 overflow-auto">
        <div className="mb-3 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
          <div className="relative w-full md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-7 pr-2 py-1.5 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <div className="relative w-full md:w-52">
            <select 
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="Main branch">Main branch</option>
              <option value="Branch 1">Branch 1</option>
              <option value="Branch 2">Branch 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative w-full md:w-52">
            <select className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative w-full md:w-52">
            <select className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>Select brand</option>
              <option>Brand 1</option>
              <option>Brand 2</option>
              <option>Brand 3</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex space-x-2 overflow-x-auto py-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-md whitespace-nowrap text-sm ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-md overflow-hidden shadow-sm cursor-pointer hover:shadow transition-shadow"
            >
              <div className="h-28 bg-gray-200 relative">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-xs">Image</span>
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {product.name}
                </h3>
                <p className="text-blue-500 font-medium text-sm">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3">
          <nav className="flex justify-center">
            <ul className="flex items-center">
              <li>
                <button className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-1 text-xs">
                  1
                </button>
              </li>
              <li>
                <button className="h-6 w-6 rounded-full bg-white text-gray-700 flex items-center justify-center mr-1 text-xs">
                  2
                </button>
              </li>
              <li>
                <button className="h-6 w-6 rounded-full bg-white text-gray-700 flex items-center justify-center mr-1 text-xs">
                  3
                </button>
              </li>
              <li>
                <button className="h-6 w-6 rounded-full bg-white text-gray-700 flex items-center justify-center mr-1 text-xs">
                  4
                </button>
              </li>
              <li>
                <button className="h-6 w-6 rounded-full bg-white text-gray-700 flex items-center justify-center mr-1 text-xs">
                  5
                </button>
              </li>
              <li>
                <span className="mx-1 text-gray-500 text-xs">...</span>
              </li>
              <li>
                <button className="h-6 w-6 rounded-full bg-white text-gray-700 flex items-center justify-center text-xs">
                  11
                </button>
              </li>
              <li>
                <button className="ml-1 p-1 rounded-md">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="w-full md:w-72 lg:w-80 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {carts.map(cart => (
                <div 
                  key={cart.id} 
                  className={`flex items-center bg-gray-100 rounded px-2 py-1 cursor-pointer ${cart.id === activeCartId ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveCartId(cart.id)}
                >
                  <span className="text-sm">Cart - {cart.id}</span>
                  {carts.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCart(cart.id)
                      }}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={addNewCart}
              className="h-7 w-7 bg-blue-500 text-white rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-medium text-red-500 mb-1">* Delivery</label>
            <select 
              value={activeCart.deliveryType || ""}
              onChange={(e) => updateDeliveryType(e.target.value || null)}
              className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="">Select delivery type</option>
              <option value="dine_in">Dine in</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          
          {activeCart.deliveryType === 'dine_in' && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-red-500 mb-1">* Delivery zone</label>
                  <select 
                    value={activeCart.deliveryZone || ""}
                    onChange={(e) => updateDeliveryZone(e.target.value || null)}
                    className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select zone</option>
                    <option value="vip_1">Vip 1</option>
                    <option value="vip_2">Vip 2</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-red-500 mb-1">* Table</label>
                  <select 
                    value={activeCart.table || ""}
                    onChange={(e) => updateTable(e.target.value || null)}
                    className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select table</option>
                    <option value="title_1">Title-1</option>
                    <option value="title_2">Title-2</option>
                    <option value="title_3">Title-3</option>
                  </select>
                </div>
              </div>
            </>
          )}
          
          {activeCart.deliveryType === 'delivery' && (
            <>
              <div className="mb-3">
                <label className="block text-xs font-medium text-red-500 mb-1">* User</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select 
                      value={activeCart.user || ""}
                      onChange={(e) => updateUser(e.target.value || null)}
                      className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select client</option>
                      <option value="client_1">Client 1</option>
                      <option value="client_2">Client 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button 
                    className="w-8 h-8 bg-gray-50 border border-gray-300 rounded-md flex items-center justify-center text-gray-500"
                    onClick={() => setIsAddClientModalOpen(true)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-xs font-medium text-red-500 mb-1">* Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select 
                      value={activeCart.address || ""}
                      onChange={(e) => updateAddress(e.target.value || null)}
                      className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select address</option>
                      <option value="address_1">Address 1</option>
                      <option value="address_2">Address 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button 
                    className="w-8 h-8 bg-gray-50 border border-gray-300 rounded-md flex items-center justify-center text-gray-500"
                    onClick={() => setIsAddAddressModalOpen(true)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-red-500 mb-1">* Delivery date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Delivery date"
                      className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      value={activeCart.deliveryDate || ""}
                      onChange={(e) => updateDeliveryDate(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-red-500 mb-1">* Delivery time (up to)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Start time"
                      className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      value={activeCart.deliveryTime || ""}
                      onChange={(e) => updateDeliveryTime(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-red-500 mb-1">* Currency</label>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-red-500 mb-1">* Payment type</label>
              <select 
                value={activeCart.paymentType || ""}
                onChange={(e) => updatePaymentType(e.target.value || null)}
                className="appearance-none w-full px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              >
                <option value="">Select payment type</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-3">
          {activeCart.items.length > 0 ? (
            <div className="space-y-3">
              {activeCart.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-12 h-10 bg-gray-100 rounded-md overflow-hidden relative mr-2">
                    <div className="w-12 h-10 bg-gray-200 flex items-center justify-center text-gray-400">
                      <span className="text-xs">Image</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex items-center mt-1">
                      <button className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center text-xs">-</button>
                      <span className="mx-1 text-sm">{item.quantity}</span>
                      <button className="w-5 h-5 bg-gray-200 rounded-md flex items-center justify-center text-xs">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromCart(item.id)
                      }}
                      className="text-red-500 mt-1 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Your cart is empty
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sub total</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Restaurant tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery fee</span>
              <span className="font-medium">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service fee</span>
              <span className="font-medium">${serviceFee.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between mb-3">
            <span className="font-medium text-gray-600 text-sm">Total amount</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors text-sm"
            disabled={activeCart.items.length === 0 || !activeCart.deliveryType || !activeCart.paymentType}
          >
            Place order
          </button>
        </div>
      </div>
      
      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Add client</h2>
              <button 
                onClick={() => setIsAddClientModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    First name
                  </label>
                  <input
                    type="text"
                    value={newClientFirstName}
                    onChange={(e) => setNewClientFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Last name
                  </label>
                  <input
                    type="text"
                    value={newClientLastName}
                    onChange={(e) => setNewClientLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Email
                  </label>
                  <input
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setIsAddClientModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={!newClientFirstName || !newClientLastName || !newClientPhone || !newClientEmail}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Address Modal */}
      {isAddAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">create.address</h2>
              <button 
                onClick={() => setIsAddAddressModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={newAddressFirstName}
                    onChange={(e) => setNewAddressFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={newAddressLastName}
                    onChange={(e) => setNewAddressLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={newAddressTitle}
                    onChange={(e) => setNewAddressTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    home.number
                  </label>
                  <input
                    type="text"
                    placeholder="home.number"
                    value={newAddressHomeNumber}
                    onChange={(e) => setNewAddressHomeNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    zip.code
                  </label>
                  <input
                    type="text"
                    placeholder="zip.code"
                    value={newAddressZipCode}
                    onChange={(e) => setNewAddressZipCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={newAddressStreet}
                    onChange={(e) => setNewAddressStreet(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Details
                </label>
                <textarea
                  placeholder="Details (optional)"
                  value={newAddressDetails}
                  onChange={(e) => setNewAddressDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setIsAddAddressModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={!newAddressFirstName || !newAddressLastName || !newAddressTitle || !newAddressHomeNumber || !newAddressZipCode || !newAddressStreet}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default POSContent 