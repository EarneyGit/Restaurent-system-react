import Link from "next/link"

export default function LoginErrorPage({
  searchParams,
}: {
  searchParams?: { error?: string }
}) {
  const error = searchParams?.error || "unknown"
  
  const errorMessages = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    InvalidCredentials: "Please provide a valid email and password.",
    SessionRequired: "You need to be logged in to access this page.",
    AccessDenied: "You don't have permission to access this resource.",
    unknown: "An unexpected error occurred. Please try again.",
  }
  
  const message = errorMessages[error as keyof typeof errorMessages] || errorMessages.unknown

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Login Error
          </h1>
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-left">
            <p className="font-medium">Authentication Failed</p>
            <p>{message}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Link 
            href="/login" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  )
} 