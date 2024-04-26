'use client'

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { db, storage } from "@/firebase.config"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { Download, MoreVertical, Save, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

const ActionsDropdown = ({downloadURL, id, filename}) => {

  const { user } = useAuth()

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadURL)
    toast.success('Download URL added to clipboard')
  }

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting file...')
    try {
      
      // Ta bort filen från storage
      const fileRef = ref(storage, `users/${user.uid}/files/${filename}`)
      await deleteObject(fileRef)

      // Ta bort documentet från databasen
      const docRef = doc(db, 'users', user.uid, 'files', id)
      await deleteDoc(docRef)
      
      toast.success('File deleted', { id: toastId })

    } catch (err) {
      console.log(err.message)
      toast.error('Could not delete the file', { id: toastId })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChlid>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href={downloadURL} download target="_blank" className="flex gap-4 items-center">
            <Download className="size-4" /> Download
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}><Save className="size-4 mr-4" /> Copy download url</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-500"><Trash2 className="size-4 mr-4" /> Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
export default ActionsDropdown