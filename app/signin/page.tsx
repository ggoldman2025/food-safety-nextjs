"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse delay-1000" />
      </div>

      {/* Sign In Card */}
      <div className="relative z-10 max-w-md w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 backdrop-blur-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block w-16 h-16 mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🛡️</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sign In
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-400/30">
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
