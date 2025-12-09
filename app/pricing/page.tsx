"use client";

import Link from "next/link";
import { Check, Zap, Shield, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Food Safety Plus
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/stores">
              <button className="px-6 py-2.5 rounded-xl border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm">
                Stores
              </button>
            </Link>
            <Link href="/signin">
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 font-semibold">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          One price. All features. No hidden fees.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 shadow-xl">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-3">Free</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">$0</span>
                <span className="text-gray-400 text-xl">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Access to all 24+ store links",
                "View FDA/USDA recalls",
                "Basic search functionality",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/signin" className="block">
              <button className="w-full py-4 rounded-2xl border-2 border-white/20 hover:bg-white/10 hover:border-white/40 font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Premium Plan with PayPal */}
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-sm shadow-lg">
                POPULAR
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-75 animate-gradient bg-[length:200%_auto]" />
            
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-white/20 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-3">Premium</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">$0.99</span>
                  <span className="text-gray-400 text-xl">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Everything in Free",
                  "Real-time email alerts",
                  "Custom notifications",
                  "Priority support",
                  "Advanced search & filters",
                  "Mobile app access",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* PayPal Subscribe Button */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" className="mb-4">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="SHHL9MDJVKZGQ" />
                <input type="hidden" name="currency_code" value="USD" />
                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3"
                >
                  <Zap className="w-6 h-6" />
                  Subscribe with PayPal
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel your subscription at any time with no penalties or fees. Your access will continue until the end of your billing period."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards and PayPal for your convenience and security."
            },
            {
              q: "Is there a free trial?",
              a: "Yes! All new Premium subscriptions include a 7-day free trial. No credit card required to start."
            },
            {
              q: "How often is the recall data updated?",
              a: "We check FDA and USDA databases multiple times daily to ensure you get the most up-to-date recall information."
            },
          ].map((faq, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-blue-300">{faq.q}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20">
          <h2 className="text-4xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of families staying safe with Food Safety Plus
          </p>
          <Link href="/signin">
            <button className="px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 font-bold text-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 inline-flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Start Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 Food Safety Plus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
