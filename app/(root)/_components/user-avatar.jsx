'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { LogOut, User } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase.config"
import Link from "next/link"


const UserAvatar = () => {
  const { user } = useAuth()
  // console.log(user)
  
  const initials = user?.displayName?.split(' ').map(name => name[0]).join('')

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.photoURL} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex">
            <User className="size-4 mr-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}><LogOut className="size-4 mr-4" />Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAvatar