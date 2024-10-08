"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from './context/UserContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </UserProvider>
  )
}
