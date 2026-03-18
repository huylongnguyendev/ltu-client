import { cn } from "#/lib/utils";
import CustomePagination from "../CustomePagination";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

interface ExamPaginationProps {
  page: number;
  totalPage: number;
  className?: string;
}

function ExamPagination({ page, totalPage, className }: ExamPaginationProps) {
  const pageParams = useSearch({ from: "/demo/skills" });
  const currentPage = Number(pageParams.page) || Number(page);
  const navigate = useNavigate({ from: "/demo/skills" });

  const handleChangePage = useCallback(
    (newPage: number) => {
      navigate({
        search: (prev) => ({
          ...prev,
          page: newPage,
        }),
      });
    },
    [navigate],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <div className={cn(className)}>
        <CustomePagination
          page={currentPage}
          totalPage={totalPage}
          onChangePage={handleChangePage}
        />
      </div>
    </>
  );
}

export default ExamPagination;
