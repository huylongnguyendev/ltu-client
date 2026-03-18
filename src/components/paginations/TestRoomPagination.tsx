import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { memo } from "react";
import { cn } from "#/lib/utils";

interface TestRoomPaginationProps {
  totalPage: number;
  currentSelectPage: number;
  position?: "static" | "absolute";
  className?: string;
  checkPages?: number[];
  onChangeCurrentPage: (newPage: number) => void;
}

const TestRoomPagination = memo(
  ({
    totalPage,
    currentSelectPage,
    onChangeCurrentPage,
    position = "static",
    className,
    checkPages = [],
  }: TestRoomPaginationProps) => {
    return (
      <>
        <div
          className={cn(
            "w-fit bg-background border border-primary rounded-md px-2 py-1 flex items-center gap-x-1",
            position,
            className,
          )}
        >
          <Button
            variant="outline"
            size="icon"
            disabled={currentSelectPage === 0}
            onClick={() => onChangeCurrentPage(currentSelectPage - 1)}
          >
            <ChevronsLeftIcon />
          </Button>
          {Array.from({ length: totalPage }).map((_, index) => {
            const isHasEmpty = checkPages.find((val) => val === index);
            return (
              <Button
                key={"page-exam-" + index}
                variant={currentSelectPage === index ? "default" : "outline"}
                size="icon"
                className={cn(
                  isHasEmpty === index &&
                    "border-destructive && text-destructive",
                )}
                onClick={() => onChangeCurrentPage(index)}
              >
                {index + 1}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="icon"
            disabled={currentSelectPage === totalPage - 1}
            onClick={() => onChangeCurrentPage(currentSelectPage + 1)}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </>
    );
  },
);

export default TestRoomPagination;
