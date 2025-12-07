"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function Pricing() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!session) {
      // Redirect to signup if not logged in
      window.location.href = "/signup"
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Failed to create checkout session. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Food Safety Plus</span>
          </Link>
          {session ? (
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Dashboard</Link>
          ) : (
            <Link href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Sign In</Link>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Simple Pricing</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">Choose the plan that works best for you</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-lg border-2 border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Free</h2>
            <p className="text-4xl font-bold mb-6 text-gray-900">$0<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Access to all 24+ store links</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>View FDA/USDA recalls</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Basic search</span>
              </li>
            </ul>
            <Link href="/signup" className="block text-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium border-2 border-gray-300 transition-all">
              Get Started
            </Link>
          </div>

          <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg border-2 border-blue-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Premium</h2>
            <p className="text-4xl font-bold mb-6 text-white">$9.99<span className="text-lg text-blue-100">/month</span></p>
            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">✓</span>
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">✓</span>
                <span>Real-time email alerts</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">✓</span>
                <span>Custom notifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Upgrade to Premium"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
