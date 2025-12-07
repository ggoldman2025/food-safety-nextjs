import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import twilio from "twilio"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null

export async function POST(req: NextRequest) {
  try {
    const { type, email, phone } = await req.json()

    const results: any = {
      email: null,
      sms: null,
    }

    // Test Email Notification
    if (type === "email" || type === "both") {
      if (!resend) {
        results.email = {
          success: false,
          error: "Resend not configured. Set RESEND_API_KEY",
        }
      } else {
        try {
        const emailResult = await resend.emails.send({
          from: "Food Safety Plus <notifications@foodsafetyplus.com>",
          to: [email || "gtgoldman@gmail.com"],
          subject: "🔔 Test Notification - Food Safety Plus",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">Food Safety Plus - Test Notification</h1>
              <p style="font-size: 16px; color: #374151;">This is a test notification from your Food Safety Plus deployment.</p>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #1e40af; margin-top: 0;">✅ Email System Working!</h2>
                <p style="color: #1e3a8a;">Your email notification system is configured correctly and ready to send alerts.</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 14px; color: #6b7280;">
                  This test was triggered from your Vercel deployment.<br>
                  Time: ${new Date().toLocaleString()}<br>
                  Environment: Production
                </p>
              </div>
            </div>
          `,
        })

        results.email = {
          success: true,
          id: emailResult.data?.id,
          to: email || "gtgoldman@gmail.com",
        }
      } catch (error: any) {
        results.email = {
          success: false,
          error: error.message,
        }
        }
      }
    }

    // Test SMS Notification
    if (type === "sms" || type === "both") {
      if (!twilioClient) {
        results.sms = {
          success: false,
          error: "Twilio not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN",
        }
      } else {
        try {
          const message = await twilioClient.messages.create({
            body: `🔔 Food Safety Plus Test Alert\n\nYour SMS notification system is working! This test was sent at ${new Date().toLocaleTimeString()}.\n\nDeployment: Vercel Production\nStatus: ✅ Active`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone || "+16318040212",
          })

          results.sms = {
            success: true,
            sid: message.sid,
            to: phone || "+16318040212",
          }
        } catch (error: any) {
          results.sms = {
            success: false,
            error: error.message,
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Notification test error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to send test notification" },
      { status: 500 }
    )
  }
}
