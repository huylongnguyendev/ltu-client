import type { ExamItems, ExamType } from "#/@types/exam.type";
import type { SortItem } from "#/@types/sort.type";
import ExamPagination from "#/components/paginations/ExamPagination";
import SortList from "#/components/filters/SortList";
import TypeSort from "#/components/filters/TypeSort";
import { Button } from "#/components/ui/button";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeftIcon, HomeIcon, RotateCw } from "lucide-react";
import { ExamEmpty } from "#/components/exam/ExamEmpty";
import ExamCardItem from "#/components/exam/ExamCardItem";

export interface ExamFilters {
  type?: ExamType;
  page?: number;
  search?: string;
  sort?: SortItem["value"];
}

export const Route = createFileRoute("/demo/skills")({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-8 h-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">
            Oop! Something went wrong!
          </h2>
          <p className="text-destructive-foreground">
            {error instanceof Error
              ? error.message
              : "We encountered an unexpected error while loading the exams."}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => window.location.reload()}>
            <RotateCw /> Try Again
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeftIcon /> Go back
          </Button>
        </div>
      </div>
    );
  },
  validateSearch: (search: Record<string, unknown>): ExamFilters => {
    const filters: ExamFilters = {};

    if (search.type) filters.type = search.type as ExamFilters["type"];
    if (search.search) filters.search = search.search as string;
    if (search.sort) filters.sort = search.sort as ExamFilters["sort"];
    const page = Number(search.page) || 1;
    filters.page = page;

    return filters;
  },
  loader: async ({ location }) => {
    const params = location.search as ExamFilters;

    const { page = 1, search = "", type, sort } = params;

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (type) queryParams.append("type", type);
    if (search) queryParams.append("search", search);
    if (sort) queryParams.append("sort", sort);

    const res = await fetch(`http://localhost:4000/api/v1/exam?${queryParams}`);

    if (res.status === 401) throw redirect({ to: "/demo/login" });

    if (!res.ok) {
      // Ép ném ra lỗi để kích hoạt errorComponent
      throw new Error(`Failed to fetch exams: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  },
  notFoundComponent: () => {
    return (
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-8 h-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">
            404! Page Not Found!
          </h2>
          <p className="text-destructive-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => window.location.reload()}>
            <RotateCw /> Go back
          </Button>
          <Link to="/">
            <Button variant="outline" onClick={() => window.history.back()}>
              <HomeIcon /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  },
});

function RouteComponent() {
  const data: ExamItems = Route.useLoaderData();
  const { exams, page, totalPage } = data;


  return (
    <>
      <div className="px-4 py-2 h-content flex flex-col">
        <div className="py-4 flex justify-end items-center gap-1">
          <TypeSort />
          <SortList />
        </div>
        {exams.length === 0 ? (
          <ExamEmpty />
        ) : (
          <ul className="basic-grid">
            {exams.map((test) => (
              <ExamCardItem key={test.id} test={test} />
            ))}
          </ul>
        )}
        <ExamPagination page={page} totalPage={totalPage} className="mt-auto" />
      </div>
    </>
  );
}
