export interface Answers {
  section: string;
  answer: AnswerUnit[];
}

export interface AnswerUnit {
  name: string;
  ans: string;
  correctAns: string;
  isCorrect: boolean;
  score: number;
}
