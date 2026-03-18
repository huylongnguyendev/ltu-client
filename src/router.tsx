import {
  createRouter as createTanStackRouter,
  Link,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Button } from "./components/ui/button";
import { ArrowLeftIcon, RotateCw } from "lucide-react";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100dvh-56px)] gap-4">
          <h1 className="text-4xl font-bold text-primary">404</h1>
          <p className="text-muted-foreground">Page not found.</p>
          <Button asChild>
            <Link to="/">Go back to Home</Link>
          </Button>
        </div>
      );
    },
    defaultErrorComponent: (error) => {
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
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
