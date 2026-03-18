import type { NavItem } from "#/@types/nav.type";
import { Link } from "@tanstack/react-router";

function NavLink({ item }: { item: NavItem }) {
  const isSkills = item.href === "/demo/skills";

  return (
    <>
      <Link
        to={item.href as "/demo/skills"}
        search={
          isSkills
            ? { type: item.name.toUpperCase() as any, page: 1}
            : undefined
        }
        className="flex items-center gap-0.5 px-2 py-1 rounded-md hover:bg-accent hover:text-primary smooth"
      >
        <item.icon size={18} />
        {item.name}
      </Link>
    </>
  );
}

export default NavLink;
