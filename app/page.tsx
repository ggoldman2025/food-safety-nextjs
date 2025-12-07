import Link from "next/link";
import { ShieldCheck, Bell, Store } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Food Safety Plus</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/stores" className="text-gray-700 hover:text-blue-600 font-medium">Stores</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</Link>
              <Link href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Stay Safe with Real-Time Food Recall Alerts
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Access 24+ grocery store recall pages instantly. Get notified about FDA and USDA food recalls before they affect you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Get Started Free
            </Link>
            <Link href="/stores" className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 text-lg font-semibold transition-all">
              View Stores
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <Store className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">24+ Store Links</h3>
            <p className="text-gray-600 leading-relaxed">Instant access to recall pages from all major grocery stores</p>
          </div>
          <div className="p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <Bell className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Real-Time Alerts</h3>
            <p className="text-gray-600 leading-relaxed">Get notified immediately when new recalls are issued</p>
          </div>
          <div className="p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">FDA & USDA Data</h3>
            <p className="text-gray-600 leading-relaxed">Official recall information from government sources</p>
          </div>
        </div>
      </main>
    </div>
  );
}
