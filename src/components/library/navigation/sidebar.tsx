"use client"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" 

import Link from 'next/link';
import LibNavTree from '@/components/library/navigation/library-tree'

import { HiChevronRight, HiMinusSm }from "react-icons/hi"
import SearchBar from '../searchField'
import { useState } from 'react'

type Props = {
    className?: string;
  };
  
export default function LibrarySidebar({ className }: Props) {
    const content = (
        <ul className={`w-full list-none ${className} `}>
            {/* SEARCH FIELD */}
            {/* <div id="Library-Searchfield" className='mx-2 mb-6'>
                <SearchBar className="" callback={()=>{console.log("Searchbar Callback Activated")}}/>
            </div> */}

            <LibNavTree />
            {/* <CatagoryHeader href='encyclopedia' title='Encyclopedia' >
                <LibNavTree />
            </CatagoryHeader>
                  
            <CatagoryHeader href='catalogue' title='Supply Catalogue' >
                <p>Contents</p>
            </CatagoryHeader>

            <CatagoryHeader href='shipyard' title='Shipyard Compendium' >
                <p>Contents</p>
                <p>Contents</p>
                <p>Contents</p>
                <p>Contents</p>
                <p>Contents</p>
            </CatagoryHeader>

            <CatagoryHeader href='vehicles' title='Vehicle Archive' >
                <p>Contents</p>
            </CatagoryHeader>

            <CatagoryHeader href='xenos' title='XenoAnthology' >
                <p>Contents</p>
            </CatagoryHeader> */}


        </ul>
    )
    return content
}


function CatagoryHeader({
    href,
    title,
    children
} : {
    href: string;
    title: string;
    children:React.ReactNode;
}){
    const pathname = usePathname();
    const currentSections = pathname.split('/')[2]
    const isActive:boolean = (currentSections === href)
    const maxHeight = isActive ? '1000px' : '0';
         
    const contents = (
        <li className='mb-4 w-full'>
            <Link 
                href={href} 
                className={cn(
                    `${isActive && "bg-blue-950"}`,
                )}
            >
            <span  className={cn(
                'ml-2 mr-4',
                `text-[#ef6525be] text-lg font-semibold tracking-tight w-full`,
                `${isActive && "text-[#EF6525]"}`,
            )}>
                {title}
                </span>   
            </Link>
            <div className={cn('overflow-hidden', isActive && 'pb-4')} style={{ maxHeight, transition: 'max-height 0.4s' }}> 
                {children}
            </div>

        </li>

    )

    return  contents
    
}


