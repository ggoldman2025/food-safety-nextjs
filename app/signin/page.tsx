"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl border-2 border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-900"
              required
            />
          </div>
          {error && <p className="text-red-600 font-medium">{error}</p>}
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
