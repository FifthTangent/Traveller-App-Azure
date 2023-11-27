"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle 
  } from "@/components/ui/navigation-menu"
import Link from "next/link"
  

export default function LibraryNavigator(){
    return (
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
 





            </NavigationMenuList>
        </NavigationMenu>
    )
}
