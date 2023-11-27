import { Mdx } from "@/src/components/library/markdown/mdx-components"
import { DocsPageHeader } from "@/src/components/library/markdown/page-header"
import { DashboardTableOfContents }  from "@/src/components/library/navigation/toc"
import { getTableOfContents } from "@/lib/toc"

export default async function DocumentationPage({ doc } : {doc:any}) {
    const rawfile = handleDocumentMerge(doc.body.raw)
    const toc = await getTableOfContents(rawfile)
    
    return (
        <article className="relative w-full lg:gap-4 lg:grid lg:grid-cols-[1fr_250px]">
            <div className="w-full min-w-0 py-6 px-4 lg:px-0">
                <DocsPageHeader heading={doc.title} text={doc.description} />
                <Mdx code={doc.body.code} />
                <hr className="my-4 md:my-6" />
            </div>
            
            <div id="Table-of-Contents" className="hidden lg:block">
                <div className="fixed z-20 top-0 pt-20 pr-2 overflow-hidden overflow-y-auto">
                    <DashboardTableOfContents toc={toc} />
                </div>
            </div>
        </article>
    )
}


function handleDocumentMerge(rawfile:string){
    if(rawfile.includes('<Merge')){
        // console.log("FOUND IT")
        // const lines = rawfile.split('\n');
        // for (const line of lines) {
        //     if (line.includes('<Merge')) {
                    
        //     }
        // }

    } else {
        // console.log("NOPE, NOT HERE")
        // return rawfile
    }

    return rawfile
}
