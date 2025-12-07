"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading") return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <Link href="/" className="text-xl font-bold">Food Safety Plus</Link>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-600 rounded">Sign Out</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome, {session?.user?.email}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/stores" className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500">
            <h2 className="text-2xl font-bold mb-2">View All Stores</h2>
            <p className="text-gray-400">Access 24+ grocery store recall pages</p>
          </Link>

          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-2">Recent Recalls</h2>
            <p className="text-gray-400">No recent recalls</p>
          </div>
        </div>
      </main>
    </div>
  )
}
