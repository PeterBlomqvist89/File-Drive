'use client'

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

function AuthLayout({ children }) {

  const router = useRouter()

  const { user, authLoaded } = useAuth()

  if(!authLoaded) return null

  if(user) router.push('/files')

  return (
    <div className="h-screen flex items-center justify-center">
      { children }
    </div>
  )
}
export default AuthLayout