import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import Stripe from "stripe"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe at RUNTIME to ensure fresh environment variables
    // Use STRIPE_SK_TEST to bypass Vercel's cached STRIPE_SECRET_KEY
    const stripeKey = process.env.STRIPE_SK_TEST || process.env.STRIPE_SECRET_KEY
    
    if (!stripeKey) {
      console.error('[Stripe Error] No Stripe key found in environment variables')
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      )
    }

    // Log key info for debugging (only first/last 4 chars)
    console.log('[Stripe Init] Key length:', stripeKey.length)
    console.log('[Stripe Init] Key starts with:', stripeKey.substring(0, 15))
    console.log('[Stripe Init] Key ends with:', stripeKey.substring(stripeKey.length - 4))

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-11-17.clover",
    })

    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      customer_email: session.user.email,
      metadata: {
        userEmail: session.user.email,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
