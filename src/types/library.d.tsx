
type LibraryNavItemCategory = {
    title: string
    href: string
    id: string;
    items: LibraryNavItem[] // Self reference
  
}

type LibraryNavItemLink = {
    title: string
    href: string
    id: string;
}

type LibraryNavItem = LibraryNavItemCategory | LibraryNavItemLink