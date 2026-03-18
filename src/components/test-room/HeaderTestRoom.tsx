import AudioTestRoom from "#/components/test-room/AudioTestRoom";
import { Button } from "#/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { memo } from "react";
import TimeCounter from "./TimeCounter";

interface HeaderTestRoomProps {
  name: string;
  audio: string;
  answerCount: number;
  totalQuestion: number;
  onCheckAnswer: () => void;
  timeLimit: number;
  onSubmitting: () => void;
}

const HeaderTestRoom = memo(
  ({
    name,
    audio,
    answerCount,
    totalQuestion,
    onCheckAnswer,
    timeLimit,
    onSubmitting,
  }: HeaderTestRoomProps) => {
    return (
      <>
        <header className="relative flex justify-between items-center p-4 bg-primary dar:bg-background text-primary-foreground dark:text-foreground select-none">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => window.history.back()}
            >
              <ChevronLeftIcon />
            </Button>
            <h1 className="font-semibold">{name}</h1>
          </div>
          {audio && <AudioTestRoom audioUrl={audio} />}
          <div className="flex items-center gap-4">
            <p className="px-2 py-0.5 border bg-accent text-accent-foreground rounded-md">
              {answerCount} / {totalQuestion}
            </p>
            <TimeCounter timeLimit={timeLimit} />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onCheckAnswer}>
              Check
            </Button>
            <Button variant="secondary" size="sm" onClick={onSubmitting}>
              Submit
            </Button>
          </div>
        </header>
      </>
    );
  },
);

export default HeaderTestRoom;
