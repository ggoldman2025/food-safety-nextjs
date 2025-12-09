"use client"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { ShieldCheck, Store, Bell } from "lucide-react"

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <p className="text-gray-700 text-lg">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Food Safety Plus</span>
          </Link>
          <SignOutButton>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Welcome, {user?.primaryEmailAddress?.emailAddress || user?.firstName || 'User'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/stores" className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all">
            <Store className="w-10 h-10 text-blue-600 mb-3" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">View All Stores</h2>
            <p className="text-gray-600">Access 24+ grocery store recall pages</p>
          </Link>

          <div className="p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md">
            <Bell className="w-10 h-10 text-blue-600 mb-3" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Recent Recalls</h2>
            <p className="text-gray-600">No recent recalls</p>
          </div>
        </div>
      </main>
    </div>
  )
}
