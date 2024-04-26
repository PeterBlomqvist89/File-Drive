'use client'

import { useRouter } from "next/navigation"
import Header from "./_components/header"
import { useAuth } from "@/components/auth-provider"

function RootLayout({ children }) {

  const router = useRouter()

  const { user, authLoaded } = useAuth()

  if(!authLoaded) return null

  if(!user) router.push('/sign-in')


  return (
    <div>
      <Header />
      <main className="container">
        {children}
      </main>
    </div>
  )
}
export default RootLayout