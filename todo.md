# Project TODO

## Completed
- [x] Convert to light theme with high contrast
- [x] Database seeded with 24 stores
- [x] User authentication (sign up, sign in, sign out)
- [x] Protected routes working

## In Progress
- [x] Fix Stripe integration - pricing page button routing
- [ ] Fix pricing page header to show user status when logged in
- [x] Implement email notification system (code ready)
- [x] Implement SMS notification system (code ready)
- [x] Sign up for Resend and get API key
- [x] Sign up for Twilio and get credentials
- [x] Configure API keys in Vercel
- [ ] Test email notification to gtgoldman@gmail.com
- [ ] Test SMS notification to 631-804-0212
- [ ] Verify Stripe checkout flow end-to-end
- [ ] Configure Stripe environment variables
- [ ] Test premium upgrade flow


## Stripe Payment System Fixes (URGENT)
- [x] Fix Stripe payment button not working (500 error with API key)
- [x] Update pricing from $9.99/month to $0.99/month
- [x] Verify Stripe TEST API keys are correctly loaded at runtime
- [ ] Test complete payment flow end-to-end with test card

## Notification System Debugging
- [ ] Check Vercel runtime logs for actual API errors
- [x] Verify Resend API key is valid and has correct permissions
- [x] Fix sender email to use verified domain (onboarding@resend.dev)
- [ ] Verify Twilio credentials are correct
- [ ] Fix any API configuration issues
- [ ] Test email delivery to gtgoldman@gmail.com
- [ ] Test SMS delivery to 631-804-0212


## Clerk Authentication Integration (NEW)
- [ ] Install @clerk/nextjs package
- [ ] Add Clerk provider to root layout
- [ ] Create Clerk middleware for route protection
- [ ] Replace /signin page with Clerk SignIn component
- [ ] Replace /signup page with Clerk SignUp component
- [ ] Update dashboard to use Clerk user data
- [ ] Add sign out functionality
- [ ] Configure Google OAuth provider
- [ ] Configure Apple OAuth provider
- [ ] Test complete auth flow

## Database Setup (CRITICAL)
- [ ] Create Vercel Postgres database
- [ ] Add DATABASE_URL to environment variables
- [ ] Run Prisma migrations
- [ ] Test database connection

## Custom Domain Setup
- [ ] Purchase or configure custom domain
- [ ] Add domain to Vercel project
- [ ] Configure DNS records
- [ ] Wait for SSL certificate
