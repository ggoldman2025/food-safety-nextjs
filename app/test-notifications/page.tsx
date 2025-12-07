"use client"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function TestNotifications() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const sendTestNotification = async (type: "email" | "sms" | "both") => {
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch("/api/test-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          email: "gtgoldman@gmail.com",
          phone: "+16318040212",
        }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error: any) {
      setResults({
        success: false,
        error: error.message,
      })
    } finally {
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
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Test Notifications</h1>
        <p className="text-lg text-gray-600 mb-8">Test email and SMS notification systems</p>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Send Test Notifications</h2>
          
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-700">Email:</p>
              <p className="text-lg font-semibold text-gray-900">gtgoldman@gmail.com</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-700">Phone:</p>
              <p className="text-lg font-semibold text-gray-900">+1 (631) 804-0212</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => sendTestNotification("email")}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sending..." : "Test Email"}
            </button>

            <button
              onClick={() => sendTestNotification("sms")}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sending..." : "Test SMS"}
            </button>

            <button
              onClick={() => sendTestNotification("both")}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sending..." : "Test Both"}
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Results</h2>
            
            {results.success ? (
              <div className="space-y-4">
                {results.results.email && (
                  <div className={`p-4 rounded-lg border ${results.results.email.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <h3 className="font-bold text-lg mb-2">📧 Email</h3>
                    {results.results.email.success ? (
                      <div>
                        <p className="text-green-700">✅ Email sent successfully!</p>
                        <p className="text-sm text-gray-600 mt-1">To: {results.results.email.to}</p>
                        <p className="text-sm text-gray-600">ID: {results.results.email.id}</p>
                      </div>
                    ) : (
                      <p className="text-red-700">❌ {results.results.email.error}</p>
                    )}
                  </div>
                )}

                {results.results.sms && (
                  <div className={`p-4 rounded-lg border ${results.results.sms.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <h3 className="font-bold text-lg mb-2">📱 SMS</h3>
                    {results.results.sms.success ? (
                      <div>
                        <p className="text-green-700">✅ SMS sent successfully!</p>
                        <p className="text-sm text-gray-600 mt-1">To: {results.results.sms.to}</p>
                        <p className="text-sm text-gray-600">SID: {results.results.sms.sid}</p>
                      </div>
                    ) : (
                      <p className="text-red-700">❌ {results.results.sms.error}</p>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-4">
                  Timestamp: {new Date(results.timestamp).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">❌ Error: {results.error}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
