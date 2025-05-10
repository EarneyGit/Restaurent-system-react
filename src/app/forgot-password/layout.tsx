import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password - Restaurant Dashboard",
  description: "Reset your password for the restaurant management system",
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      {children}
    </div>
  )
} 