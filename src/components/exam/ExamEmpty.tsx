import SkillList from "#/components/skills/SkillList";
import { SearchXIcon } from "lucide-react";

export const ExamEmpty = () => {
  return (
    <>
      <div className="text-center h-content flex flex-col items-center justify-center gap-8">
        <div className="-space-y-1">
          <div className="flex justify-center items-center gap-0.5">
            <SearchXIcon className="text-muted-foreground" />
            <h1 className="font-semibold text-lg">No tests available.</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Please check back later or try a different category.
          </p>
        </div>
        <SkillList />
      </div>
    </>
  );
};
