'use client'

import FileDropzone from "./_components/file-dropzone"
import FileList from "./_components/file-list"

function FilesPage() {
  return (
    <div>
      <FileDropzone />
      <FileList />
    </div>
  )
}
export default FilesPage