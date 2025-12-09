import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to access Food Safety Plus</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-white/20 hover:bg-white/30 text-white border-white/30",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionLink: "text-blue-400 hover:text-blue-300",
              formFieldLabel: "text-gray-200",
              formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-gray-400",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-blue-400",
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  )
}
