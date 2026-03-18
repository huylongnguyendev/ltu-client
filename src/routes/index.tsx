import SkillList from "#/components/skills/SkillList";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon, RotateCw } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
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
  
});

function App() {
  return (
    <>
    <main className="page-wrap px-4 pb-8 pt-14 h-[calc(100dvh-61px-120px)]">
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Skills</h2>
        <SkillList />
      </section>
    </main>
    </>
  );
}
