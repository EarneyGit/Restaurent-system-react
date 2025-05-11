"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingCart,
  MessageCircle,
  Package,
  Percent,
  ChevronDown,
  Building,
  ImageIcon,
  Utensils,
  Users,
  Calendar,
  Gift,
  MessageSquare,
  Banknote,
  FileText,
  BarChart,
} from "lucide-react"

export function BranchSidebar() {
  const pathname = usePathname()
  
  const [expandedMenus, setExpandedMenus] = useState({
    orders: false,
    reservationSetup: false,
    reservations: false,
    bonuses: false,
  });

  type MenuKey = keyof typeof expandedMenus;

  const toggleMenu = (menu: MenuKey) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10">
        <div className="px-4 py-4">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-800">Restroman</span>
          </Link>
        </div>

        <div className="px-3 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in menu"
              className="w-full py-2 pl-10 pr-3 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-3">
        <div className="space-y-1">
          <Link
            href="/"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              pathname === "/" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-600" />
            Dashboard
          </Link>

          <Link
            href="/pos"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              pathname === "/pos" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <ShoppingCart className="mr-3 h-5 w-5 text-gray-600" />
            POS
          </Link>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            ORDER MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => toggleMenu('orders')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <ShoppingCart className="mr-3 h-5 w-5 text-gray-600" />
              Orders
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.orders ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.orders && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/orders/all"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  All
                </Link>
                <Link
                  href="/orders/refunds"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Refunds
                </Link>
              </div>
            )}

            <Link
              href="/order-reviews"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/order-reviews" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <MessageCircle className="mr-3 h-5 w-5 text-gray-600" />
              Order reviews
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            PRODUCT MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/products/list"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/products/list" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Package className="mr-3 h-5 w-5 text-gray-600" />
              Product list
            </Link>
            <Link
              href="/discounts"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/discounts" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Percent className="mr-3 h-5 w-5 text-gray-600" />
              Discounts
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            BRANCH MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/my-branch"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/my-branch" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Building className="mr-3 h-5 w-5 text-gray-600" />
              My branch
            </Link>
            <Link
              href="/branch-galleries"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/branch-galleries" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <ImageIcon className="mr-3 h-5 w-5 text-gray-600" />
              Branch galleries
            </Link>
            <Link
              href="/kitchen-list"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/kitchen-list" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Utensils className="mr-3 h-5 w-5 text-gray-600" />
              Kitchen list
            </Link>
            <Link
              href="/staff-users"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/staff-users" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className="mr-3 h-5 w-5 text-gray-600" />
              Staff users
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            RESERVATION MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => toggleMenu('reservationSetup')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Calendar className="mr-3 h-5 w-5 text-gray-600" />
              Reservation set up
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.reservationSetup ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.reservationSetup && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/reservation/zones"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Reservation zones
                </Link>
                <Link
                  href="/reservation/tables-qr"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Tables & QR codes
                </Link>
                <Link
                  href="/reservation/time"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Reservation time
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleMenu('reservations')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Calendar className="mr-3 h-5 w-5 text-gray-600" />
              Reservations
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.reservations ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.reservations && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/reservations/list"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Reservation list
                </Link>
                <Link
                  href="/reservations/new"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  New reservation
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            PROMOTION MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/coupons"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/coupons" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Gift className="mr-3 h-5 w-5 text-gray-600" />
              Coupons
            </Link>
            <button
              onClick={() => toggleMenu('bonuses')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Gift className="mr-3 h-5 w-5 text-gray-600" />
              Bonuses
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.bonuses ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.bonuses && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/bonuses/branch"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Branch bonus
                </Link>
                <Link
                  href="/bonuses/product"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Product bonus
                </Link>
              </div>
            )}
            <Link
              href="/stories"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/stories" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <MessageSquare className="mr-3 h-5 w-5 text-gray-600" />
              Stories
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            TRANSACTION MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/transactions"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/transactions" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Transactions
            </Link>
            <Link
              href="/payout-requests"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/payout-requests" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Payout requests
            </Link>
            <Link
              href="/payouts"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/payouts" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Payouts
            </Link>
            <Link
              href="/payment-payloads"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/payment-payloads" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Payment payloads
            </Link>
          </div>
        </div>

        <div className="mt-8 mb-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            REPORT & ANALYTICS
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/order-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/order-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <FileText className="mr-3 h-5 w-5 text-gray-600" />
              Order reports
            </Link>
            <Link
              href="/sales-statistics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/sales-statistics" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart className="mr-3 h-5 w-5 text-gray-600" />
              sales.statistics
            </Link>
            <Link
              href="/waiter-statistics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/waiter-statistics" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart className="mr-3 h-5 w-5 text-gray-600" />
              waiter.statistics
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 