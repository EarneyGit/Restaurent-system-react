"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingCart,
  ClipboardList,
  CheckCircle,
  MessageCircle,
  Boxes,
  Package,
  Puzzle,
  ListPlus,
  ChevronDown,
  Percent,
  BookText,
  Home,
  List,
  ImageIcon,
  Utensils,
  Calendar,
  Sparkles,
  MessageSquare,
  Image,
  Briefcase,
  LayoutList,
  Bell,
  Ticket,
  Users,
  Gift,
  UserCircle,
  Building,
  Truck,
  Wallet,
  CreditCard,
  DollarSign,
  Banknote,
  PiggyBank,
  FileText,
  TrendingUp,
  BarChart,
  ShoppingBag,
  LineChart,
  ListTree,
  ClipboardCheck,
  Settings,
  Currency,
  CreditCard as CreditCardIcon,
  BellDot,
  Share2,
  Smartphone,
  FileCode,
  Languages,
  HardDrive,
  Info,
  Database
} from "lucide-react"

function Sidebar() {
  const pathname = usePathname()
  
  const [expandedMenus, setExpandedMenus] = useState({
    orders: false,
    products: false,
    extras: false,
    recipes: false,
    reservationSetup: false,
    reservations: false,
    careers: false,
    bonuses: false,
    deliverymen: false,
    wallets: false,
    sellerPayments: false,
    deliverymanPayments: false,
    payments: false,
    notificationSettings: false,
    pageSetup: false,
    langTranslations: false,
    backupMaintenance: false
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
            <span className="ml-2 text-lg font-semibold text-gray-800">Restroman UK</span>
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
                  href="/orders/delivery"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Delivery Orders
                </Link>
                <Link
                  href="/orders/pickup"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Pickup orders
                </Link>
                <Link
                  href="/orders/dine-in"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Dine-in orders
                </Link>
                <Link
                  href="/orders/scheduled"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Scheduled orders
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
              href="/order-statuses"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <CheckCircle className="mr-3 h-5 w-5 text-gray-600" />
              Order statuses
            </Link>

            <Link
              href="/order-reviews"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
              href="/brands"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Boxes className="mr-3 h-5 w-5 text-gray-600" />
              Brands
            </Link>

            <Link
              href="/units"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <ListPlus className="mr-3 h-5 w-5 text-gray-600" />
              Units
            </Link>

            <button
              onClick={() => toggleMenu('products')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Package className="mr-3 h-5 w-5 text-gray-600" />
              Products
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.products ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.products && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/products/categories"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Product categories
                </Link>
                <Link
                  href="/products/list"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Product list
                </Link>
              </div>
            )}

            <Link
              href="/addons"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Puzzle className="mr-3 h-5 w-5 text-gray-600" />
              Addons
            </Link>
            
            <button
              onClick={() => toggleMenu('extras')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <ListPlus className="mr-3 h-5 w-5 text-gray-600" />
              Extras
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.extras ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.extras && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/extras/groups"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Extra groups
                </Link>
                <Link
                  href="/extras/values"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Extra values
                </Link>
              </div>
            )}

            <Link
              href="/discounts"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Percent className="mr-3 h-5 w-5 text-gray-600" />
              Discounts
            </Link>
            
            <button
              onClick={() => toggleMenu('recipes')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <BookText className="mr-3 h-5 w-5 text-gray-600" />
              Recipes
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.recipes ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.recipes && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/recipes/categories"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Recipe categories
                </Link>
                <Link
                  href="/recipes/list"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Recipe list
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            BRANCH MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/main-branch"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Home className="mr-3 h-5 w-5 text-gray-600" />
              Main branch
            </Link>

            <Link
              href="/branch-list"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <List className="mr-3 h-5 w-5 text-gray-600" />
              Branch list
            </Link>

            <Link
              href="/branch-galleries"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <ImageIcon className="mr-3 h-5 w-5 text-gray-600" />
              Branch galleries
            </Link>

            <Link
              href="/kitchen-list"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Utensils className="mr-3 h-5 w-5 text-gray-600" />
              Kitchen list
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
            CONTENT MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/stories"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Sparkles className="mr-3 h-5 w-5 text-gray-600" />
              Stories
            </Link>

            <Link
              href="/blogs"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <MessageSquare className="mr-3 h-5 w-5 text-gray-600" />
              Blogs
            </Link>

            <Link
              href="/gallery"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Image className="mr-3 h-5 w-5 text-gray-600" />
              Gallery
            </Link>

            <button
              onClick={() => toggleMenu('careers')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Briefcase className="mr-3 h-5 w-5 text-gray-600" />
              Careers
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.careers ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.careers && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/careers/categories"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Career Categories
                </Link>
                <Link
                  href="/careers/list"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Career list
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
              href="/banners"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LayoutList className="mr-3 h-5 w-5 text-gray-600" />
              Banners
            </Link>

            <Link
              href="/notifications"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Bell className="mr-3 h-5 w-5 text-gray-600" />
              Notifications
            </Link>

            <Link
              href="/coupons"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Ticket className="mr-3 h-5 w-5 text-gray-600" />
              Coupons
            </Link>

            <Link
              href="/referral"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="mr-3 h-5 w-5 text-gray-600" />
              Referral
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
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            USER MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/customers"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <UserCircle className="mr-3 h-5 w-5 text-gray-600" />
              Customers
            </Link>

            <Link
              href="/staff-admin"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="mr-3 h-5 w-5 text-gray-600" />
              Staff & admin users
            </Link>

            <button
              onClick={() => toggleMenu('deliverymen')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Truck className="mr-3 h-5 w-5 text-gray-600" />
              Deliverymen
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.deliverymen ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.deliverymen && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/deliverymen/list"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Deliverymen list
                </Link>
                <Link
                  href="/deliverymen/map"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Deliverymen map
                </Link>
                <Link
                  href="/deliverymen/statistics"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Deliverymen statistics
                </Link>
                <Link
                  href="/deliverymen/reviews"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Deliverymen reviews
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleMenu('wallets')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Wallet className="mr-3 h-5 w-5 text-gray-600" />
              Wallets
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.wallets ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.wallets && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/wallets/user"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  User wallets
                </Link>
                <Link
                  href="/wallets/add-funds"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Add funds
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            TRANSACTION MANAGEMENT
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/transactions"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <CreditCard className="mr-3 h-5 w-5 text-gray-600" />
              Transactions
            </Link>

            <button
              onClick={() => toggleMenu('sellerPayments')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <DollarSign className="mr-3 h-5 w-5 text-gray-600" />
              Seller payments
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.sellerPayments ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.sellerPayments && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/seller-payments/info"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Info
                </Link>
                <Link
                  href="/seller-payments/completed"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Completed payments
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleMenu('deliverymanPayments')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Deliveryman payments
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.deliverymanPayments ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.deliverymanPayments && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/deliveryman-payments/info"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Info
                </Link>
                <Link
                  href="/deliveryman-payments/completed"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Completed payments
                </Link>
              </div>
            )}

            <Link
              href="/payout-requests"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Banknote className="mr-3 h-5 w-5 text-gray-600" />
              Payout requests
            </Link>

            <Link
              href="/payouts"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <PiggyBank className="mr-3 h-5 w-5 text-gray-600" />
              Payouts
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            REPORT & ANALYTICS
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/overview"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/overview" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="mr-3 h-5 w-5 text-gray-600" />
              Overview
            </Link>
            
            <Link
              href="/revenue-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/revenue-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <TrendingUp className="mr-3 h-5 w-5 text-gray-600" />
              Revenue reports
            </Link>
            
            <Link
              href="/order-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/order-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart className="mr-3 h-5 w-5 text-gray-600" />
              Order reports
            </Link>
            
            <Link
              href="/product-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/product-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Package className="mr-3 h-5 w-5 text-gray-600" />
              Product reports
            </Link>
            
            <Link
              href="/stock-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/stock-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LineChart className="mr-3 h-5 w-5 text-gray-600" />
              Stock reports
            </Link>
            
            <Link
              href="/category-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/category-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <ListTree className="mr-3 h-5 w-5 text-gray-600" />
              Category reports
            </Link>
            
            <Link
              href="/extras-reports"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/extras-reports" ? "bg-blue-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Puzzle className="mr-3 h-5 w-5 text-gray-600" />
              Extras reports
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            BUSINESS SETTINGS
          </h3>
          <div className="mt-2 space-y-1">
            <Link
              href="/general-settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-600" />
              General settings
            </Link>

            <Link
              href="/currencies"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Currency className="mr-3 h-5 w-5 text-gray-600" />
              Currencies
            </Link>

            <button
              onClick={() => toggleMenu('payments')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <CreditCardIcon className="mr-3 h-5 w-5 text-gray-600" />
              Payments
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.payments ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.payments && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/payments/methods"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Payment methods
                </Link>
                <Link
                  href="/payments/payloads"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Payment payloads
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleMenu('notificationSettings')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <BellDot className="mr-3 h-5 w-5 text-gray-600" />
              Notification settings
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.notificationSettings ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.notificationSettings && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/notification-settings/firebase"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Firebase configuration
                </Link>
                <Link
                  href="/notification-settings/sms"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Sms provider
                </Link>
                <Link
                  href="/notification-settings/email"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Email provider
                </Link>
                <Link
                  href="/notification-settings/templates"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Email templates
                </Link>
                <Link
                  href="/notification-settings/subscribers"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Subscribers
                </Link>
              </div>
            )}

            <Link
              href="/social-settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Share2 className="mr-3 h-5 w-5 text-gray-600" />
              Social settings
            </Link>

            <Link
              href="/app-settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Smartphone className="mr-3 h-5 w-5 text-gray-600" />
              App Settings
            </Link>

            <button
              onClick={() => toggleMenu('pageSetup')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <FileCode className="mr-3 h-5 w-5 text-gray-600" />
              Page setup
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.pageSetup ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.pageSetup && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/page-setup/faq"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  FAQ
                </Link>
                <Link
                  href="/page-setup/terms"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Terms & conditions
                </Link>
                <Link
                  href="/page-setup/privacy"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Privacy policy
                </Link>
                <Link
                  href="/page-setup/custom"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Custom pages
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 mb-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            SYSTEM SETTINGS
          </h3>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => toggleMenu('langTranslations')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Languages className="mr-3 h-5 w-5 text-gray-600" />
              Lang & translations
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.langTranslations ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.langTranslations && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/lang-translations/languages"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Languages
                </Link>
                <Link
                  href="/lang-translations/translations"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Translations
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleMenu('backupMaintenance')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <HardDrive className="mr-3 h-5 w-5 text-gray-600" />
              Backup & maintenance
              <ChevronDown className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${expandedMenus.backupMaintenance ? 'transform rotate-180' : ''}`} />
            </button>

            {expandedMenus.backupMaintenance && (
              <div className="pl-10 space-y-1">
                <Link
                  href="/backup-maintenance/backup"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Backup
                </Link>
                <Link
                  href="/backup-maintenance/clear-cache"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                  Clear cache
                </Link>
              </div>
            )}

            <Link
              href="/system-information"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Info className="mr-3 h-5 w-5 text-gray-600" />
              System information
            </Link>

            <Link
              href="/update-database"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Database className="mr-3 h-5 w-5 text-gray-600" />
              Update database
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 