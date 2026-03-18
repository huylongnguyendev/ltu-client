import { useCallback, useEffect, useMemo, useState } from "react";
import TestRoomPagination from "../paginations/TestRoomPagination";
import ExamTestRoom from "./ExamTestRoom";
import HeaderTestRoom from "./HeaderTestRoom";
import type { ExamItemDetails } from "#/@types/exam.type";
import type { Answers } from "#/@types/answer.type";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";

function TestRoom({ exam }: { exam: ExamItemDetails }) {
  const {
    name,
    picture,
    audio,
    sections,
    totalScore,
    totalQuestion,
    timeLimit,
  } = exam;
  const [currentSelectExamPage, setCurrentSelectExamPage] = useState<number>(0);
  const [currentSelectSection, setCurrentSelectSection] = useState<number>(0);
  const [violateCount, setViolateCount] = useState<number>(0);
  const navigate = useNavigate();

  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [skippedCount, setSkippedCount] = useState<number>(0);
  const [earnedScore, setEarnedScore] = useState<number>(0);

  const handleSelectExamPage = useCallback((newPage: number) => {
    setCurrentSelectExamPage(newPage);
  }, []);

  const handleSelectSection = useCallback((newPage: number) => {
    setCurrentSelectSection(newPage);
  }, []);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkPages, setCheckPages] = useState<number[]>([]);
  const [isViolate, setIsViolate] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);

  const [currentAnswers, setCurrentAnswers] = useState<Answers[]>(() => {
    if (typeof window !== "undefined") {
      const answerSaved = localStorage.getItem("currentAnswers");

      if (answerSaved) return JSON.parse(answerSaved);
    }
    return sections.map((sec) => ({
      section: sec.section,
      answer: sec.questions.flatMap((q) =>
        q.correctAnswer.map((correct) => ({
          name: correct.name,
          ans: "",
          correctAns: correct.ans,
          isCorrect: false,
          score: correct.score,
        })),
      ),
    }));
  });

  const handleUpdateAnswer = useCallback(
    (section: string, questionName: string, value: string) => {
      setCurrentAnswers((prev) =>
        prev.map((item) => {
          if (item.section === section) {
            return {
              ...item,
              answer: item.answer.map((a) =>
                a.name === questionName
                  ? {
                      ...a,
                      ans: value,
                      isCorrect:
                        a.correctAns.toLocaleLowerCase() ===
                        value.toLocaleLowerCase().trim(),
                    }
                  : a,
              ),
            };
          }
          return item;
        }),
      );
    },
    [],
  );

  const updateAnwerCount = useMemo(() => {
    const allAnswer = currentAnswers.flatMap((curr) => curr.answer);

    const questionHasAnswer = allAnswer.reduce(
      (total, item) => total + (item.ans.trim() !== "" ? 1 : 0),
      0,
    );

    return questionHasAnswer;
  }, [currentAnswers]);

  const currentSectionData = useMemo(() => {
    return currentAnswers.find(
      (data) => data["section"] === sections[currentSelectSection].section,
    );
  }, [currentAnswers, currentSelectSection]);

  const handleCheckAnswer = useCallback(() => {
    const checkIndexSectionEmpty: number[] = [];
    currentAnswers.forEach((sectionData, index) => {
      if (sectionData.answer.some((item) => !item.ans || item.ans === "")) {
        checkIndexSectionEmpty.push(index);
      }
    });
    setCheckPages(checkIndexSectionEmpty);
    setIsCheck(true);
  }, [currentAnswers]);

  const handleSubmit = () => {
    setSubmitting(true);
  };

  const calculateFinalResult = useCallback(() => {
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let earnedScore = 0;

    // Duyệt qua tất cả các section trong câu trả lời của thí sinh
    currentAnswers.forEach((sec) => {
      sec.answer.forEach((q) => {
        if (!q.ans || q.ans.trim() === "") {
          // 1. Nếu không có câu trả lời
          skippedCount++;
        } else if (q.isCorrect) {
          // 2. Nếu đã được đánh dấu là đúng trong handleUpdateAnswer
          correctCount++;
          earnedScore += q.score;
        } else {
          // 3. Nếu trả lời sai
          wrongCount++;
        }
      });
    });

    setIsResult(true);
    setCorrectCount(correctCount);
    setWrongCount(wrongCount);
    setSkippedCount(skippedCount);
    setEarnedScore(earnedScore);
  }, [currentAnswers, totalQuestion, totalScore]);

  useEffect(() => {
    const handleViolation = () => {
      // Check cả 2 điều kiện: Thoát Fullscreen HOẶC Thoát Tab
      if (
        !document.fullscreenElement ||
        document.visibilityState === "hidden"
      ) {
        setViolateCount((prev) => {
          const next = prev + 1;
          return next;
        });
        setIsViolate(true);
      }
    };

    document.addEventListener("fullscreenchange", handleViolation);
    document.addEventListener("visibilitychange", handleViolation);

    return () => {
      document.removeEventListener("fullscreenchange", handleViolation);
      document.removeEventListener("visibilitychange", handleViolation);
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentAnswers", JSON.stringify(currentAnswers));
  }, [currentAnswers]);

  useEffect(() => {
    const handleInnerWidth = () => {
      const width = window.innerWidth;

      if (width < 1024) {
        setViolateCount((prev) => {
          const next = prev + 1;
          return next;
        });
        setIsViolate(true);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener("resize", handleInnerWidth);
    return () => window.removeEventListener("resize", handleInnerWidth);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("currentViolateCount", JSON.stringify(violateCount));
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Không thể mở toàn màn hình: ${err.message}`);
      });
    }

    setIsViolate(false);
  };

  if (violateCount > 3) {
    toast.error("Your violate count over 3.");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate({ to: "/" });
  }

  const handleConfirmSubmit = () => {
    calculateFinalResult();
    setSubmitting(false);
  };

  const submitted = () => {
    document.exitFullscreen();
    navigate({ to: "/" });
  }

  return (
    <>
      {isViolate && (
        <div className="absolute size-full flex justify-center items-center z-10">
          <div className="absolute size-full bg-black/10 -z-10 backdrop-blur-sm" />
          <div className="w-full max-w-md p-4 rounded-md bg-background text-center shadow-md dark:shadow-accent">
            <h2 className="text-2xl font-semibold uppercase text-destructive text-center">
              Violate
            </h2>
            <div className="flex justify-center items-center gap-1 m-4">
              <p className="font-semibold">Count:</p>
              <p className="text-destructive">{violateCount}/3</p>
            </div>
            <Button variant="destructive" onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      )}
      {submitting && (
        <div className="absolute size-full flex justify-center items-center z-10">
          <div className="absolute size-full bg-black/10 -z-10 backdrop-blur-sm" />
          <div className="w-full max-w-md p-4 rounded-md bg-background text-center shadow-md dark:shadow-accent">
            <h2 className="text-2xl font-semibold uppercase text-center">
              You want to submit?
            </h2>

            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="destructive"
                onClick={() => setSubmitting(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmSubmit}>Accept</Button>
            </div>
          </div>
        </div>
      )}

      {isResult && (
        <div className="absolute size-full flex justify-center items-center z-10">
          <div className="absolute size-full bg-black/10 -z-10 backdrop-blur-sm" />
          <div className="w-full max-w-md p-4 rounded-md bg-background text-center shadow-md dark:shadow-accent">
            <h2 className="text-2xl font-semibold uppercase text-center">
              Your results
            </h2>
            <div className="my-4">
              <p>Correct: {correctCount}/40</p>
              <p>Wrong: {wrongCount}/40</p>
              <p>Skip: {skippedCount}/40</p>
              <p>Score: {earnedScore}/40</p>
              {/* correctCount wrongCount skippedCount earnedScore */}
            </div>
            <Button onClick={submitted}>Accept</Button>
          </div>
        </div>
      )}
      <HeaderTestRoom
        name={name}
        answerCount={updateAnwerCount}
        audio={audio}
        totalQuestion={totalQuestion}
        onCheckAnswer={handleCheckAnswer}
        timeLimit={timeLimit}
        onSubmitting={handleSubmit}
      />
      <main className="flex h-[calc(100dvh-64px)] px-4 select-none">
        <section className="relative w-1/2 h-[calc(100dvh-64px)] overflow-y-auto">
          <div className="flex w-fit h-full mx-auto">
            <div className="h-full flex justify-center">
              {picture[currentSelectExamPage] ? (
                <img
                  src={picture[currentSelectExamPage]}
                  alt={"test-" + currentSelectExamPage}
                  className="h-full scale-95"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  Loading image...
                </div>
              )}
            </div>
          </div>
          <TestRoomPagination
            currentSelectPage={currentSelectExamPage}
            totalPage={picture.length}
            onChangeCurrentPage={handleSelectExamPage}
            position="absolute"
            className="bottom-4 left-1/2 -translate-x-1/2"
          />
        </section>

        <section className="w-1/2 h-[calc(100dvh-64px)] flex flex-col items-start">
          <ExamTestRoom
            currentSection={currentSectionData?.section || ""}
            currentSectionData={currentSectionData?.answer || []}
            exam={sections[currentSelectSection]}
            onUpdateAnswer={handleUpdateAnswer}
            isCheck={isCheck}
          />
          <TestRoomPagination
            currentSelectPage={currentSelectSection}
            onChangeCurrentPage={handleSelectSection}
            totalPage={sections.length}
            className="mt-auto mb-4 mx-auto"
            checkPages={checkPages}
          />
        </section>
      </main>
    </>
  );
}

export default TestRoom;
