import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { getServerSession as getNextAuthServerSession } from "next-auth/next"

// Mock user database for demonstration
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
  },
  {
    id: "2",
    name: "Branch Manager",
    email: "branch@example.com",
    password: "branch123",
    role: "branch",
    image: "https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
  }
]

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "THIS_IS_AN_EXAMPLE_SECRET_REPLACE_IT",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login/error"
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(user => user.email === credentials.email)
        
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
          }
        }
        
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  }
}

// Create a NextAuth handler
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// Export getServerSession for use in server components
export async function getServerSession() {
  return await getNextAuthServerSession(authOptions)
} 