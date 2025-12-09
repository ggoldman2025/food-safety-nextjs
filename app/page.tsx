"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Search, Check, Shield, Zap, Clock, Globe, Lock } from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${(typeof window !== 'undefined' ? window.innerWidth : 1920 - mousePosition.x) / 10}px`,
            bottom: `${(typeof window !== 'undefined' ? window.innerHeight : 1080 - mousePosition.y) / 10}px`,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            animationDelay: "1s",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Food Safety Plus
            </span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/recalls">
              <button className="px-6 py-2.5 rounded-xl border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm">
                Recalls
              </button>
            </Link>
            <Link href="/stores">
              <button className="px-6 py-2.5 rounded-xl border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm">
                Stores
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="px-6 py-2.5 rounded-xl border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 font-semibold">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div
          className="transform transition-all duration-700"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 animate-pulse shadow-lg shadow-blue-500/20">
            <Lock className="w-4 h-4 text-blue-300" />
            <span className="text-blue-200 text-sm font-semibold tracking-wide">
              Official FDA & USDA Data
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            Stay Informed About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Food Recalls
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-4xl mx-auto leading-relaxed font-light">
            Get real-time alerts from FDA and USDA, plus direct access to recall
            pages from <span className="text-blue-400 font-semibold">75+ major grocery stores</span> and retailers.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
            <Link href="/signin">
              <button className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden">
                <span className="relative z-10 font-bold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Free Trial
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Link>
            <Link href="/stores">
              <button className="px-10 py-5 rounded-2xl border-2 border-white/30 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 font-bold text-lg flex items-center gap-2">
                <Globe className="w-5 h-5" />
                View Store Links
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <p className="text-lg">
              Only <span className="text-blue-400 font-bold text-xl">$0.99/month</span> • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative z-10 container mx-auto px-6 py-24"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <h2 className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Two Powerful Features in One Service
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            <div className="relative z-10">
              <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-blue-500/50">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-5 bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Official Government Data
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Automatic daily updates from FDA and USDA recall databases. Get
                alerts via email or SMS the moment new recalls are announced.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            <div className="relative z-10">
              <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-purple-500/50">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-5 bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                Direct Store Links
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Instant access to recall pages from 75+ major retailers including
                Walmart, Kroger, Costco, and more. No searching required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Why Food Safety Plus?
        </h2>

        <div className="max-w-4xl mx-auto space-y-5">
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
              className="group flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-green-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform duration-500 shadow-lg shadow-green-500/50">
                <Check className="w-6 h-6 text-white font-bold" />
              </div>
              <p className="text-gray-100 text-lg font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 text-center mb-20 text-xl">
          One price. All features. No hidden fees.
        </p>

        <div className="max-w-lg mx-auto">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-gradient bg-[length:200%_auto]" />
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-white/20 shadow-2xl">
              <div className="text-center mb-10">
                <div className="text-7xl font-black mb-3">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    $0.99
                  </span>
                </div>
                <p className="text-gray-400 text-xl font-medium">per month</p>
              </div>

              <ul className="space-y-5 mb-10">
                {[
                  "FDA & USDA recall alerts",
                  "Email & SMS notifications",
                  "75+ store recall links",
                  "Search & filter recalls",
                  "Mobile-optimized dashboard",
                  "Cancel anytime",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/pricing" className="block">
                <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                  Start Your Free Trial
                </button>
              </Link>

              <p className="text-center text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                7-day free trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-blue-400" />
            Important Disclosure
          </h3>
          <div className="space-y-5 text-base text-gray-300 leading-relaxed">
            <p>
              Food Safety Plus is an independent information service and is not
              affiliated with, endorsed by, or sponsored by the FDA, USDA, or any
              grocery store or retailer mentioned on this site.
            </p>
            <p>
              All recall data is sourced from publicly available FDA and USDA
              databases. Store links are provided for convenience and direct users
              to official company recall pages. We do not scrape, modify, or store
              proprietary data from retailers.
            </p>
            <p>
              This service provides information only and should not be considered
              medical or legal advice. Always verify recall information with
              official sources and consult healthcare professionals for
              health-related concerns.
            </p>
            <p>
              By using this service, you acknowledge that Food Safety Plus is not
              responsible for the accuracy, completeness, or timeliness of
              third-party information, including government databases and retailer
              websites.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-xl">Food Safety Plus</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your trusted source for food recall alerts and safety information.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-5 text-lg">Product</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Store Links
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-5 text-lg">Legal</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-5 text-lg">Support</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>© 2024 Food Safety Plus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
