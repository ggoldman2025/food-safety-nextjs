import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#581c87]">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-blue-300">Food Safety Plus</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link 
                href="/sign-in" 
                className="px-6 py-2 text-white hover:text-blue-300 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Centered */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-12">
          <ShieldCheck className="w-4 h-4 text-blue-300" />
          <span className="text-sm text-blue-200 font-medium">🔒 Official FDA & USDA Data</span>
        </div>

        {/* Main Headline - Centered */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <div className="text-white mb-3">Stay Informed About</div>
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Food Recalls
          </div>
        </h1>

        {/* Subheadline - Centered */}
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Get real-time alerts from FDA and USDA, plus direct access to recall pages from{" "}
          <span className="text-blue-400 font-semibold">75+ major grocery stores</span> and retailers.
        </p>

        {/* CTA Buttons - Centered */}
        <div className="flex gap-4 justify-center mb-6">
          <Link 
            href="/sign-up" 
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 text-lg font-semibold shadow-xl transition-all"
          >
            Start Free Trial
          </Link>
          <Link 
            href="/stores" 
            className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/5 text-lg font-semibold transition-all"
          >
            View Store Links
          </Link>
        </div>

        {/* Pricing - Centered */}
        <p className="text-gray-400 text-lg">
          Only <span className="text-blue-400 font-bold text-xl mx-1">$0.99/month</span> • Cancel anytime
        </p>
      </main>
    </div>
  );
}
