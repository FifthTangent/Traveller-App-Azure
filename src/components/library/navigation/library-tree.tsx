"use client"
import { useState } from 'react'
import { usePathname } from "next/navigation"
import Link from 'next/link';
import { allDocuments, allDocs } from "contentlayer/generated";
import { HiChevronRight, HiMinusSm }from "react-icons/hi"
import { cn } from "@/lib/utils" 

const rootURL = ''

function getAllDocuments() {
    return allDocuments.map(page => {
        return {
            title: page.title,
            href: `${page.slug}`,
            id: page._id.split('/').slice(1).join('/').toString()
        } as LibraryNavItem
    });
}

function buildNavigationTree(items: LibraryNavItem[]): LibraryNavItem[] {
    const parsedItems = items
        .filter(item => !item.id.includes("index.md"))
        .filter(item => !!item.id);
    const tree: LibraryNavItem[] = [];
  
    function addItemToTree(parent: LibraryNavItem[], item: LibraryNavItem): void {
        const itemPath = item.id.split('/');
        const currentId = itemPath[0];
        const remainingPath = itemPath.slice(1).join('/');
  
        if (itemPath.length == 1) {
            parent.push(item);
            return;
        }
        const existingCategory = parent.find(category => category.title === currentId) as LibraryNavItemCategory;
  
        if (existingCategory) {
            addItemToTree(existingCategory.items, { ...item, id: remainingPath });
        } else {
            const newHref = `${item.href.split(currentId)[0]}${currentId}`
            const newCategory: LibraryNavItemCategory = {
                title: currentId,
                href: newHref,
                items: [],
                id: currentId
            };
            addItemToTree(newCategory.items, { ...item, id: remainingPath });
            parent.push(newCategory);
        }
    }
    for (const item of parsedItems) {
        addItemToTree(tree, item);
    }
  
    return tree;
}

export default function LibraryNavigationTree({ className }:{ className?:string }){
    const items = getAllDocuments()
    const NavMap = buildNavigationTree(items);
 
    const content = (
        <nav className={`w-full ${className} `}>
            {/* NAV TREE */}
            <ul className='grid gap-[0.25rem] '>
                {NavMap.map((item,index) => (
                    <NavItem key={index} item={item} />
                ))}
            </ul>
        </nav>
    )
    return items ? content : null
}

function NavItem({ item } : { item: LibraryNavItem }){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    if (!item || !item.title) return null;

    // Icon Rotation
    
    const toggleOpen = () => { setIsOpen(!isOpen) };
    const rotateDegree = isOpen ? 'rotate(90deg)' : 'rotate(0)';

    // Details scale
    const maxHeight = isOpen ? '1000px' : '0';

    // Title Management
    const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);
    const itemDepth = item.href.split('/').length -3;

    const titleSize = (depth:number) => { 
        switch (depth) {
            case 0: return "text-lg"          
            default: return "text-base"
        }
    }

    // Catagory
    if ("items" in item) {
        return (
            <li id="Catagory" className="flex flex-col">
                <div className={`flex m-auto items-center justify-items ${titleSize(itemDepth)}`} >
                    <Link
                        href={rootURL + item.href}
                        aria-current={ pathname === item.href ? "page" : undefined}
                        className={ cn( 
                            pathname === item.href && "bg-slate-600 rounded-md",
                            "flex items-center justify-items w-fit px-2" 
                        )}
                    >
                        {title}
                    </Link>
                    <HiChevronRight className="mr-2 m-auto" onClick={toggleOpen} style={{ transform: rotateDegree, transition: 'transform 0.3s' }} />
                </div>
                <div className="overflow-hidden" style={{ maxHeight, transition: 'max-height 0.7s' }}>
                    <ul className={"pl-3 ml-2 border-l-2 border-gray-500"}>
                        { item.items.map((subitem, index) => ( <NavItem key={index} item={subitem} />)) }
                    </ul>
                 </div>
            </li>
        )
    } else {
        // Document link
        return (
            <li id="Document"  key={item.href}>
                <Link
                    href={rootURL + item.href}
                    aria-current={ pathname === item.href ? "page" : undefined}
                    className={
                        cn( pathname === item.href && "bg-slate-600 rounded-md",
                        "flex items-center justify-items w-fit px-2 ")
                    }
                >
                    <HiMinusSm className="mr-2" />
                    {title}
                </Link>
            </li>
         );
    }
}