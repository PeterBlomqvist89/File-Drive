import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import UserAvatar from "./user-avatar"

function Header() {
  return (
    <div className="h-14 border-b">
        <div className="container flex items-center justify-between h-full">
            <Link href="/files">FileDrive</Link>

            <div className="flex gap-4 items-center">
                <ModeToggle />
                <UserAvatar />
            </div>
        </div>
    </div>
  )
}
export default Header