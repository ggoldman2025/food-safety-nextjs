import Link from "next/link";
import { ShieldCheck, Bell, Search, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#581c87]">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-40 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 border border-blue-400/30 rounded-full">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-200 font-medium">🔒 Official FDA & USDA Data</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <div className="text-white mb-4">Stay Informed About</div>
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Food Recalls
          </div>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Get real-time alerts from FDA and USDA, plus direct access to recall pages from{" "}
          <span className="text-blue-400 font-semibold">75+ major grocery stores</span> and retailers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-5 justify-center mb-8">
          <Link 
            href="/sign-up" 
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 text-lg font-semibold shadow-2xl transition-all"
          >
            Start Free Trial
          </Link>
          <Link 
            href="/stores" 
            className="px-10 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/10 text-lg font-semibold transition-all"
          >
            View Store Links
          </Link>
        </div>

        {/* Pricing */}
        <p className="text-gray-300 text-lg">
          Only <span className="text-blue-400 font-bold text-2xl mx-2">$0.99/month</span> • Cancel anytime
        </p>
        </div>
      </section>

      {/* Two Powerful Features Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-24">
          Two Powerful Features in One Service
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-8">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-5">
              Official Government Data
            </h3>
            <p className="text-gray-300 leading-relaxed text-xl">
              Automatic daily updates from FDA and USDA recall databases. Get alerts via email or SMS the moment new recalls are announced.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mb-8">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-5">
              Direct Store Links
            </h3>
            <p className="text-gray-300 leading-relaxed text-xl">
              Instant access to recall pages from 75+ major retailers including Walmart, Kroger, Costco, and more. No searching required.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Why Food Safety Plus Section */}
      <section className="relative py-32 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-24">
          Why Food Safety Plus?
        </h2>

        <div className="max-w-5xl mx-auto space-y-5">
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
              className="flex items-center gap-5 p-7 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <p className="text-white text-xl">{benefit}</p>
            </div>
           )}
        </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto p-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-white/10 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Stay Safe?</h2>
          <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
            Join thousands of families protecting their health with real-time food recall alerts
          </p>
          <div className="flex flex-wrap gap-5 justify-center mb-8">
            <Link 
              href="/sign-up" 
              className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 text-xl font-semibold shadow-2xl transition-all"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/stores" 
              className="px-12 py-5 bg-transparent text-white border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/10 text-xl font-semibold transition-all"
            >
              View All Stores
            </Link>
          </div>
          <p className="text-gray-400 text-base">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
            <span className="text-xl font-semibold text-white">Food Safety Plus</span>
          </div>
          <p className="text-gray-400 text-base max-w-3xl mx-auto mb-6 leading-relaxed">
            Food Safety Plus is an independent information service and is not affiliated with, endorsed by, or sponsored by the FDA, USDA, or any grocery store or retailer mentioned on this site.
          </p>
          <p className="text-gray-500 text-sm">© 2025 Food Safety Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
