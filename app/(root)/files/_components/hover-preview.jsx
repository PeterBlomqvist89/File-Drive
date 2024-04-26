import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import Image from "next/image"
  
  
  const HoverPreview = ({ children, downloadURL }) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          { children }
        </HoverCardTrigger>
        <HoverCardContent className="w-60 aspect-auto">
          <Image 
            src={downloadURL}
            width={200}
            height={200}
            alt="Preview of the file"
            className="w-full h-full object-cover"
          />
        </HoverCardContent>
      </HoverCard>
    )
  }
  export default HoverPreview