import type { NavItem } from "#/@types/nav.type";
import { cn } from "#/lib/utils";
import { ChevronDown } from "lucide-react";
import NavLink from "./NavLink";
import { useRef } from "react";
import { useClickOutside } from "#/hooks/useClickOutside";

interface NavDropdownProps {
  item: NavItem;
  isDropdown: boolean;
  onDropdownMenu: (value?: boolean) => void;
}

function NavDropdown({ item, isDropdown, onDropdownMenu }: NavDropdownProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => onDropdownMenu(false));

  return (
    <>
      <div className="relative group" ref={divRef}>
        <div
          className="flex items-center gap-0.5 px-2 py-1 rounded-md hover:bg-accent hover:text-primary smooth cursor-pointer"
          onClick={() => onDropdownMenu()}
        >
          <item.icon size={18} />
          {item.name}
          <ChevronDown
            size={18}
            className={cn("smooth", isDropdown ? "rotate-180" : "rotate-none")}
          />
        </div>
        <ul
          className={cn(
            "lg:absolute w-full lg:w-32 h-0 max-lg:ps-4 lg:bg-background lg:shadow-md dark:lg:shadow-accent lg:rounded-md lg:group-hover:h-fit overflow-hidden smooth",
            isDropdown && "h-fit",
          )}
        >
          {item.children?.map((child) => (
            <NavLink key={child.name} item={child} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default NavDropdown;
