import { sortItems } from "#/data/sort.data";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { SortItem } from "#/@types/sort.type";

function SortList() {
  const sortParams = useSearch({ from: "/demo/skills" });
  const navigate = useNavigate({ from: "/demo/skills" });

  const currentSort = sortParams.sort;
  const sortName =
    sortItems.find((sort) => sort.value === currentSort)?.label || "Sort";

  const handleSort = (value: SortItem["value"]) => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: value,
        page: 1,
      }),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{sortName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortItems.map((sort) => (
            <DropdownMenuItem
              key={sort.name}
              onClick={() => handleSort(sort.value)}
            >
              {sort.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default SortList;
