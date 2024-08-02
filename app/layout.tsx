import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import Providers from "./Provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Workflow",
  description: "Your go-to task manager"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
            <div>
              {children}  
            </div>
        <Toaster />
        </Providers>
      </body>
    </html>
  )
}
