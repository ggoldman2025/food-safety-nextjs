"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

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
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <Link href="/" className="text-xl font-bold">Food Safety Plus</Link>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 rounded">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Grocery Store Recall Pages</h1>
        
        {loading ? (
          <p>Loading stores...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{store.name}</h3>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 mt-2">{store.category}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
