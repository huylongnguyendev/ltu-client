import { navItems } from "#/data/nav.data";
import { useRef, useState } from "react";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAppStore } from "magos/react";
import { store } from "#/store/store";
import { cn } from "#/lib/utils";
import { useClickOutside } from "#/hooks/useClickOutside";
import Logo from "../Logo";
import Auth from "../Auth";

function NavBar() {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useAppStore(store.menu);
  const ulRef = useRef<HTMLUListElement>(null);

  const { setCloseMenu } = setIsOpen;

  const handleDropdownMenu = (value?: boolean) => {
    if (typeof value !== "boolean") setIsDropdown(!isDropdown);
    else setIsDropdown(value);
  };

  useClickOutside(ulRef, setCloseMenu);

  return (
    <>
      <div
        className={cn(
          "absolute top-0 left-0 w-0 h-full bg-background/80 z-50 smooth",
          isOpen && "w-dvw",
        )}
      />
      <ul
        ref={ulRef}
        className={cn(
          "max-lg:absolute top-0 -left-full max-lg:w-2/3 max-lg:h-dvh max-lg:p-4 max-lg:bg-background max-lg:shadow-md dark:max-lg:shadow-accent max-lg:rounded-md flex max-lg:flex-col lg:items-center smooth z-50",
          isOpen && "left-0",
        )}
      >
        <li className="flex justify-between items-center mb-4 lg:hidden">
          <Logo type="menu" />
          <Button variant="outline" size="icon" onClick={setCloseMenu}>
            <X className="text-destructive" />
          </Button>
        </li>
        {navItems.map((item) => (
          <li key={item.name} className="font-semibold">
            {(item.children && (
              <NavDropdown
                key={item.name}
                item={item}
                isDropdown={isDropdown}
                onDropdownMenu={handleDropdownMenu}
              />
            )) || <NavLink key={item.name} item={item} />}
          </li>
        ))}
        <li className="mt-auto">
          <Auth postion="navigation" />
        </li>
      </ul>
    </>
  );
}

export default NavBar;
