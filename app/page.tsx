import Link from "next/link";
import { ShieldCheck, Bell, Search, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e40af]">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-300" />
              <span className="text-xl font-semibold text-blue-200">Food Safety Plus</span>
            </Link>
            <div className="flex gap-6 items-center">
              <Link 
                href="/sign-in" 
                className="px-6 py-2.5 text-white/90 hover:text-white font-medium transition-colors rounded-lg border border-white/30"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-semibold transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-8 text-center">
          {/* Badge */}
          <div className="flex justify-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-800/40 border border-blue-600/40 rounded-full">
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              <span className="text-sm text-blue-100 font-medium">🔒 Official FDA & USDA Data</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-7xl font-bold leading-[1.3] mb-12">
            <div className="text-white mb-10">Stay Informed About</div>
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Food Recalls
            </div>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl text-gray-200 mb-20 leading-[1.6] max-w-4xl mx-auto">
            Get real-time alerts from FDA and USDA, plus direct access to recall pages from{" "}
            <span className="text-blue-200 font-medium">75+ major grocery stores</span> and retailers.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center mb-16">
            <Link 
              href="/sign-up" 
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 text-lg font-semibold shadow-xl transition-all"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/stores" 
              className="px-10 py-4 bg-transparent text-white border-2 border-white/40 rounded-xl hover:border-white/60 hover:bg-white/10 text-lg font-semibold transition-all"
            >
              View Store Links
            </Link>
          </div>

          {/* Pricing */}
          <p className="text-gray-300 text-lg">
            Only <span className="text-blue-200 font-semibold text-xl mx-1">$0.99/month</span> • Cancel anytime
          </p>
        </div>
      </section>

      {/* Two Powerful Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-white text-center mb-24 leading-tight">
            Two Powerful Features in One Service
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="p-14 bg-blue-800/30 backdrop-blur-sm rounded-3xl border border-blue-600/30 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-10 mx-auto">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
                Official Government Data
              </h3>
              <p className="text-gray-200 leading-[1.7] text-lg">
                Automatic daily updates from FDA and USDA recall databases. Get alerts via email or SMS the moment new recalls are announced.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-14 bg-blue-800/30 backdrop-blur-sm rounded-3xl border border-blue-600/30 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-10 mx-auto">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
                Direct Store Links
              </h3>
              <p className="text-gray-200 leading-[1.7] text-lg">
                Instant access to recall pages from 75+ major retailers including Walmart, Kroger, Costco, and more. No searching required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Food Safety Plus Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-white text-center mb-24 leading-tight">
            Why Food Safety Plus?
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">
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
                className="flex items-center gap-8 p-10 bg-blue-800/30 backdrop-blur-sm rounded-2xl border border-blue-600/30"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-xl leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-5xl mx-auto p-20 bg-gradient-to-r from-blue-800/40 to-purple-800/40 backdrop-blur-sm rounded-3xl border border-blue-600/30 text-center">
            <h2 className="text-5xl font-bold text-white mb-10 leading-tight">Ready to Stay Safe?</h2>
            <p className="text-2xl text-gray-200 mb-16 leading-[1.6]">
              Join thousands of families protecting their health with real-time food recall alerts
            </p>
            <div className="flex gap-6 justify-center mb-16">
              <Link 
                href="/sign-up" 
                className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 text-xl font-semibold shadow-xl transition-all"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/stores" 
                className="px-12 py-5 bg-transparent text-white border-2 border-white/40 rounded-xl hover:border-white/60 hover:bg-white/10 text-xl font-semibold transition-all"
              >
                View All Stores
              </Link>
            </div>
            <p className="text-gray-300 text-base">
              7-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <ShieldCheck className="w-7 h-7 text-blue-300" />
            <span className="text-xl font-semibold text-white">Food Safety Plus</span>
          </div>
          <p className="text-gray-300 text-base max-w-3xl mx-auto mb-10 leading-[1.7]">
            Food Safety Plus is an independent information service and is not affiliated with, endorsed by, or sponsored by the FDA, USDA, or any grocery store or retailer mentioned on this site.
          </p>
          <p className="text-gray-400 text-sm">© 2025 Food Safety Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
