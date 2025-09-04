
import '../styles/globals.css'

import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/lib/theme'

export const metadata = {
  title: 'Financial Dashboard',
  description: 'Next.js + Tailwind + Recharts dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="container py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
