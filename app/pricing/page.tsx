import Link from "next/link"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <Link href="/" className="text-xl font-bold">Food Safety Plus</Link>
          <Link href="/signin" className="px-4 py-2 bg-blue-600 rounded">Sign In</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Simple Pricing</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li>✓ Access to all 24+ store links</li>
              <li>✓ View FDA/USDA recalls</li>
              <li>✓ Basic search</li>
            </ul>
            <Link href="/signup" className="block text-center px-6 py-3 bg-gray-800 rounded hover:bg-gray-700">
              Get Started
            </Link>
          </div>

          <div className="p-8 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg border-2 border-blue-500">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-400">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li>✓ Everything in Free</li>
              <li>✓ Real-time email alerts</li>
              <li>✓ Custom notifications</li>
              <li>✓ Priority support</li>
            </ul>
            <Link href="/signup" className="block text-center px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
