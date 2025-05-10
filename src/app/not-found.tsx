import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">This page could not be found.</p>
      <Link 
        href="/" 
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
} 