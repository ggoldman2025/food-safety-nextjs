'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SSOCallback() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Completing sign up...</p>
      </div>
      <AuthenticateWithRedirectCallback
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  )
}
