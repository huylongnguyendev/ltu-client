import { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "#/lib/utils";
import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  totalPage: number;
  onChangePage: (newPage: number) => void;
}

const CustomePagination = memo(
  ({ page, totalPage, onChangePage }: PaginationProps) => {

    if (totalPage < 1) return null

    const paginationGenerate = () => {
      let pagiList: Array<string | number> = [];

      if (totalPage <= 6) {
        for (let i = 1; i <= totalPage; i++) pagiList.push(i);
        return pagiList;
      }

      if (page < 5) return [1, 2, 3, 4, 5, "...", totalPage];

      if (page > totalPage - 5)
        return [
          1,
          "...",
          totalPage - 5,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ];
      return [
        1,
        "...",
        totalPage - 1,
        totalPage,
        totalPage + 1,
        "...",
        totalPage,
      ];
    };

    const pageList: Array<string | number> = paginationGenerate();

    return (
      <>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem
              className={cn(page === 1 && "pointer-events-none opacity-50")}
            >
              <PaginationPrevious />
            </PaginationItem>

            {pageList.map((pageItem, index) => (
              <PaginationItem key={"pagination-" + index + 1}>
                {(typeof pageItem !== "string" && (
                  <Button
                    variant={page === pageItem ? "default" : "outline"}
                    size="icon"
                    onClick={() => onChangePage(pageItem)}
                  >
                    {pageItem}
                  </Button>
                )) || <PaginationEllipsis />}
              </PaginationItem>
            ))}

            <PaginationItem
              className={cn(
                page === totalPage && "pointer-events-none opacity-50",
              )}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    );
  },
);

export default CustomePagination;
