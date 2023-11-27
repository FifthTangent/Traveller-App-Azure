import Link from "next/link"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  header?: string
  disabled?: boolean
}

export function MdxCard({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border px-6 py-4 shadow-md mb-6 transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className={cn(
          "space-y-2 ",
          "[&>h1]:text-xl [&>h1]:font-bold",
          "[&>h2]:text-lg [&>h2]:font-bold",
          "[&>h3]:!mt-0",
          "[&>h4]:!mt-0 ",
          "[&>p]:pl-2 [&>p]:!mt-0"

        )}>
          
          {children}
        </div>
      </div>
      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  )
}
