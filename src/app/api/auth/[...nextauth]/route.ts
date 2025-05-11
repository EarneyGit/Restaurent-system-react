import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { User } from "next-auth"

// Extend the types for role
interface ExtendedJWT extends JWT {
  role?: string
  branchId?: string
}

// Extend the User type
interface ExtendedUser extends User {
  role?: string
  branchId?: string
}

// Extend session with role
interface ExtendedSession extends Omit<Session, 'user'> {
  user: ExtendedUser
}

// Mock user database with added branch users
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
    branchId: "branch-001",
    image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
  }
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Find user
        const user = users.find(user => user.email === credentials?.email)
        
        // Verify credentials
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            branchId: user.branchId || null
          }
        }
        
        // Authentication failed
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role and branchId to JWT token
      if (user) {
        (token as ExtendedJWT).role = (user as any).role
        if ((user as any).branchId) {
          (token as ExtendedJWT).branchId = (user as any).branchId
        }
      }
      return token as ExtendedJWT
    },
    async session({ session, token }) {
      // Add role and branchId to session
      const extendedSession = session as ExtendedSession
      if (extendedSession.user) {
        extendedSession.user.role = (token as ExtendedJWT).role
        if ((token as ExtendedJWT).branchId) {
          extendedSession.user.branchId = (token as ExtendedJWT).branchId
        }
      }
      return extendedSession
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "a-default-secret-for-development-only"
})

export { handler as GET, handler as POST } 