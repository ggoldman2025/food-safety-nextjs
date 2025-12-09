"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, Store, ShieldCheck } from "lucide-react";

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/stores')
      .then(res => res.json())
      .then(data => {
        setStores(data);
        setLoading(false);
      });
  }, []);

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🛡️</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Food Safety Plus
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/pricing">
              <button className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                Pricing
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Store Recall Pages
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Direct links to official recall pages from 24+ major retailers
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Store Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading stores...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-medium">
                    {store.category}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && filteredStores.length === 0 && (
          <div className="text-center py-20">
            <Store className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No stores found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md bg-white/5 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
          © 2024 Food Safety Plus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
