import { Question } from "./question";
import { Answer } from "./answer";



export interface QuizResponse {
  readonly questionId: string;
  readonly question: Question;
  readonly answers: Answer[];
}