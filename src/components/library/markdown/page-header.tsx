import { cn } from "@/lib/utils"

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
}

export function DocsPageHeader({
    heading,
    text,
    className,
    ...props
}: DocsPageHeaderProps) {
  const leadChar = heading.charAt(0).toUpperCase()
  const title =  heading.slice(1).toUpperCase();
  return (
    <>
      <div id="Page-Header" className={cn("", className)} {...props}>
        <span className="text-[#EF6525] font-semibold font-sans tracking-tighter text-4xl lg:text-5xl ">
            {leadChar}
        </span>
        <span className="text-[#EF6525] font-semibold inline-block font-heading font-sans tracking-tight text-3xl lg:text-4xl">
            {title}
        </span>
        {text && <p className="text-xl ml-1 text-muted-foreground">{text}</p>}
      </div>
      <hr className="my-4" />
    </>
  )
}
