import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Restaurant Dashboard",
  description: "Login to the restaurant management system",
}

export default function LoginLayout({
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