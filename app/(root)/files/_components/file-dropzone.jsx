'use client'
import { useAuth } from "@/components/auth-provider"
import { db, storage } from "@/firebase.config"
import { cn } from "@/lib/utils"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import Dropzone from "react-dropzone"
import toast from "react-hot-toast"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const FileDropzone = () => {

  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const uploadFile = async (file, toastId) => {
    if(loading) return
    setLoading(true)
    console.log(file)
    try {
      const fileRef = ref(storage, `users/${user.uid}/files/${file.name}`)

      const result = await uploadBytes(fileRef, file)

      const downloadURL = await getDownloadURL(fileRef)

      const docRef = await addDoc(collection(db, 'users', user.uid, 'files'), {
        filename: file.name,
        size: file.size,
        type: file.type,
        createdAt: serverTimestamp(),
        downloadURL
      })

      toast.success('File uploaded', { id: toastId })

    } catch (err) {
      console.error(err.message)
      toast.error('Failed to upload the file, please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }


  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    const toastId = toast.loading('Uploading file...')

    reader.onabort = () => toast.error('file reading was aborted', { id: toastId })
    reader.onerror = () => toast.error('file reading has failed', { id: toastId })

    reader.onload = async () => {
      await uploadFile(file, toastId)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <Dropzone maxSize={MAX_FILE_SIZE} maxFiles={1} multiple={false} onDrop={onDrop}>
      {({
        getRootProps, 
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
      }) => {

        const isToLarge = fileRejections.some(({ file }) => file.size > MAX_FILE_SIZE)
        // fileRejections.legth > 0 && fileRejections[0].file.size > MAX_FILE_SIZE
        
      return (
        <section>
          <div {...getRootProps()} className={cn("bg-slate-50/5 h-64 rounded-lg my-10 flex flex-col items-center justify-center border-2 border-dashed transition-colors",
            isDragActive && "bg-slate-50/10",
            isDragReject && "bg-red-500/10"
            )}>
            <input {...getInputProps()} />
            {!isDragActive && <p>Drag 'n' drop some files here, or click to select files</p>}
            {isDragActive && !isDragReject && <p>Drop to upload</p>}
            {isDragReject && <p className="text-red-500">Filetype not accepted</p>}
            {isToLarge && <p className="text-red-500">The file is too large</p>}
          </div>
        </section>
      )}}
    </Dropzone>
  )
}
export default FileDropzone