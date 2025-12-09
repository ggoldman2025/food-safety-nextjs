import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  // Get the webhook body
  const body = await req.text()
  
  // Get the Svix headers for verification
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    })
  }

  // Parse the webhook event
  let evt: WebhookEvent
  try {
    evt = JSON.parse(body) as WebhookEvent
  } catch (err) {
    console.error('Error parsing webhook:', err)
    return new Response('Error parsing webhook', { status: 400 })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    try {
      // Calculate trial end date (7 days from now)
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 7)

      // Create user in database
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
          name: `${first_name || ''} ${last_name || ''}`.trim() || null,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          isPremium: false,
          subscriptionStatus: 'trial',
          trialEndsAt: trialEndsAt,
        },
      })

      console.log('✅ User created in database:', id)
    } catch (error) {
      console.error('Error creating user in database:', error)
      // Don't return error to Clerk - we'll handle this gracefully
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    try {
      // Update user in database
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0]?.email_address || undefined,
          name: `${first_name || ''} ${last_name || ''}`.trim() || undefined,
          firstName: first_name || undefined,
          lastName: last_name || undefined,
          imageUrl: image_url || undefined,
        },
      })

      console.log('✅ User updated in database:', id)
    } catch (error) {
      console.error('Error updating user in database:', error)
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      // Delete user from database
      await prisma.user.delete({
        where: { clerkId: id },
      })

      console.log('✅ User deleted from database:', id)
    } catch (error) {
      console.error('Error deleting user from database:', error)
    }
  }

  return new Response('Webhook received', { status: 200 })
}
