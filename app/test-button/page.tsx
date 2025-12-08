"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"

export default function TestButton() {
  const { data: session, status } = useSession()
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    console.log(message)
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // TEST 1: Basic button click
  const test1_BasicClick = () => {
    addResult("✅ TEST 1 PASSED: Basic button click works!")
    alert("✅ Basic click works!")
  }

  // TEST 2: State update
  const test2_StateUpdate = () => {
    addResult("✅ TEST 2 PASSED: React state update works!")
  }

  // TEST 3: Session check
  const test3_SessionCheck = () => {
    addResult(`📋 TEST 3: Session status = ${status}`)
    addResult(`📋 TEST 3: Session data = ${session ? JSON.stringify(session.user) : 'null'}`)
    if (session) {
      addResult("✅ TEST 3 PASSED: Session is loaded!")
    } else {
      addResult("❌ TEST 3 FAILED: No session found!")
    }
  }

  // TEST 4: Fetch API (no auth required)
  const test4_FetchAPI = async () => {
    addResult("🔵 TEST 4: Testing basic fetch...")
    try {
      const response = await fetch("https://api.github.com/zen")
      const data = await response.text()
      addResult(`✅ TEST 4 PASSED: Fetch works! Response: ${data}`)
    } catch (error) {
      addResult(`❌ TEST 4 FAILED: ${error}`)
    }
  }

  // TEST 5: Call Stripe API without checking session
  const test5_StripeAPINoAuth = async () => {
    addResult("🔵 TEST 5: Calling Stripe API (ignoring auth)...")
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      addResult(`📡 TEST 5: Response status = ${response.status}`)
      const data = await response.json()
      addResult(`📦 TEST 5: Response data = ${JSON.stringify(data)}`)
      
      if (response.ok && data.url) {
        addResult("✅ TEST 5 PASSED: Stripe API returned checkout URL!")
      } else {
        addResult(`⚠️ TEST 5: API responded but with error: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      addResult(`❌ TEST 5 FAILED: ${error}`)
    }
  }

  // TEST 6: Full flow (check session, then call API)
  const test6_FullFlow = async () => {
    addResult("🔵 TEST 6: Testing full payment flow...")
    
    // Check session first
    if (!session) {
      addResult("❌ TEST 6 FAILED: No session - would redirect to signup")
      alert("Not logged in! Redirecting to signup...")
      return
    }
    
    addResult(`✅ TEST 6: Session exists for ${session.user?.email}`)
    
    // Call API
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      })
      
      addResult(`📡 TEST 6: API response status = ${response.status}`)
      const data = await response.json()
      addResult(`📦 TEST 6: API response = ${JSON.stringify(data)}`)
      
      if (data.url) {
        addResult("✅ TEST 6 PASSED: Got Stripe checkout URL!")
        addResult(`🔗 Checkout URL: ${data.url}`)
        // Don't redirect, just show the URL
        alert(`Success! Checkout URL: ${data.url}`)
      } else {
        addResult(`❌ TEST 6 FAILED: No checkout URL in response`)
      }
    } catch (error) {
      addResult(`❌ TEST 6 FAILED: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">🔬 Payment System Diagnostic Suite</h1>
      <p className="text-lg mb-8 text-gray-700">Testing each component in isolation to find the failure point</p>
      
      {/* Session Status */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Current Session Status:</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>User:</strong> {session?.user?.email || 'Not logged in'}</p>
      </div>

      {/* Test Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={test1_BasicClick}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
        >
          TEST 1: Basic Click
        </button>

        <button
          onClick={test2_StateUpdate}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
        >
          TEST 2: State Update
        </button>

        <button
          onClick={test3_SessionCheck}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold"
        >
          TEST 3: Session Check
        </button>

        <button
          onClick={test4_FetchAPI}
          className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-bold"
        >
          TEST 4: Fetch API
        </button>

        <button
          onClick={test5_StripeAPINoAuth}
          className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold"
        >
          TEST 5: Stripe API (No Auth)
        </button>

        <button
          onClick={test6_FullFlow}
          className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold"
        >
          TEST 6: Full Payment Flow
        </button>
      </div>

      {/* Results Log */}
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
        <h2 className="text-xl font-bold mb-4 text-white">📋 Test Results Log:</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">No tests run yet. Click a test button above.</p>
        ) : (
          <div className="space-y-1">
            {results.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h3 className="font-bold text-xl mb-2">📖 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Run tests in order</strong> (1 → 6)</li>
          <li><strong>Watch the log below</strong> for results</li>
          <li><strong>Open browser console</strong> (F12) for additional details</li>
          <li><strong>First failure point</strong> = root cause of payment button issue</li>
        </ol>
      </div>
    </div>
  )
}
