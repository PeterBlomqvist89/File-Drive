'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useAuth } from "@/components/auth-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { storage } from "@/firebase.config"

function ProfilePage() {

  const { user } = useAuth()
  const initials = user?.displayName?.split(' ').map(name => name[0]).join('')

  const imageRef = useRef()
  const [loading, setLoading] = useState(false)

  const uploadFile = async (file, toastId) => {
    if(loading) return
    setLoading(true)
    console.log(file)
    try {
      const fileRef = ref(storage, `users/${user.uid}/profile.${file.name.split('.')[1]}`)

      const result = await uploadBytes(fileRef, file)

      const downloadURL = await getDownloadURL(fileRef)

      await updateProfile(user, {
        photoURL: downloadURL
      })

      toast.success('profile updated', { id: toastId })

    } catch (err) {
      console.error(err.message)
      toast.error('Failed to upload the file, please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }



  const handleImageChange = e => {
    e.preventDefault()

    const file = imageRef.current.files[0]
    const reader = new FileReader()

    const toastId = toast.loading('Uploading profile picture...')
    reader.onabort = () => toast.error('file reading was aborted', { id: toastId })
    reader.onerror = () => toast.error('file reading has failed', { id: toastId })
    reader.onload = async () => {
      await uploadFile(file, toastId)
    }
    reader.readAsArrayBuffer(file)
  }


  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-10">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 gap-y-4">
        <div className="flex items-end justify-between gap-4">
        <Avatar>
          <AvatarImage src={user?.photoURL} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div>
          <form onSubmit={handleImageChange} className="flex gap-2 items-end">
            <div>
              <Label htmlFor="profileImage">Click to update your profile image</Label>
              <Input ref={imageRef} id="profileImage" type="file" />
            </div>
            <Button>Change</Button>
          </form>
        </div>
        </div>

        <div></div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Email:</p>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Display Name:</p>
          <p className="text-muted-foreground">{user.displayName}</p>
        </div>

      </div>
    </div>
  )
}
export default ProfilePage