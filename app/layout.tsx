import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Food Safety Plus",
  description: "Real-time food recall alerts and grocery store links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
