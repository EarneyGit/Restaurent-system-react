"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { signIn, signOut } from "next-auth/react"

// This function is called server-side but delegates to client-side
// actions, so we need to redirect manually
export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  let callbackUrl = formData.get("callbackUrl") as string || "/"

  if (!email || !password) {
    redirect("/login?error=InvalidCredentials")
  }

  // Avoid redirect loops
  if (callbackUrl === '/login') {
    callbackUrl = '/'
  }

  // Use a workaround for server actions with NextAuth
  // In a real app, you'd use a proper server-side auth solution
  const users = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    }
  ]

  // Find user and verify
  const user = users.find(user => user.email === email)
  if (!user || user.password !== password) {
    redirect("/login?error=CredentialsSignin")
  }

  // Manual auth token
  cookies().set({
    name: "next-auth.session-token",
    value: `manual-auth-${Date.now()}`,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60,
  })

  // Redirect to callback URL
  redirect(callbackUrl)
}

export async function handleSignOut() {
  // Clear all Next Auth cookies
  const cookieStore = cookies()
  const cookiesToClear = [
    "next-auth.session-token", 
    "__Secure-next-auth.session-token", 
    "next-auth.csrf-token", 
    "__Secure-next-auth.csrf-token", 
    "next-auth.callback-url", 
    "__Secure-next-auth.callback-url"
  ]
  
  for (const cookie of cookiesToClear) {
    if (cookieStore.has(cookie)) {
      cookieStore.delete(cookie)
    }
  }
  
  // Redirect to login page
  redirect("/login")
} 