import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import Link from "next/link"

function LandingPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">Welcome to the File Drive</h1>
      <p className="text-lg mt-10 text-muted-foreground">Upload and share files with ease</p>
      <div className="flex gap-8 mt-20">
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>

        <Button variant="ghost">Learn more <MoveRight className="size-5 ml-3" /></Button>
      </div>
    </main>
  )
}
export default LandingPage