// @ts-nocheck
// TODO: Fix this when we turn strict mode on.

//This package is a utility that generates a table of contents from a document.
import { toc } from "mdast-util-toc" 
//remark is a tool that transforms markdown with plugins. These plugins can inspect and change your markup. 
import { remark } from "remark"      
//unist utility to walk the document tree.   
import { visit } from "unist-util-visit"

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

function flattenNode(node) {
    const p = []
    visit(node, (node) => {
        if (!textTypes.includes(node.type)) return
        p.push(node.value)
    })
    return p.join(``)
}

interface Item {
    title: string
    url: string
    items?: Item[]
}

interface Items {
    items?: Item[]
}

function getItems(node, current): Items {
    if (!node) { return {} }

    if (node.type === "paragraph") {
        visit(node, (item) => {
        if (item.type === "link") {
            current.url = item.url
            current.title = flattenNode(node)
        }

        if (item.type === "text") {
            current.title = flattenNode(node)
        }
        })

        return current
    }

    if (node.type === "list") {
        current.items = node.children.map((i) => getItems(i, {}))
        return current
    } else if (node.type === "listItem") {
        const heading = getItems(node.children[0], {})
        if (node.children.length > 1) {
            getItems(node.children[1], heading)
        }
        return heading
    }

    return {}
}

const getToc = () => (node, file) => {
    const table = toc(node)
    file.data = getItems(table.map, {})
}

export type TableOfContents = Items

export async function getTableOfContents(
    content: string
): Promise<TableOfContents> {
    const result = await remark().use(getToc).process(content)
    return result.data
}
