// A tiny (234B) utility for constructing className strings conditionally.
import { ClassValue, clsx } from "clsx"
// Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.
import { twMerge } from "tailwind-merge"

const env = { NEXT_PUBLIC_APP_URL: "http://localhost:3000" }

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
    })
}

export function absoluteUrl(path: string) { return `${env.NEXT_PUBLIC_APP_URL}${path}`}

export const sortData = ({ 
	list, 
	field 
}: {
	list:any[],
	field: string 
}) => {
				return [...list].sort((a, b) => {
				const fieldA = String(a[field]).toLowerCase();
				const fieldB = String(b[field]).toLowerCase();
		
				if (fieldA < fieldB) return -1;
				if (fieldA > fieldB) return 1;
				return 0;
				});
			};


export function buildNavigationTree(items: LibraryNavItem[]): LibraryNavItem[] {
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