"use client"

import { HiBars3, HiChevronRight, HiMinusSmall} from "react-icons/hi2"
import { usePathname } from 'next/navigation'
import { buildNavigationTree, cn } from "@/lib/utils" 
import Link from "next/link"
import { useState } from "react"

type Props = {
    className?: string;
};

export default function LibraryTopbar({  className }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => { setIsOpen(!isOpen) };
    const maxWidth = isOpen ? '1000px' : '0';
    
    const currentPath = usePathname()
    const splitPath = currentPath.split('/')

    const content = (
        <>
            <nav className={cn(
                `backdrop-blur bg-slate-950/75 place-content-center `,
                `${className}`)}>


                <div className='max-w-screen-xl relative flex justify-between align-center m-auto'>
                    <h1 className=' ml-6 text-center text-3xl'>Library</h1>    

                </div>

                <div className="flex align-center lg:hidden"> 
                    < HiBars3 className={cn(
                        "w-6 h-6 mx-4 hover:text-sky-400",
                        isOpen && "text-sky-600"
                    )}
                    onClick={toggleOpen}/>
                    { splitPath.map((item, index) => (
                        <div key={index}> {item && BreadCrumb(currentPath, index)} </div>
                    ))}
                </div>
            </nav>
            <div className={'fixed lg:hidden overflow-hidden '} style={{ maxWidth, transition: 'max-width 0.7s' }}>
                {/* <Sidebar className="backdrop-blur bg-slate-900/75 h-screen" items={items} /> */}
            </div>
            
        </>
    )
    return content;
}

function BreadCrumb(reference:string, index:number){
    const splitPath = reference.split('/')
    const isLast = index != splitPath.length-1
    const title = splitPath[index].charAt(0).toUpperCase() + splitPath[index].slice(1);
    const path = (index > -1 ? splitPath.slice(0, index + 1) : []).join('/')
    return (
        <Link href={path} className="flex items-center text-xs sm:text-base hover:text-sky-400 ">
            <p>{ title }</p>
            { isLast && <HiChevronRight /> }
        </Link >        
    )
}

function Sidebar({ 
    items, 
    className 
} : {   
    items: LibraryNavItem[];
    className?: string;
 }) {
    const NavMap = buildNavigationTree(items);
    const content = (
        <nav className={`${className}`}>
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

function NavItem({
    item
} : { 
    item: LibraryNavItem;
}){
    const pathname = usePathname();
    // Icon Rotation
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => { setIsOpen(!isOpen) };
    const rotateDegree = isOpen ? 'rotate(90deg)' : 'rotate(0)';
    // Details scale
    const maxHeight = isOpen ? '1000px' : '0';

    // Title Management
    const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);
    const itemDepth = item.href.split('/').length -3
    const titleSize = (depth:number) => { 
        switch (depth) {
            case 1: return "text-xl"          
            default: return "text-base"
        }
    }
    // Catagory
    if ("items" in item) {
        return (
            <li className="flex flex-col">
                <div className={`flex items-center justify-items ${titleSize(itemDepth)}`} onClick={toggleOpen}>
                        <HiChevronRight className="mr-2" style={{ transform: rotateDegree, transition: 'transform 0.3s' }} />
                        {title}
                </div>
                <div className="overflow-hidden" style={{ maxHeight, transition: 'max-height 0.7s' }}>
                    <ul className={"pl-3 ml-2 border-l-2 border-gray-500"}>
                        {
                            item.items.map((subitem, index) => (
                                <NavItem key={index} item={subitem} />
                            ))
                        }
                    </ul>
                 </div>
            </li>
        );
    } else {
    // Document link
      return (
        <li key={item.href}>
            <Link
                href={item.href}
                className={
                    cn( pathname === item.href && "bg-slate-600",
                        "flex items-center justify-items" )
                }
                aria-current={ pathname === item.href ? "page" : undefined}
            >
                <HiMinusSmall className="mr-2" />
                {title}
            </Link>
        </li>
      );
    }
}