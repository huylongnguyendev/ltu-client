import { typeDropItems } from "#/data/sort.data";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { ExamType } from "#/@types/exam.type";
import type { ExamFilters } from "#/routes/demo.skills";

function TypeSort() {
  const typeParams = useSearch({ from: "/demo/skills" });
  const navigate = useNavigate({ from: "/demo/skills" });
  const currentType = typeParams.type;

  const handleSelect = (type: ExamType) => {
    navigate({
      search: (prev: ExamFilters) => ({
        ...prev,
        type,
        page: 1,
      }),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{currentType}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {typeDropItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleSelect(item.type)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default TypeSort;
