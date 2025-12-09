import Link from "next/link";
import { ShieldCheck, Bell, Search, CheckCircle2 } from "lucide-react";

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
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
        </div>

        {/* Two Powerful Features Section */}
        <div className="py-16">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Two Powerful Features in One Service
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 - Official Government Data */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Official Government Data
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Automatic daily updates from FDA and USDA recall databases. Get alerts via email or SMS the moment new recalls are announced.
              </p>
            </div>

            {/* Feature 2 - Direct Store Links */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Direct Store Links
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Instant access to recall pages from 75+ major retailers including Walmart, Kroger, Costco, and more. No searching required.
              </p>
            </div>
          </div>
        </div>

        {/* Why Food Safety Plus Section */}
        <div className="py-16">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Why Food Safety Plus?
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              "Real-time alerts from FDA and USDA - never miss a recall",
              "Search and filter recalls by product, company, or date",
              "Direct links to 75+ grocery store recall pages",
              "Email and SMS notifications (your choice)",
              "Mobile-optimized for on-the-go access",
              "Simple $0.99/month - cancel anytime"
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-white text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-20 text-center">
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Stay Safe?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of families protecting their health with real-time food recall alerts
            </p>
            <div className="flex gap-4 justify-center mb-6">
              <Link 
                href="/sign-up" 
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 text-lg font-semibold shadow-xl transition-all"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/stores" 
                className="px-10 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/5 text-lg font-semibold transition-all"
              >
                View All Stores
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              7-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-white">Food Safety Plus</span>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-4">
            Food Safety Plus is an independent information service and is not affiliated with, endorsed by, or sponsored by the FDA, USDA, or any grocery store or retailer mentioned on this site.
          </p>
          <p className="text-gray-500 text-xs">© 2025 Food Safety Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
