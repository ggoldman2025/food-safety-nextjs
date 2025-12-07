import Link from "next/link";
import { ShieldCheck, Bell, Store } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">Food Safety Plus</span>
            </div>
            <div className="flex gap-4">
              <Link href="/stores" className="hover:text-blue-400">Stores</Link>
              <Link href="/pricing" className="hover:text-blue-400">Pricing</Link>
              <Link href="/signin" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Stay Safe with Real-Time Food Recall Alerts
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Access 24+ grocery store recall pages instantly. Get notified about FDA and USDA food recalls before they affect you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-lg font-semibold">
              Get Started Free
            </Link>
            <Link href="/stores" className="px-8 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg font-semibold">
              View Stores
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
            <Store className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">24+ Store Links</h3>
            <p className="text-gray-400">Instant access to recall pages from all major grocery stores</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
            <Bell className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-Time Alerts</h3>
            <p className="text-gray-400">Get notified immediately when new recalls are issued</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
            <ShieldCheck className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">FDA & USDA Data</h3>
            <p className="text-gray-400">Official recall information from government sources</p>
          </div>
        </div>
      </main>
    </div>
  );
}
