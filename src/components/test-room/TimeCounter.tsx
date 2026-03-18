import formatTime from "#/lib/formatTime";
import { useEffect, useMemo, useState } from "react";

const TimeCounter = ({ timeLimit }: { timeLimit: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const endTime = useMemo(() => {
    return new Date().getTime() + timeLimit * 1000;
  }, [timeLimit]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const secondsRemaining = Math.floor((endTime - now) / 1000);
      if (secondsRemaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
        // handleAutoSubmit(); // Nộp bài ở đây
      } else {
        setTimeLeft(secondsRemaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit]);

  return (
    <>
      <p className="w-14 px-1 py-0.5 border rounded-md bg-background text-center text-foreground font-semibold">
        {formatTime(timeLeft)}
      </p>
    </>
  );
};

export default TimeCounter;
