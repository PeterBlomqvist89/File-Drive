import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HoverPreview from "./hover-preview"
import { Button } from "@/components/ui/button"
import { formatDistance } from "date-fns"
import prettyBytes from "pretty-bytes"
import { MoreVertical } from "lucide-react"
import ActionsDropdown from "./actions-dropdown"


const FileTable = ({ files }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Added</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          !!files.length ? files.map(file => (
            <TableRow key={file.id}>
              <TableCell>{file.type.split('/')[1]}</TableCell>
              <TableCell>
                {
                  file.type.includes('image')
                  ? (
                    <HoverPreview downloadURL={file.downloadURL}>
                      <Button variant="ghost" size="sm">
                        <a href={file.downloadURL} download target="_blank">
                          {file.filename}
                        </a>
                      </Button>
                    </HoverPreview>
                  )
                  :  (
                    <Button variant="ghost" size="sm">
                      <a href={file.downloadURL} download>
                        {file.filename}
                      </a>
                    </Button>
                  )
                }
              </TableCell>
              <TableCell>{formatDistance(file.createdAt, new Date())}</TableCell>
              <TableCell>{prettyBytes(file.size)}</TableCell>
              <TableCell className="text-end"><ActionsDropdown downloadURL={file.downloadURL} id={file.id} filename={file.filename} /></TableCell>
            </TableRow>
          )): (
            <TableRow>
              <TableCell colSpan="5" className="text-center">No files found</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
export default FileTable