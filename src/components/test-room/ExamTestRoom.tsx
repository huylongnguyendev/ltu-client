import type { AnswerUnit } from "#/@types/answer.type";
import type { SectionItem } from "#/@types/exam.type";
import { cn } from "#/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface ExamTestRoomProps {
  currentSectionData: AnswerUnit[];
  currentSection: string;
  exam: SectionItem;
  onUpdateAnswer: (
    section: string,
    questionName: string,
    value: string,
  ) => void;
  isCheck: boolean;
}

function ExamTestRoom({
  currentSection,
  currentSectionData,
  exam,
  isCheck,
  onUpdateAnswer,
}: ExamTestRoomProps) {
  const answersMap = currentSectionData.reduce(
    (acc, curr) => {
      acc[curr.name] = curr.ans;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold">Section {currentSection}</h1>
        <div className="space-y-2">
          {exam.questions.map((item) => (
            <div key={item.name} className="space-y-2">
              <p className="font-semibold">Question {item.name}</p>
              {item.correctAnswer.map((q) => (
                <div
                  key={"question" + q.name}
                  className="flex items-center gap-4"
                >
                  <p className="font-semibold w-10">{q.name}</p>
                  {item.type === "INPUT" ? (
                    <Input
                      value={answersMap[q.name] || ""}
                      onChange={(e) =>
                        onUpdateAnswer(currentSection, q.name, e.target.value)
                      }
                      className={cn(
                        isCheck &&
                          answersMap[q.name].trim() === "" &&
                          "ring-destructive border-destructive outline-destructive",
                      )}
                    />
                  ) : (
                    <RadioGroup
                      value={answersMap[q.name] || ""}
                      onValueChange={(val) =>
                        onUpdateAnswer(currentSection, q.name, val)
                      }
                      className={cn(
                        "flex items-center gap-8",
                        isCheck && answersMap[q.name].trim() === "" && "text-destructive",
                      )}
                    >
                      {["A", "B", "C"].map((option) => (
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={option}
                            id={`q-${q.name}-opt-${option}`}
                          />
                          <Label htmlFor={`q-${q.name}-opt-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExamTestRoom;
