import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import DocumentationPage from "@/components/library/doc-page";
import "@/styles/mdx.css"

// Standard Interface For a Dynamic Route
interface pageProps {
    params: {
        slug: string[]
    }
}

async function getDocFromParams( params: { slug: string[]} ) {
    // Search the generated markdown file for an item with the same name as the same name as the slug
    const slug = params.slug?.join("/") || ""
    const doc = allDocs.find((doc) => doc.slugAsParams === slug)
    // error check; return 404
    if (!doc) { null }
    return doc
}

  
export async function generateStaticParams(): Promise<pageProps["params"][]> {
    return allDocs.map((doc) => ({ slug: doc.slugAsParams.split("/"), }))
}

export default async function DocPage({ params }: pageProps) {
    const doc = await getDocFromParams(params)
    if (!doc) notFound();    
    return <DocumentationPage doc={doc}/>;
}