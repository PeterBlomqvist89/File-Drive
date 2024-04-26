'use client'

import { useAuth } from "@/components/auth-provider"
import { db } from "@/firebase.config"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import FileTable from "./file-table"
import { Table, TableCaption } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, XIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const FileList = () => {

  const { user } = useAuth()
  const [files, setFiles] = useState(null)
  const [search, setSearch] = useState('')
  const [selectValue, setSelectValue] = useState('all')

  const normalizedFiles = files?.map(file => ({
    ...file,
    createdAt: file.createdAt ? new Date(file?.createdAt?.seconds * 1000) : new Date()
  }))
  .filter(file => file.filename.toLowerCase().includes(search.toLocaleLowerCase()))
  .filter(file => selectValue === 'all' ? file : file.type.includes(selectValue))


  useEffect(() => {
    const q = query(
      collection(db, 'users', user.uid, 'files'),
      orderBy('createdAt', 'desc')
    )

    const unsub = onSnapshot(q, snapshot => {
      const files = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setFiles(files)
    })

    return () => unsub()
  }, [])


  if(files === null) return (
    <Table>
      <TableCaption>Loading files...</TableCaption>
    </Table>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div className="relative w-1/2">
          <Input value={search} onChange={e => setSearch(e.target.value)} className="px-12" />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
          <XIcon onClick={() => setSearch('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-red-500/50 hover:text-red-500 cursor-pointer" />
        </div>
        <Select value={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All files" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All files</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="zip">Zip</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <FileTable files={normalizedFiles} />
    </div>
  )
}
export default FileList