import Link from "next/link"
import { Doc, allDocs } from "contentlayer/generated";
import { cn } from "@/lib/utils"
import { Mdx } from "@/src/components/library/markdown/mdx-components"
import {bundleMDX} from 'mdx-bundler'
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
// import rehypePrettyCode from "rehype-pretty-code"
// import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

async function getDocFromId( id:string ) {
    const doc = allDocs.find((doc) => doc.slugAsParams === id)
    // error check; return 404
    if (!doc) { null }
    return doc
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    className?:string;
}

function returnNotFound(target: string){
    return(
        <div className="border border-white w-full">
            <span className="px-6 py-2">
                MDX Merger Failure! {target} Not Found!
            </span>

        </div>
    )
}
  
export async function MdxMergePage({
    id,
    className,
    ...props
}: CardProps) {
    
    if(id.includes('#')){
        const pathID = id.split('#')[0]
        const headerName = id.split('#')[1].replace(/-/g, ' ')
        try {
            const doc = await getDocFromId(pathID) as Doc
            const inputText = doc.body.raw

            const lines = inputText.split('\n');
            let content = [];
            let foundHeader = false;
            let headerLevel = 0;
        
            for (const line of lines) {
                if (!foundHeader) {
                    if (line.toLocaleLowerCase().includes(`# ${headerName}`)) {
                        const match = line.match(/^#+/);
                        if (match) {
                        headerLevel = match[0].length;
                        }
                        foundHeader = true;
                        content.push(line);
                        continue;
                    }
                } else {
                    const currentLineLevel = line.match(/^#+/);
                    if (currentLineLevel) {
                        const level = currentLineLevel[0].length;
                        if (level <= headerLevel) {
                            // Stop when a line with fewer or equal # symbols is encountered.
                            break;
                        }
                    }
                    content.push(line);
                }
            }
            const section = content.join('\n');

            
            const result = await bundleMDX({
                source: section,
                mdxOptions(options, frontmatter: any) {
                    // this is the recommended way to add custom remark/rehype plugins:
                    // The syntax might look weird, but it protects you in case we add/remove
                    // plugins in the future.
                    options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
                    // options.rehypePlugins = [...(options.rehypePlugins ?? []), myRehypePlugin]
                
                    return options
                },
            })

            return (
                <div className={cn(className, 'rounded-md bg-green-950  px-4 pt-4 pb-6' )} {...props} >
                <Mdx code={result.code} />
                </div>
            )
        } catch (error) {
            return returnNotFound(id) 
        }

    } else {
        try {
            const doc = await getDocFromId(id) as Doc
            return (
                <div className={cn(className, 'rounded-md bg-red-950  px-4 pt-4 pb-6' )} {...props} >
                    <Mdx code={doc.body.code} />
                </div>
            )
        } catch (error) {
            return returnNotFound(id)
        }



  
    }
    
   
  }