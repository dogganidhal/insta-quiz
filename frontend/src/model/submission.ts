import { User } from "./user";
import { Quiz } from "./quiz";
import { QuizResponse } from "./quiz-response";
import { Score } from "./score";


export interface Submission {
  readonly id: string;
  readonly userId: string;
  readonly user: User
  readonly quizId: string;
  readonly quiz: Quiz;
  readonly responses: QuizResponse[];
  readonly score: Score;
} 