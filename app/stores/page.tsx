"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink, ShieldCheck } from "lucide-react"

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stores')
      .then(res => res.json())
      .then(data => {
        setStores(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Food Safety Plus</span>
          </Link>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Grocery Store Recall Pages</h1>
        <p className="text-lg text-gray-600 mb-8">Direct links to official recall pages from major grocery stores and retailers</p>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading stores...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">{store.category}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
