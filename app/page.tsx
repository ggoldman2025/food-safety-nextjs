import Link from "next/link";
import { ShieldCheck, Bell, Store, Search, Zap, Clock, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Food Safety Plus
              </span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/recalls" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Recalls
              </Link>
              <Link href="/stores" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Stores
              </Link>
              <Link href="/sign-in" className="px-5 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-indigo-100/30 to-purple-100/50 animate-gradient"></div>
        
        {/* Floating orbs for cinematic effect */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Official FDA & USDA Data</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="block text-gray-900">Stay Informed About</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Food Recalls
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get real-time alerts from FDA and USDA, plus direct access to recall pages from{" "}
              <span className="font-semibold text-blue-600">75+ major grocery stores</span> and retailers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/sign-up" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Free Trial
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link href="/stores" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg">
                View Store Links
              </Link>
            </div>

            {/* Pricing Info */}
            <div className="flex items-center justify-center gap-2 text-gray-600 pt-2">
              <Clock className="w-5 h-5" />
              <p className="text-lg">
                Only <span className="font-bold text-blue-600 text-xl">$0.99/month</span> • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Two Powerful Features in One Service
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay informed about food safety in one simple platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 - Government Data */}
            <div className="group relative p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Official Government Data
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Automatic daily updates from FDA and USDA recall databases. Get alerts via email or SMS the moment new recalls are announced.
                </p>
              </div>
            </div>

            {/* Feature 2 - Store Links */}
            <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Direct Store Links
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Instant access to recall pages from 75+ major retailers including Walmart, Kroger, Costco, and more. No searching required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Food Safety Plus?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most comprehensive food recall platform available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Real-time alerts from FDA and USDA - never miss a recall",
              "Search and filter recalls by product, company, or date",
              "Direct links to 75+ grocery store recall pages",
              "Email and SMS notifications (your choice)",
              "Mobile-optimized for on-the-go access",
              "Simple $0.99/month - cancel anytime",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Stay Safe?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of families protecting their health with real-time food recall alerts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl">
              Start Free Trial
            </Link>
            <Link href="/stores" className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              View All Stores
            </Link>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">Food Safety Plus</span>
            </div>
            <p className="text-sm max-w-2xl mx-auto mb-6">
              Food Safety Plus is an independent information service and is not affiliated with, endorsed by, or sponsored by the FDA, USDA, or any grocery store or retailer mentioned on this site.
            </p>
            <p className="text-xs">
              © 2025 Food Safety Plus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>


    </div>
  );
}
