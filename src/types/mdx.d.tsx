import { Icons } from "@/components/ui/icons"

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
}

type MainNavItem = NavItem

export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
}
  
export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
  } & (
    | {
        href: string;
        items?: never;
      }
    | {
        href?: string;
        items: any[];
      }
  )